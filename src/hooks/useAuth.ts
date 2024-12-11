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
import { generateCompanyId } from '@/utils/idGenerators';


// Thêm hàm để lấy thông tin quốc gia


export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null
  });
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);

  // Utility function to update auth state
  const updateAuthState = (user: User | null, error: string | null = null) => {
    setAuthState({ user, loading: false, error });
  };

  // Create or update user in Firestore
  const handleUserData = async (firebaseUser: any): Promise<User> => {
                const userRef = doc(firestore, 'users', firebaseUser.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      // New user - create with trial period
      const userData: User = {
        uid: firebaseUser.uid,
        email: firebaseUser.email || '',
        displayName: firebaseUser.displayName || '',
        photoURL: firebaseUser.photoURL || '',
        password: '',
      };

      await setDoc(userRef, userData);
      return userData;
    }

    // Existing user - update trial status
    const userData = userDoc.data() as User;
    return userData;
  };

  const getCompanyInfo = async (companyId: string) => {
    const companyRef = doc(firestore, 'Companies', companyId);
    const companyDoc = await getDoc(companyRef);
    setCompanyInfo(companyDoc.data() as CompanyInfo);
    return companyDoc.data() as CompanyInfo;
  };
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
      const companyInfo = await getCompanyInfo(userData?.companyId || '');
      setCompanyInfo(companyInfo);
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
  const registerWithEmail = async (email: string, password: string, displayName: string, values: any) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const companyId = generateCompanyId(); // Store the generated ID
      const Company: CompanyInfo = {
        companyId,
        companyName: values.companyName,
        companyCode: values.companyCode,
        bizLicenseNumber: values.bizLicenseNumber,
        companyAddress: values.companyAddress,
        companyPhone: values.companyPhone,
        companyEmail: values.companyEmail,
        createdAt: formatDate(new Date()),
        password: password,
        representativeName: values.representativeName,
        updatedAt: formatDate(new Date()),
      };
      await setDoc(doc(firestore, 'Companies', companyId), Company);
      const userData: User = {
        uid: result.user.uid,
        email: email,
        password: password,
        displayName: displayName,
        photoURL: '',
        role:'Manage',
        companyId,
      };

      await setDoc(doc(firestore, 'Users', userData.uid), userData);
      
      updateAuthState(userData);
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
      updateAuthState(userData);
      const companyInfo = await getCompanyInfo(userData?.companyId || '');
      setCompanyInfo(companyInfo);
      message.success('Đăng nhập thành công!');
    } catch (error: any) {
      console.error('Login error:', error);
      const errorMessage = 'Email hoặc mật khẩu không đúng';
      updateAuthState(null, errorMessage);
      message.error(errorMessage);
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
        updateAuthState(null, 'Kiểm tra trạng thái đăng nhập thất bại');
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    ...authState,
    signInWithGoogle,
    logout,
    registerWithEmail,
    loginWithEmail,
    companyInfo
  };
};
