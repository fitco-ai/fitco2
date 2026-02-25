import { createContext, type ReactNode, useCallback, useContext, useMemo, useState } from "react";
import { API_URL, TOKEN_NAME } from "../const";
import type { GetOrderHistoryRequest, GetOrderHistoryResponseData, OrderHistory } from "../types";
import { useCafe24DataContext } from "./cafe24-data";
import _ from "lodash";

type OrderContextStateType = {
	histories: OrderHistory[] | null;
	loading: boolean;
};

type OrderContextDispatchType = {
	fetchHistories: () => Promise<void>;
	refetchHistories: () => Promise<void>;
	modifyReview: (reviewId: number, content: string) => Promise<void>;
	removeReviews: (reviewIds: number[]) => void;
	clearHistories: () => void;
};

const OrderContextState = createContext<OrderContextStateType | null>(null);
const OrderContextDispatch = createContext<OrderContextDispatchType | null>(null);

export default function OrderProvider({ children }: { children: ReactNode }) {
	const { cafe24MemberId } = useCafe24DataContext();
	const [histories, setHistories] = useState<OrderContextStateType["histories"]>(null);
	const [loading, setLoading] = useState(false);

	const modifyReview = useCallback(async (reviewId: number, content: string) => {
		setHistories((prev) => {
			if (!prev) {
				return null;
			}
			return prev.map((h) =>
				h.review?.id === reviewId
					? {
							...h,
							review: {
								...h.review,
								content,
							},
						}
					: h,
			);
		});
	}, []);

	const removeReviews = useCallback((reviewIds: number[]) => {
		setHistories((prev) => {
			if (!prev) {
				return null;
			}
			return prev.map((h) =>
				h.review && reviewIds.includes(h.review.id)
					? {
							...h,
							review: null,
						}
					: h,
			);
		});
	}, []);

	const refetchHistories = useCallback(async () => {
		try {
			const payload: GetOrderHistoryRequest = {
				cafe24MemberId,
			};

			const options: RequestInit = {
				method: "POST",
				headers: {
					"ngrok-skip-browser-warning": "true",
				},
				body: JSON.stringify(payload),
			};

			const token = localStorage.getItem(TOKEN_NAME);

			if (token) {
				options.headers = { ...options.headers, Authorization: `Bearer ${token}` };
			}

			const response = await fetch(`${API_URL}/api/widget/orders`, options);
			if (!response.ok) {
				throw new Error("Failed to update member");
			}
			const data = (await response.json()) as GetOrderHistoryResponseData;
			setHistories(data.orders);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}, [cafe24MemberId]);

	const fetchHistories = useCallback(async () => {
		if (histories) {
			return;
		}
		setLoading(true);
		refetchHistories();
	}, [histories, refetchHistories]);

	const clearHistories = useCallback(() => {
		setHistories(null);
	}, []);

	const memoizedDispatch = useMemo(
		() => ({ fetchHistories, modifyReview, removeReviews, refetchHistories, clearHistories }),
		[fetchHistories, modifyReview, removeReviews, refetchHistories, clearHistories],
	);

	return (
		<OrderContextDispatch.Provider value={memoizedDispatch}>
			<OrderContextState.Provider value={{ histories, loading }}>
				{children}
			</OrderContextState.Provider>
		</OrderContextDispatch.Provider>
	);
}

export function useOrderContextState() {
	const context = useContext(OrderContextState);
	if (!context) {
		throw new Error("useOrderContext must be used within a OrderProvider");
	}
	return context;
}

export function useOrderContextDispatch() {
	const context = useContext(OrderContextDispatch);
	if (!context) {
		throw new Error("useOrderContextDispatch must be used within a OrderProvider");
	}
	return context;
}
