import next from "next/vite";
import { defineConfig } from "vite";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

const external = ["@vercel/postgres", "bcrypt", "next-auth"];

export default defineConfig({
	plugins: [
		next({
			plugins: [
				{
					name: "config",
					config: () => ({
						resolve: {
							alias: {
								"next/server.js": require.resolve("next/server"),
							},
						},
						ssr: {
							external,
						},
					}),
				},
			],
		}),
	],
	optimizeDeps: {
		exclude: external,
	},
});
