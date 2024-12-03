import { EmployeeMockData } from "@/mocks/EmployeeMockData";

export const getEmployeeNameById = (employeeId: string): string => {
  const employee = EmployeeMockData.find(emp => emp.employeeId === employeeId);
  return employee ? employee.name : 'Không tìm thấy';
};

// Optional: Get full employee info if needed
export const getEmployeeById = (employeeId: string) => {
  return EmployeeMockData.find(emp => emp.employeeId === employeeId);
}; 
