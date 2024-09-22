import next from "next/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
		next({
			plugins: [
				{
					name: "config",
					config: () => ({
						resolve: {
							alias: {
								// workaround next-auth's unusual import until
								// https://github.com/nextauthjs/next-auth/pull/11551
								'next/server.js': 'next/server',
								'next/headers.js': 'next/headers',
								'next/navigation.js': 'next/navigation',
							}
						}
					}),
				},
			],
		}),
	],
	optimizeDeps: {
		// cannot (should not) pre-bundle node-gyp-build etc...
		exclude: ["bcrypt"],
	},
});
