export interface User {
    uid: string;
    managerId?: string;
    companyId?: string;
    email: string;
    password: string;
    displayName: string;
    photoURL?: string;
    isAdmin?: boolean;
    avatar?:string;
    role?:string;
  }
  
  
  export interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
  } 
  