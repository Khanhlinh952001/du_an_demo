// Lọc theo ngày
export const filterByDate = (data: any[], startDate: Date, endDate: Date) => {
    return data.filter(item => {
      const itemDate = new Date(item.date); // Giả sử mỗi đối tượng có trường `date`
      return itemDate >= startDate && itemDate <= endDate;
    });
  };
  
  // Lọc theo tên
  export const filterByName = (data: any[], name: string) => {
    return data.filter(item => item.name.toLowerCase().includes(name.toLowerCase()));
  };
  
  // Lọc theo trạng thái
  export const filterByStatus = (data: any[], status: string) => {
    return data.filter(item => item.status === status);
  };
  
  // Lọc theo nhiều tiêu chí (Ví dụ: lọc theo ngày và tên)
  export const filterByMultipleCriteria = (data: any[], name: string, startDate: Date, endDate: Date) => {
    return data.filter(item => {
      const itemDate = new Date(item.date);
      return item.name.toLowerCase().includes(name.toLowerCase()) && itemDate >= startDate && itemDate <= endDate;
    });
  };
  