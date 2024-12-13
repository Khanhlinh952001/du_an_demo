import { values } from '@ant-design/plots/es/core/utils';
import { useState, useEffect } from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, firestore } from '@/libs/firebase';
import { AuthState, User } from '@/types/User';
import { CompanyInfo } from '@/types/Company';
import { message } from 'antd';
import { formatDate } from '@/utils/format';
import { generateCompanyId, generateEmployeeId } from '@/utils/idGenerators';
import { useCompany } from './useCompany';
import { useDecentralization } from './useDecentralization';
import { MANAGER_PERMISSION ,WAREHOUSE_KR_PERMISSION ,WAREHOUSE_VN_PERMISSION ,ACCOUNTANT_PERMISSION ,EMPLOYEE_PERMISSION ,ADMIN_PERMISSION } from '@/constants/decentalization';
import { ROLES } from '@/constants';
export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null
  });
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  
  // Sử dụng useCompany hook
  const { 
    getCompany, 
    createCompany,
    loading: companyLoading 
  } = useCompany();

  // Utility function to update auth state
  const updateAuthState = (
    user: User | null, 
    error: string | null = null
  ) => {
    setAuthState({ 
      user, 
      loading: false, 
      error 
    });
  };

  // Create or update user in Firestore
  const handleUserData = async (firebaseUser: any): Promise<User> => {
    const userRef = doc(firestore, 'Users', firebaseUser.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      // Nếu user chưa tồn tại trong Firestore, không tự động tạo nữa
      throw new Error('User not found in database');
    }

    // Lấy thông tin user từ Firestore
    const userData = userDoc.data() as User;
    
    // Lấy thông tin công ty nếu có
    if (userData.companyId) {
      const companyInfo = await getCompany(userData.companyId);
      setCompanyInfo(companyInfo);
      if (!companyInfo) {
        console.warn(`Company not found for user ${userData.uid}`);
      }
    }

    return userData;
  };

    const uploadUserProfile = async (userData: User | null) => {
        if (!userData) {
            console.error('User data is null');
            return;
        }
        try {
            if (!auth.currentUser) {
                throw new Error('No authenticated user');
            }
            // Cập nhật profile trong Firebase Auth
            await updateProfile(auth.currentUser, {
                displayName: userData.displayName,
                photoURL: userData.photoURL
            });

            // Cập nhật thông tin trong Firestore
            const userRef = doc(firestore, 'Users', userData.uid);
            await updateDoc(userRef, {
                ...userData,
                updatedAt: formatDate(new Date())
            });

            // Reload user data và cập nhật state
            const updatedUserDoc = await getDoc(userRef);
            const updatedUserData = updatedUserDoc.data() as User;
            updateAuthState(updatedUserData);

            message.success('Cập nhật thông tin thành công!');
        } catch (error) {
            console.error('Cập nhật thông tin thất bại:', error);
            message.error('Cập nhật thông tin thất bại. Vui lòng thử lại sau!');
        }
    }
  // Google Sign In
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope('email');
      provider.addScope('profile');

      console.log('Starting Google sign in...');
      const result = await signInWithPopup(auth, provider);
      console.log('Sign in successful:', result);

      const userData = await handleUserData(result.user);
      console.log('User data processed:', userData);

      updateAuthState(userData);
      // const companyInfo = await (userData?.companyId || '');
      // setCompanyInfo(companyInfo);
      message.success('Đăng nhập thành công!');
    } catch (error: any) {
      console.error('Detailed sign in error:', error);
      let errorMessage = 'Đăng nhập thất bại';

      switch (error.code) {
        case 'auth/popup-blocked':
          errorMessage = 'Popup bị chặn. Vui lòng cho phép popup và thử lại.';
          break;
        case 'auth/popup-closed-by-user':
          errorMessage = 'Đăng nhập bị hủy. Vui lòng thử lại.';
          break;
        case 'auth/unauthorized-domain':
          errorMessage = 'Domain không được phép. Vui lòng kiểm tra cấu hình Firebase.';
          break;
        default:
          errorMessage = `Đăng nhập thất bại: ${error.message}`;
      }

      updateAuthState(null, errorMessage);
    }
  };

  // Email/Password Registration
  const registerWithEmail = async (
    email: string, 
    password: string, 
    companyName: string, 
    companyCode: string, 
    bizLicenseNumber: string, 
    address: string, 
    phone: string, 
    representativeName: string
  ) => {
    try {
      // 1. Tạo tài khoản Firebase
      const result = await createUserWithEmailAndPassword(auth, email, password);

      // 2. Tạo công ty mới sử dụng useCompany
      const newCompany = await createCompany({
        companyName,
        companyCode,
        bizLicenseNumber,
        companyAddress: address,
        companyPhone: phone,
        companyEmail: email,
        representativeName,
      });

      if (!newCompany) {
        throw new Error('Không thể tạo công ty');
      }

      // 3. Tạo user với companyId
      const userData: User = {
        uid: result.user.uid,
        email,
        password,
        employeeId: generateEmployeeId(),
        displayName: representativeName,
        phone: phone,
        photoURL: `https://ui-avatars.com/api/?name=${representativeName}`,
        role: ROLES.MANAGER,
        companyId: newCompany.companyId,
        createdAt: formatDate(new Date()),
        updatedAt: formatDate(new Date()),
      };

      await setDoc(doc(firestore, 'Users', userData.uid), userData); 
      updateAuthState(userData);

      // Thêm tất cả các quyền mặc định
      const allDefaultPermissions = [
        ...MANAGER_PERMISSION,
        ...WAREHOUSE_VN_PERMISSION,
        ...WAREHOUSE_KR_PERMISSION,
        ...ACCOUNTANT_PERMISSION
      ];

      const adminSettingsRef = doc(firestore, "adminSettings", newCompany.companyId);
      await setDoc(adminSettingsRef, {
        adminId: newCompany.companyId,
        decentralization: allDefaultPermissions,
        emailSetting: {
          senderName: '',
          senderEmail: '',
          senderPassword: '',
          toManifestName: '',
          toManifestEmail: '',
          status: 'pending',
          content: {},
          schedule: [],
          timeCallApi: [],
          toDeliveryEmail: ''
        },
        sampleContent: {
          serviceContent: [],
          manifestContent: {
            name: '',
            title: '',
            content: ''
          },
          invitationContent: {
            title: '',
            content: ''
          },
          notificationContent: {
            title: '',
            content: ''
          }
        },
        systemNotifications: {
          content: '',
          position: '',
          date: new Date()
        }
      });
      
      message.success('Đăng ký thành công!');
    } catch (error: any) {
      console.error('Registration error:', error);
      const errorMessage = error.code === 'auth/email-already-in-use'
        ? 'Email đã được sử dụng'
        : 'Đăng ký thất bại';
      updateAuthState(null, errorMessage);
    }
  };

  // Email/Password Login
  const loginWithEmail = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const userData = await handleUserData(result.user);
      
      if (userData?.companyId) {
        const companyInfo = await getCompany(userData.companyId);
        if (!companyInfo) {
          console.warn('Company information not found');
        }
      }

      updateAuthState(userData);
      message.success('Đăng nhập thành công!');
    } catch (error: any) {
      console.error('Login error:', error);
      updateAuthState(null, 'Email hoặc mật khẩu không đúng');
      message.error('Email hoặc mật khẩu không đúng');
    }
  };

  // Sign Out
  const logout = async () => {
    try {
      await signOut(auth);
      updateAuthState(null);
      message.success('Đã đăng xuất');
    } catch (error) {
      console.error('Sign out error:', error);
      message.error('Đăng xuất thất bại');
    }
  };

  // Auth state observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          const userData = await handleUserData(firebaseUser);
          updateAuthState(userData);
        } else {
          updateAuthState(null);
        }
      } catch (error) {
        console.error('Auth state error:', error);
        updateAuthState(null, 'Kiểm tra tr���ng thái đăng nhập thất bại');
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    ...authState,
    companyLoading,
    companyInfo,
    signInWithGoogle,
    registerWithEmail,
    loginWithEmail,
    logout,
    uploadUserProfile
  };
};
