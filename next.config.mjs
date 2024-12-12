/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
      },
    images: {
        domains: ['bavik.kr','img.freepik.com','ui-avatars.com'], // Thêm domain của nguồn ảnh tại đây
    },

};

export default nextConfig;
