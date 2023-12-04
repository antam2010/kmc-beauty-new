/** @type {import('next').NextConfig} */
const nextConfig = {
    /**
     * Strict Mode는 개발 모드에서만 작동하며, 잠재적인 문제를 조기에 감지
     */
    reactStrictMode: true,
    /**
     * Next.js 빌드 시 JavaScript와 TypeScript 코드를 최적화하고 압축하여 성능을 향상시킵니다. SWC는 매우 빠른 성능을 제공하므로, 전체적인 빌드 시간을 단축시키는 데 효과적
     */
    swcMinify: true,

    /**
     * 재정의
     */
    async rewrites() {
        return [
           
        ]
    },
}
module.exports = nextConfig
