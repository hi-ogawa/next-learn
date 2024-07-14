import next from "next/vite";
import { defineConfig, loadEnv } from "vite";

Object.assign(process.env, loadEnv("development", import.meta.dirname, ""));

export default defineConfig({
	plugins: [next()],
	optimizeDeps: {
		// cannot (should not) pre-bundle node-gyp-build etc...
		exclude: ["bcrypt"],
	},
});
