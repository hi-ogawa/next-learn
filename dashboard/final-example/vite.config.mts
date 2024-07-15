import next from "next/vite";
import { defineConfig, loadEnv } from "vite";

Object.assign(process.env, loadEnv("development", import.meta.dirname, ""));

export default defineConfig({
	plugins: [
		next({
			plugins: [
				{
					name: "config",
					config: () => ({
						ssr: {
							external: [
								"@vercel/postgres",
								"bcrypt",
								// need to inline next-auth, but we can externalize @auth/core,
								// which incldues cjs deps such as `cookie`
								"@auth/core",
							],
						},
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
