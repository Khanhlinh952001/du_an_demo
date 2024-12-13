import { Decentralization } from "@/types/AdminSettings";
import { useState } from "react";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { firestore } from "@/libs/firebase";
import { useEffect } from "react";
import { message } from "antd";

export const useDecentralization = (companyId: string) => {
    const ADMIN_SETTINGS_COLLECTION = 'adminSettings';
    const [loading, setLoading] = useState(false);
    const [decentralization, setDecentralization] = useState<Decentralization[]>([]);
    const [error, setError] = useState<string | null>(null);
    const createDecentralization = async (role: string, permission: string[]) => {
      try {
        setLoading(true);
        const adminSettingsRef = doc(firestore, ADMIN_SETTINGS_COLLECTION, companyId);
        const docSnap = await getDoc(adminSettingsRef);
        
        if (docSnap.exists()) {
          const currentDecentralization = docSnap.data()?.decentralization || [];
          const existingRoleIndex = currentDecentralization.findIndex(
            (item: Decentralization) => item.role === role
          );

          if (existingRoleIndex === -1) {
            await updateDoc(adminSettingsRef, {
              decentralization: [...currentDecentralization, { role, permission }]
            });
          }
        } else {
          await setDoc(adminSettingsRef, {
            adminId: companyId,
            decentralization: [{ role, permission }],
            emailSetting: {},
            sampleContent: {},
            systemNotifications: {}
          });
        }
  
        await getDecentralization();
      } catch (error) {
        console.error('Create decentralization error:', error);
        message.error('Không thể tạo phân quyền mới');
      } finally {
        setLoading(false);
      }
    };
  
    const updateDecentralization = async (role: string, permission: string[]) => {
      try {
        setLoading(true);
        const adminSettingsRef = doc(firestore, ADMIN_SETTINGS_COLLECTION, companyId);
        const docSnap = await getDoc(adminSettingsRef);
        
        if (docSnap.exists()) {
          const currentDecentralization = docSnap.data()?.decentralization || [];
          const updatedDecentralization = currentDecentralization.map(
            (item: Decentralization) => 
              item.role === role ? { role, permission } : item
          );

          await updateDoc(adminSettingsRef, {
            decentralization: updatedDecentralization
          });
        } else {
          await setDoc(adminSettingsRef, {
            adminId: companyId,
            decentralization: [{ role, permission }],
            emailSetting: {},
            sampleContent: {},
            systemNotifications: {}
          });
        }
  
        await getDecentralization();
      } catch (error) {
        console.error('Update decentralization error:', error);
        message.error('Không thể cập nhật phân quyền');
      } finally {
        setLoading(false);
      }
    };
  
    const deleteDecentralization = async (roleToDelete: string) => {
      try {
        setLoading(true);
        const adminSettingsRef = doc(firestore, ADMIN_SETTINGS_COLLECTION, companyId);
        const docSnap = await getDoc(adminSettingsRef);
        
        if (docSnap.exists()) {
          const currentDecentralization = docSnap.data()?.decentralization || [];
          const filteredDecentralization = currentDecentralization.filter(
            (item: Decentralization) => item.role !== roleToDelete
          );

          await updateDoc(adminSettingsRef, {
            decentralization: filteredDecentralization
          });
        }
  
        await getDecentralization();
      } catch (error) {
        console.error('Delete decentralization error:', error);
        message.error('Không thể xóa phân quyền');
      } finally {
        setLoading(false);
      }
    };
  
    const getDecentralization = async (): Promise<Decentralization[]> => {
      try {
        setLoading(true);
        const adminSettingsRef = doc(firestore, ADMIN_SETTINGS_COLLECTION, companyId);
        const docSnap = await getDoc(adminSettingsRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setDecentralization(data.decentralization || []);
          return data.decentralization || [];
        }
        
        await setDoc(adminSettingsRef, {
          adminId: companyId,
          decentralization: [],
          emailSetting: {},
          sampleContent: {},
          systemNotifications: {}
        });
        
        setDecentralization([]);
        return [];
      } catch (error) {
        console.error('Get decentralization error:', error);
        message.error('Không thể tải dữ liệu phân quyền');
        setDecentralization([]);
        return [];
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      if (companyId) {
        getDecentralization();
      }
    }, [companyId]);
  
    return {
      createDecentralization,
      updateDecentralization,
      deleteDecentralization,
      getDecentralization,
      loading,
      decentralization
    };
};