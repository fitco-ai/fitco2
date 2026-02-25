import { createContext, type ReactNode, useCallback, useContext, useMemo, useState } from "react";
import { API_URL, TOKEN_NAME } from "../const";
import type {
	GetCompareSizeResultRequest,
	GetCompareSizeResultResponseData,
	GetSizeResultDetailRequest,
	GetSizeResultDetailResponseData,
	GetSizeResultRequest,
	GetSizeResultResponseData,
	SizeResult,
} from "../types/size-result";
import { useCafe24DataContext } from "./cafe24-data";
import { useRecommendationContextDispatch } from "./recommendation";
import { useUpdateAnalytics } from "../hooks/useUpdateAnalytics";

type SizeResultContextStateType = {
	sizeResults: SizeResult[] | null;
	compareSummaries: Record<string, { size: string; content: string }[]>;
	selectedSizeResult: SizeResult | null;
	loading: boolean;
	bestSize: string | null;
	canAnalyze: boolean;
	compareLoading: boolean;
	detailLoading: boolean;
};

type SizeResultContextDispatchType = {
	fetchSizeResult: () => Promise<void>;
	refetchSizeResult: () => Promise<void>;
	clearSizeResult: () => void;
	fetchCompareSummaries: (size1: SizeResult, size2: SizeResult) => Promise<void>;
	handleSelectSize: (size: string) => Promise<void>;
};

const SizeResultStateContext = createContext<SizeResultContextStateType | null>(null);
const SizeResultDispatchContext = createContext<SizeResultContextDispatchType | null>(null);

