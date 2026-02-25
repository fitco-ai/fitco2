import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
	plugins: [
		react({
			babel: {
				plugins: [["babel-plugin-styled-components", { displayName: true }]],
			},
		}),
		svgr(),
	],
	build: {
		lib: {
			// 진입점 (엔트리 파일)
			entry: "src/main.tsx",
			name: "Fitcoai",
			fileName: () => "fitcoai.js",
			formats: ["iife"],
		},
		cssCodeSplit: false,
		minify: true,
	},
	define: {
		"process.env.NODE_ENV": JSON.stringify("production"),
	},
	server: {
		allowedHosts: true,
	},
});
