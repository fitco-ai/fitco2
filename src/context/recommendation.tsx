import { createContext, type ReactNode, useCallback, useContext, useMemo, useState } from "react";
import { API_URL, TOKEN_NAME } from "../const";
import type { GetMemberRecommendationResponseData, Recommendation } from "../types/recommendation";

type RecommendationContextStateType = {
	recommendations: Recommendation[];
	loading: boolean;
};

type RecommendationContextDispatchType = {
	fetchRecommendations: () => Promise<void>;
	refetchRecommendations: () => Promise<void>;
	clearRecommendations: () => void;
};

const RecommendationContextState = createContext<RecommendationContextStateType | null>(null);
const RecommendationContextDispatch = createContext<RecommendationContextDispatchType | null>(null);

export default function RecommendationProvider({ children }: { children: ReactNode }) {
	const [recommendations, setRecommendations] = useState<Recommendation[] | null>(null);
	const [loading, setLoading] = useState(false);

	const clearRecommendations = useCallback(() => {
		setRecommendations(null);
		setLoading(false);
	}, []);

	const refetchRecommendations = useCallback(async () => {
		try {
			setLoading(true);

			const options: RequestInit = {
				method: "GET",
				headers: {
					"ngrok-skip-browser-warning": "true",
				},
			};

			const token = localStorage.getItem(TOKEN_NAME);

			if (token) {
				options.headers = { ...options.headers, Authorization: `Bearer ${token}` };
			}

			const response = await fetch(`${API_URL}/api/widget/recommendations`, options);

			if (!response.ok) {
				throw new Error("Failed to update member");
			}

			const data = (await response.json()) as GetMemberRecommendationResponseData;
			setRecommendations(data.recommendations);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}, []);

	const fetchRecommendations = useCallback(async () => {
		if (recommendations) {
			return;
		}
		refetchRecommendations();
	}, [recommendations, refetchRecommendations]);

	const memoizedDispatch = useMemo(
		() => ({ fetchRecommendations, refetchRecommendations, clearRecommendations }),
		[fetchRecommendations, refetchRecommendations, clearRecommendations],
	);

	return (
		<RecommendationContextDispatch.Provider value={memoizedDispatch}>
			<RecommendationContextState.Provider
				value={{ recommendations: recommendations ?? [], loading }}
			>
				{children}
			</RecommendationContextState.Provider>
		</RecommendationContextDispatch.Provider>
	);
}

export function useRecommendationContextState() {
	const context = useContext(RecommendationContextState);
	if (!context) {
		throw new Error("useRecommendationContext must be used within a RecommendationProvider");
	}
	return context;
}

export function useRecommendationContextDispatch() {
	const context = useContext(RecommendationContextDispatch);
	if (!context) {
		throw new Error(
			"useRecommendationContextDispatch must be used within a RecommendationProvider",
		);
	}
	return context;
}
