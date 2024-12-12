import { useState } from 'react';
import { doc, getDoc, setDoc, updateDoc, deleteDoc, collection, query, getDocs } from 'firebase/firestore';
import { firestore } from '@/libs/firebase';
import { CompanyInfo } from '@/types/Company';
import { message } from 'antd';
import { formatDate } from '@/utils/format';
import { generateCompanyId } from '@/utils/idGenerators';

export const useCompany = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [companies, setCompanies] = useState<CompanyInfo[]>([]);

  // Lấy thông tin một công ty
  const getCompany = async (companyId: string) => {
    try {
      setLoading(true);
      const companyRef = doc(firestore, 'Companies', companyId);
      const companyDoc = await getDoc(companyRef);
      
      if (!companyDoc.exists()) {
        throw new Error('Không tìm thấy thông tin công ty');
      }
      
      return companyDoc.data() as CompanyInfo;
      
    } catch (error: any) {
      setError(error.message);
      message.error('Không thể lấy thông tin công ty');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Lấy danh sách tất cả công ty
  const getAllCompanies = async () => {
    try {
      setLoading(true);
      const companiesRef = collection(firestore, 'Companies');
      const querySnapshot = await getDocs(companiesRef);
      const companiesList = querySnapshot.docs.map(doc => doc.data() as CompanyInfo);
      setCompanies(companiesList);
      return companiesList;
    } catch (error: any) {
      setError(error.message);
      message.error('Không thể lấy danh sách công ty');
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Tạo công ty mới
  const createCompany = async (companyData: Omit<CompanyInfo, 'companyId' | 'createdAt' | 'updatedAt'>) => {
    try {
      setLoading(true);
      const companyId = generateCompanyId();
      const newCompany: CompanyInfo = {
        ...companyData,
        companyId,
        logo: 'https://bavik.kr/wp-content/uploads/2024/01/9.png',
        phoneVnHan: [],
        phoneVnSgn: [],
        phoneKorea: [],
        warehouseKrAddress: '',
        warehouseVnHanAddress: '',
        warehouseVnSgnAddress: '',
        createdAt: formatDate(new Date()),
        updatedAt: formatDate(new Date()),
      };

      await setDoc(doc(firestore, 'Companies', companyId), newCompany);
      message.success('Tạo công ty thành công');
      return newCompany;
    } catch (error: any) {
      setError(error.message);
      message.error('Không thể tạo công ty mới');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Cập nhật thông tin công ty
  const updateCompany = async (companyId: string, updateData: Partial<CompanyInfo>) => {
    try {
        setLoading(true);
        console.log('Updating company:', companyId); // Log ID công ty
        console.log('Update data:', updateData); // Log dữ liệu cập nhật

        const companyRef = doc(firestore, 'Companies', companyId);
        
        // Kiểm tra document tồn tại
        const docSnap = await getDoc(companyRef);
        if (!docSnap.exists()) {
            throw new Error('Không tìm thấy thông tin công ty');
        }

        // Lọc bỏ các giá trị undefined hoặc null
        const cleanedData = Object.entries(updateData).reduce((acc, [key, value]) => {
            if (value !== undefined && value !== null) {
                acc[key] = value;
            }
            return acc;
        }, {} as Record<string, any>);

        const updatedData = {
            ...cleanedData,
            updatedAt: formatDate(new Date()),
        };

        console.log('Final update data:', updatedData); // Log dữ liệu cuối cùng

        await updateDoc(companyRef, updatedData);
        return true;
    } catch (error: any) {
        console.error('Update error:', error); // Log chi tiết lỗi
        setError(error.message);
        return false;
    } finally {
        setLoading(false);
    }
};
  // Xóa công ty
  const deleteCompany = async (companyId: string) => {
    try {
      setLoading(true);
      await deleteDoc(doc(firestore, 'Companies', companyId));
      message.success('Xóa công ty thành công');
      return true;
    } catch (error: any) {
      setError(error.message);
      message.error('Không thể xóa công ty');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    companies,
    getCompany,
    getAllCompanies,
    createCompany,
    updateCompany,
    deleteCompany,
  };
}; 
