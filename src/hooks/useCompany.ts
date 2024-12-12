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
      const companyRef = doc(firestore, 'Companies', companyId);
      const updatedData = {
        ...updateData,
        updatedAt: formatDate(new Date()),
      };

      await updateDoc(companyRef, updatedData);
      message.success('Cập nhật thông tin công ty thành công');
      return true;
    } catch (error: any) {
      setError(error.message);
      message.error('Không thể cập nhật thông tin công ty');
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