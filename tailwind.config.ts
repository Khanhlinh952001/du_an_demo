import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1D3A5F',  // Xanh đậm (Sidebar, Header)
          dark: '#1E3A8A',     // Xanh đậm (Bảng tiêu đề)
        },
        background: '#F9FAFB',  // Xám nhạt (Nền chính)
        text: {
          primary: '#1F2937',   // Xám đậm (Tiêu đề chính)
          body: '#000000',      // Đen (Văn bản chính)
          footer: '#6B7280',    // Xám nhạt (Chân trang)
        },
        button: {
          primary: '#3490DC',   // Xanh dương (Nút chính)
          secondary: '#F59E0B', // Cam sáng (Nút phụ)
        },
        link: '#10B981',        // Xanh lá cây (Các liên kết)
        table: '#E5E7EB',       // Xám sáng (Các bảng dữ liệu)
        alert: {
          warning: '#F97316',   // Cam (Dữ liệu quan trọng)
          error: '#F43F5E',     // Đỏ (Thông báo hoặc cảnh báo)
        }
      }
    }
  },
  plugins: [],
};
export default config;
