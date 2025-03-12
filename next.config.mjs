/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // If you're not deploying to the root of your domain, uncomment and update this:
  // basePath: '/your-repo-name',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
