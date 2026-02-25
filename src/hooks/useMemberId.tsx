// [hold]
import { useEffect, useState } from "react";

export function useMemberId() {
	const [memberId, setMemberId] = useState<string | null>(null);

	useEffect(() => {
		// 모든 쿠키를 문자열로 가져옴 (예: "aaa=%7B%22member_id%22%3A%22flint%22%7D; other=value")
		const rawCookie = document.cookie
			.split("; ")
			.find((row) => row.startsWith("login_provider_1="));

		if (rawCookie) {
			const rawValue = rawCookie.split("=")[1]; // "%7B%22member_id%22%3A%22flint%22%7D"
			try {
				const decoded = decodeURIComponent(rawValue); // {"member_id":"flint",...}
				const parsed = JSON.parse(decoded);
				setMemberId(parsed.member_id); // "flint"
			} catch (err) {
				console.error("쿠키 파싱 오류:", err);
			}
		}
	}, []);

	return memberId;
}
