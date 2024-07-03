/** @type {import('next').NextConfig} */
import { resolve } from 'path';
const nextConfig = {
    // disable css-modules component styling
    webpack(config) {
        config.module.rules.forEach((rule) => {
            const { oneOf } = rule;
            if (oneOf) {
                oneOf.forEach((one) => {
                    if (!`${one.issuer?.and}`.includes('_app')) return;
                    one.issuer.and = [resolve(__dirname)];
                });
            }
        })
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"]
        });
        return config;
    },
    reactStrictMode: false
}


export default nextConfig