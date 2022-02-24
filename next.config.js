const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
	reactStrictMode: true,
	i18n: {
		locales: ["en"],
		defaultLocale: "en",
	},
	async rewrites() {
		return [{
			source: "/:any*",
			destination: "/",
		}]
	},
	async headers() {
		return [
			{
				// Headers to all routes in your application
				// source: '/:path*',
				source: '/:path*',
				headers: [
					{
						key: 'Content-Security-Policy',
						value: "default-src 'self'; font-src 'self' 'https://fonts.googleapis.com'; img-src 'self'; script-src 'self'",
					},
					{
						key: 'X-Frame-Options',
						value: 'DENY',
					},
					{
						key: 'X-Content-Type-Options',
						value: 'nosniff',
					},
					{
						key: 'Referrer-Policy',
						value: 'origin-when-cross-origin',
					},
					{
						key: 'Permissions-Policy',
						value: "camera=(); battery=(self); geolocation=(); microphone=()",
					},
				]
			},
		]
	}
});

// module.exports = {
// 	reactStrictMode: true,
// 	async rewrites() {
// 		return [{
// 			source: "/:any*",
// 			destination: "/",
// 		},];
// 	},
// };

