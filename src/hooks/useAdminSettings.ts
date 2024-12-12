import { useState, useCallback, useEffect } from 'react';
import { 
  AdminSettings, 
  EmailSetting, 
  SampleContent, 
  Decentralization, 
  SystemNotifications 
} from '../types/AdminSettings';
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import { firestore } from '@/libs/firebase';
export const useAdminSettings = (adminId: string) => {
  const [settings, setSettings] = useState<AdminSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch settings from Firebase
  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);
      const settingsRef = doc(firestore, 'adminSettings', adminId);
      const settingsSnap = await getDoc(settingsRef);
      
      if (settingsSnap.exists()) {
        setSettings(settingsSnap.data() as AdminSettings);
      } else {
        // Tạo document mới nếu chưa tồn tại
        const initialSettings: AdminSettings = {
          adminId,
          emailSetting: {} as EmailSetting,
          sampleContent: {} as SampleContent,
          decentralization: {} as Decentralization,
          systemNotifications: {} as SystemNotifications,
        };
        await setDoc(settingsRef, initialSettings);
        setSettings(initialSettings);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [adminId]);

  // Load settings khi component mount
  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  // Email Settings handlers
  const updateEmailSettings = useCallback(async (newEmailSettings: Partial<EmailSetting>) => {
    try {
        const settingsRef = doc(firestore, 'adminSettings', adminId);
      await updateDoc(settingsRef, {
        emailSetting: {
          ...settings?.emailSetting,
          ...newEmailSettings,
          adminId
        }
      });
      setSettings(prev => prev ? {
        ...prev,
        emailSetting: {
          ...prev.emailSetting,
          ...newEmailSettings
        }
      } : null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  }, [adminId, settings]);

  // Price Settings handlers

  // Sample Content handlers
  const updateSampleContent = useCallback(async (newSampleContent: Partial<SampleContent>) => {
    try {
      const settingsRef = doc(firestore, 'adminSettings', adminId);
      await updateDoc(settingsRef, {
        sampleContent: {
          ...settings?.sampleContent,
          ...newSampleContent,
          adminId
        }
      });
      setSettings(prev => prev ? {
        ...prev,
        sampleContent: {
          ...prev.sampleContent,
          ...newSampleContent
        }
      } : null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  }, [adminId, settings]);

  // Decentralization handlers
  const updateDecentralization = useCallback(async (newDecentralization: Partial<Decentralization>) => {
    try {
      const settingsRef = doc(firestore, 'adminSettings', adminId);
      await updateDoc(settingsRef, {
        decentralization: {
          ...settings?.decentralization,
          ...newDecentralization,
          adminId
        }
      });
      setSettings(prev => prev ? {
        ...prev,
        decentralization: {
          ...prev.decentralization,
          ...newDecentralization
        }
      } : null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  }, [adminId, settings]);

  // System Notifications handlers
  const updateSystemNotifications = useCallback(async (newNotifications: Partial<SystemNotifications>) => {
    try {
      const settingsRef = doc(firestore, 'adminSettings', adminId);
      await updateDoc(settingsRef, {
        systemNotifications: {
          ...settings?.systemNotifications,
          ...newNotifications,
          adminId
        }
      });
      setSettings(prev => prev ? {
        ...prev,
        systemNotifications: {
          ...prev.systemNotifications,
          ...newNotifications
        }
      } : null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  }, [adminId, settings]);

  return {
    settings,
    loading,
    error,
    updateEmailSettings,
    updateSampleContent,
    updateDecentralization,
    updateSystemNotifications,
    refreshSettings: fetchSettings,
  };
}; 
