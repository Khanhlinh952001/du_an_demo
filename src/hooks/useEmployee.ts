// src/services/userService.ts
import { auth, firestore, secondaryApp } from '@/libs/firebase';
import { User } from '@/types/User';
import { 
  collection, 
  addDoc, 
  deleteDoc, 
  updateDoc, 
  doc, 
  getDocs, 
  query, 
  where, 
  setDoc, 
  getDoc
} from 'firebase/firestore';
import { createUserWithEmailAndPassword, deleteUser, getAuth } from 'firebase/auth';
import { ROLES, RoleType } from '@/constants/roles';
import { formatDate } from '@/utils/format';
import { generateEmployeeId } from '@/utils/idGenerators';
import { useState, useEffect } from 'react';
import { Decentralization } from '@/types/AdminSettings';
import { 
  ADMIN_PERMISSION, 
  MANAGER_PERMISSION,
  EMPLOYEE_PERMISSION,
  WAREHOUSE_VN_PERMISSION,
  WAREHOUSE_KR_PERMISSION,
  ACCOUNTANT_PERMISSION 
} from '@/constants/decentalization';

export const useEmployee = (companyId: string) => {
  const USERS_COLLECTION = 'Users';
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState<User[]>([]);
  const secondaryAuth = getAuth(secondaryApp);
  const createEmployee = async (
    email: string, 
    password: string,
    role: RoleType,
    displayName: string,
    phone: string,
    isActive: boolean
  ) => {
    try {
      setLoading(true);
      const employeeId = generateEmployeeId();
      
      const userCredential = await createUserWithEmailAndPassword(secondaryAuth, email, password);
      const uid = userCredential.user.uid;
      
      const userData: User = {
        uid,
        email,
        displayName,
        photoURL: `https://ui-avatars.com/api/?name=${displayName}`,
        password,
        role,
        phone,
        employeeId,
        companyId,
        createdAt: formatDate(new Date()),
        updatedAt: formatDate(new Date()),
        isActive: isActive,
        createdBy: auth.currentUser?.uid || '',
      };

      await setDoc(doc(firestore, USERS_COLLECTION, uid), userData);

      // Updated permissions handling
      let permissions: Decentralization[] = [];
      switch (role) {
        case ROLES.ADMIN:
          permissions = ADMIN_PERMISSION;
          break;
        case ROLES.MANAGER:
          permissions = MANAGER_PERMISSION;
          break;
        case ROLES.WAREHOUSE_VN:
          permissions = WAREHOUSE_VN_PERMISSION;
          break;
        case ROLES.WAREHOUSE_KR:
          permissions = WAREHOUSE_KR_PERMISSION;
          break;
        case ROLES.ACCOUNTANT:
          permissions = ACCOUNTANT_PERMISSION;
          break;
        default:
          permissions = EMPLOYEE_PERMISSION;
      }

      // Updated adminSettings handling with better error handling
      try {
        const adminSettingsRef = doc(firestore, 'adminSettings', companyId);
        const adminSettingsDoc = await getDoc(adminSettingsRef);

        if (adminSettingsDoc.exists()) {
          const currentDecentralization = adminSettingsDoc.data()?.decentralization || [];
          // Filter out any duplicate permissions before updating
          const uniquePermissions = Array.from(new Set([...currentDecentralization, ...permissions]));
          await updateDoc(adminSettingsRef, {
            decentralization: uniquePermissions
          });
        } else {
          await setDoc(adminSettingsRef, {
            adminId: companyId,
            decentralization: permissions,
            emailSetting: {},
            sampleContent: {},
            systemNotifications: {}
          });
        }
      } catch (decentralizationError) {
        console.error('Decentralization update error:', decentralizationError);
        // Continue with user creation even if permission update fails
        // You might want to add some notification here
      }

      await getAllEmployees();
    } catch (error) {
      console.error('Create employee error:', error);
      throw new Error('Failed to create employee');
    } finally {
      setLoading(false);
    }
  };



  const updateEmployee = async (uid: string, userData: Partial<User>) => {
    try {
      setLoading(true);
      const userRef = doc(firestore, USERS_COLLECTION, uid);
      const updateData = {
        ...userData,
        updatedAt: formatDate(new Date())
      };
      await updateDoc(userRef, updateData);
      await getAllEmployees();
    } catch (error) {
      console.error('Update employee error:', error);
      throw new Error('Failed to update employee');
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async (uid: string) => {
    try {
      setLoading(true);
      
      // Xóa user từ Authentication
      const user = auth.currentUser;
      if (user && user.uid === uid) {
        await deleteUser(user);
      }
      
      // Xóa user từ Firestore
      await deleteDoc(doc(firestore, USERS_COLLECTION, uid));
      await getAllEmployees();
    } catch (error) {
      console.error('Delete employee error:', error);
      throw new Error('Failed to delete employee');
    } finally {
      setLoading(false);
    }
  };

  const getAllEmployees = async (): Promise<User[]> => {
    try {
      setLoading(true);
      const employeesQuery = query(
        collection(firestore, USERS_COLLECTION),
        where('companyId', '==', companyId)
      );
      const querySnapshot = await getDocs(employeesQuery);
      console.log('Query snapshot:', querySnapshot.docs);
      const employeesList = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        uid: doc.id,
      } as User));
      console.log('Employees list:', employeesList);
      setEmployees(employeesList);
      return employeesList;
    } catch (error) {
      console.error('Get employees error:', error);
      throw new Error('Failed to fetch employees');
    } finally {
      setLoading(false);
    }   
  };

  useEffect(() => {
    getAllEmployees();
  }, [companyId]);

  return {
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getAllEmployees,
    loading,
    employees
  };
};


