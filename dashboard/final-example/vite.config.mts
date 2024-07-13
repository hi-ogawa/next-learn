import next from "next/vite";
import { defineConfig } from "vite";

// TODO: loadEnv
process.env.POSTGRES_URL =
	"postgres://postgres:password@localhost:5432/development";
process.env.AUTH_SECRET =
	"ccb21d3e6f890b4c8e0f8abcf0816aab99f19acb1756f932f89508f97648ea49";

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
		exclude: ["@vercel/postgres", "bcrypt", "next-auth"],
	},
});
