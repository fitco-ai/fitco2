import { createContext, type ReactNode, useContext, useEffect, useState } from "react";
import { API_URL } from "../const";
import type {
	InitializeAnalyticsRequest,
	InitializeAnalyticsResponseData,
} from "../types/analytics";
import { useCafe24DataContext } from "./cafe24-data";

type AnalyticsContextStateType = {
	analyticsId: number;
};

const AnalyticsContextState = createContext<AnalyticsContextStateType | null>(null);

export default function AnalyticsProvider({ children }: { children: ReactNode }) {
	const { cafe24MallId, shopNo } = useCafe24DataContext();
	const [analyticsId, setAnalyticsId] = useState<number | null>(null);

	useEffect(() => {
		const initialize = async () => {
			if (!cafe24MallId || !shopNo) {
				return;
			}

			const payload: InitializeAnalyticsRequest = {
				cafe24MallId,
				shopNo,
			};

			const options: RequestInit = {
				method: "POST",
				headers: {
					"ngrok-skip-browser-warning": "true",
				},
				body: JSON.stringify(payload),
			};

			const response = await fetch(`${API_URL}/api/widget/analytics`, options);

			if (!response.ok) {
				throw new Error("Failed to update member");
			}

			const data = (await response.json()) as InitializeAnalyticsResponseData;
			setAnalyticsId(data.analyticsId);
		};
		initialize();
	}, [cafe24MallId, shopNo]);

	if (!cafe24MallId || !analyticsId) {
		return null;
	}

	return (
		<AnalyticsContextState.Provider value={{ analyticsId }}>
			{children}
		</AnalyticsContextState.Provider>
	);
}

export function useAnalyticsContextState() {
	const context = useContext(AnalyticsContextState);
	if (!context) {
		throw new Error("useAnalyticsContext must be used within a AnalyticsProvider");
	}
	return context;
}