export default function SizeResultProvider({ children }: { children: ReactNode }) {
	const { refetchRecommendations } = useRecommendationContextDispatch();
	const { cafe24MallId, shopNo, iProductNo } = useCafe24DataContext();
	const updateAnalytics = useUpdateAnalytics();
	const [sizeResults, setSizeResults] = useState<SizeResultContextStateType["sizeResults"]>(null);
	const [compareSummaries, setCompareSummaries] = useState<
		SizeResultContextStateType["compareSummaries"]
	>({});
	const [canAnalyze, setCanAnalyze] = useState(false);
	const [loading, setLoading] = useState(true);
	const [compareLoading, setCompareLoading] = useState(false);
	const [detailLoading, setDetailLoading] = useState(false);
	const [selectedSizeResult, setSelectedSizeResult] =
		useState<SizeResultContextStateType["selectedSizeResult"]>(null);
	const bestSize = useMemo(() => sizeResults?.find((r) => r.best)?.size ?? null, [sizeResults]);

	/**
	 * fetch Detail
	 */
	const handleSelectSize = useCallback(
		async (size: string) => {
			const target = sizeResults?.find((r) => r.size === size);
			if (!target) {
				return;
			}
			console.log("handleSelectSize");
			const isAnalyzed = target.title && target.subTitle && target.descriptions;
			if (isAnalyzed) {
				setSelectedSizeResult(target);
			} else {
				try {
					if (!cafe24MallId || !shopNo || !iProductNo) {
						return;
					}
					setDetailLoading(true);
					setSelectedSizeResult(target);
					const token = localStorage.getItem(TOKEN_NAME);
					const payload: GetSizeResultDetailRequest = {
						cafe24MallId,
						shopNo,
						productNo: Number(iProductNo),
						size,
					};
					const response = await fetch(`${API_URL}/api/widget/size-result/detail`, {
						method: "POST",
						headers: {
							"ngrok-skip-browser-warning": "true",
							Accept: "application/json",
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify(payload),
					});
					const data = (await response.json()) as GetSizeResultDetailResponseData;
					const newSizeResult = { ...target, ...data };
					setSizeResults((prev) => {
						if (!prev) {
							return null;
						}
						return prev.map((sr) => (sr.size === size ? newSizeResult : sr));
					});
					setSelectedSizeResult(newSizeResult);
				} catch (error) {
					console.error(error);
				} finally {
					setDetailLoading(false);
				}
			}
		},
		[cafe24MallId, shopNo, iProductNo, sizeResults],
	);

	const clearSizeResult = useCallback(() => {
		setSizeResults(null);
		setCanAnalyze(false);
		setLoading(true);
	}, []);

	/**
	 * fetch all
	 */
	const refetchSizeResult = useCallback(async () => {
		console.log("refetchSizeResult");
		try {
			if (!cafe24MallId || !shopNo || !iProductNo) {
				return;
			}

			const token = localStorage.getItem(TOKEN_NAME);

			if (!token) {
				return;
			}

			setLoading(true);

			const payload: GetSizeResultRequest = {
				cafe24MallId,
				productNo: Number(iProductNo),
				shopNo,
			};

			const response = await fetch(`${API_URL}/api/widget/size-result`, {
				method: "POST",
				headers: {
					"ngrok-skip-browser-warning": "true",
					Accept: "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(payload),
			});

			const data = (await response.json()) as GetSizeResultResponseData;
			setCanAnalyze(data.canAnalyze);
			setSizeResults(data.sizeResults);
			refetchRecommendations();
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}, [cafe24MallId, shopNo, iProductNo, refetchRecommendations]);

	/**
	 * fetch Summary
	 */
	const fetchSizeResult = useCallback(async () => {
		if (sizeResults) {
			return;
		}
		console.log("fetchSizeResult");
		try {
			if (!cafe24MallId || !shopNo || !iProductNo) {
				return;
			}

			const token = localStorage.getItem(TOKEN_NAME);

			if (!token) {
				return;
			}
			setLoading(true);
			const payload: GetSizeResultRequest = {
				cafe24MallId,
				productNo: Number(iProductNo),
				shopNo,
			};

			const response = await fetch(`${API_URL}/api/widget/size-result/summary`, {
				method: "POST",
				headers: {
					"ngrok-skip-browser-warning": "true",
					Accept: "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(payload),
			});

			const data = (await response.json()) as GetSizeResultResponseData;
			setCanAnalyze(data.canAnalyze);
			setSizeResults(data.sizeResults);
			setSelectedSizeResult(data.sizeResults?.find((sr) => sr.best) ?? null);
			refetchRecommendations();
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
		updateAnalytics({
			result: true,
		});
	}, [sizeResults, refetchRecommendations, updateAnalytics, cafe24MallId, shopNo, iProductNo]);

	const fetchCompareSummaries = useCallback(
		async (size1: SizeResult, size2: SizeResult) => {
			console.log("fetchCompareSummaries");
			if (!sizeResults || !cafe24MallId || !shopNo || !iProductNo) {
				return;
			}
			const key = resolveCompareSummaryKey(size1.size, size2.size);
			if (compareSummaries[key]) {
				return;
			}
			setCompareLoading(true);
			const token = localStorage.getItem(TOKEN_NAME);

			if (!token) {
				return;
			}
			const payload: GetCompareSizeResultRequest = {
				cafe24MallId,
				productNo: Number(iProductNo),
				size1,
				size2,
				shopNo,
			};
			const response = await fetch(`${API_URL}/api/widget/size-result/compare`, {
				method: "POST",
				headers: {
					"ngrok-skip-browser-warning": "true",
					Accept: "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(payload),
			});
			const data = (await response.json()) as GetCompareSizeResultResponseData;
			setCompareSummaries((prev) => ({ ...prev, [key]: data.compareSummaries }));
			setCompareLoading(false);
		},
		[sizeResults, cafe24MallId, compareSummaries, shopNo, iProductNo],
	);

	const memoizedDispatch = useMemo(
		() => ({
			refetchSizeResult,
			fetchSizeResult,
			clearSizeResult,
			fetchCompareSummaries,
			handleSelectSize,
		}),
		[refetchSizeResult, fetchSizeResult, clearSizeResult, fetchCompareSummaries, handleSelectSize],
	);

	return (
		<SizeResultDispatchContext.Provider value={memoizedDispatch}>
			<SizeResultStateContext.Provider
				value={{
					sizeResults,
					loading,
					bestSize,
					canAnalyze,
					compareSummaries,
					compareLoading,
					selectedSizeResult,
					detailLoading,
				}}
			>
				{children}
			</SizeResultStateContext.Provider>
		</SizeResultDispatchContext.Provider>
	);
}

export function useSizeResultContextState() {
	const context = useContext(SizeResultStateContext);
	if (!context) {
		throw new Error("useSizeResultContext must be used within a SizeResultProvider");
	}
	return context;
}

export function useSizeResultContextDispatch() {
	const context = useContext(SizeResultDispatchContext);
	if (!context) {
		throw new Error("useSizeResultContextDispatch must be used within a SizeResultProvider");
	}
	return context;
}

export function resolveCompareSummaryKey(size1: string, size2: string) {
	const [a, b] = [size1, size2].sort();
	return `${a}-${b}`;
}
