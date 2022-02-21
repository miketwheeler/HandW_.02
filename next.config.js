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
		},];
	},
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

