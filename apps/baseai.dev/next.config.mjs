
import withSearch from './src/mdx/search.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'raw.githubusercontent.com',
			},
		],
	},
	transpilePackages: ['next-mdx-remote'],
	async redirects() {
		return [];
	}
};

export default withSearch(nextConfig);
