import { useCallback } from "react";
import { API_URL } from "../const";
import { useAnalyticsContextState } from "../context/analytics";
import type { UpdateAnalyticsRequest } from "../types/analytics";

export function useUpdateAnalytics() {
	const { analyticsId } = useAnalyticsContextState();

	const updateAnalytics = useCallback(
		(value: UpdateAnalyticsRequest["value"]) => {
			const payload: UpdateAnalyticsRequest = {
				analyticsId,
				value,
			};
			const options: RequestInit = {
				method: "PATCH",
				headers: {
					"ngrok-skip-browser-warning": "true",
				},
				body: JSON.stringify(payload),
			};

			fetch(`${API_URL}/api/widget/analytics`, options).catch((e) => console.error(e));
		},
		[analyticsId],
	);

	return updateAnalytics;
}
