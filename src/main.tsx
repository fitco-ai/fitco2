// src/main.tsx
import ReactDOM from "react-dom/client";
import App from "./App";
import { CAFE24_API_VERSION, CAFE24_CLIENT_ID } from "./const";

function loadFont() {
	if (!document.getElementById("poppins-font")) {
		const link = document.createElement("link");
		link.id = "poppins-font";
		link.rel = "stylesheet";
		link.href = "https://fonts.cdnfonts.com/css/poppins";
		document.head.appendChild(link);
	}

	// if (!document.getElementById("pretendard-font")) {
	// 	const link = document.createElement("link");
	// 	link.id = "pretendard-font";
	// 	link.rel = "stylesheet";
	// 	link.crossOrigin = "anonymous";
	// 	link.href =
	// 		"https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-dynamic-subset.min.css";
	// 	document.head.appendChild(link);
	// }
}

function initCafe24API() {
	(window as any).CAFE24API.init({
		version: CAFE24_API_VERSION,
		client_id: CAFE24_CLIENT_ID,
	});
}

function mountReactWidget() {
	loadFont();
	if (import.meta.env.MODE !== "development") {
		initCafe24API();
	}
	let el = document.getElementById("fitcoai");

	// 없으면 자동 생성 및 주입
	if (!el) {
		el = document.createElement("div");
		el.id = "fitcoai";
		el.style.position = "relative";
		el.style.zIndex = "1000";
		document.body.appendChild(el);
	}

	ReactDOM.createRoot(el).render(<App />);
}

// 문서 로드 완료 후 실행
if (document.readyState === "complete") {
	mountReactWidget();
} else {
	window.addEventListener("load", mountReactWidget);
}
