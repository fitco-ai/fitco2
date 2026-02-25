import { createContext, type ReactNode, useCallback, useContext, useMemo, useState } from "react";

export type View =
	| "none"
	| "login-methods"
	| "sign-in"
	| "sign-up"
	| "onboarding-intro"
	| "onboarding-form"
	| "result-summary"
	| "result-detail"
	| "order-list"
	| "mypage"
	| "promote-member"
	| "logout";

type UIContextStateType = {
	views: View[];
};

type UIContextDispatchType = {
	setViews: (arr: View[]) => void;
	pushView: (view: View) => void;
	popView: () => void;
};

const UIContext = createContext<UIContextStateType | null>(null);
const UIContextDispatch = createContext<UIContextDispatchType | null>(null);

export default function UIProvider({ children }: { children: ReactNode }) {
	const [views, setViews] = useState<View[]>(["none"]);

	const pushView = useCallback((view: View) => {
		setViews((prev) => [...prev, view]);
	}, []);

	const popView = useCallback(() => {
		setViews((prev) => prev.slice(0, -1));
	}, []);

	const memoizedDispatch = useMemo(() => ({ setViews, pushView, popView }), [pushView, popView]);

	return (
		<UIContextDispatch.Provider value={memoizedDispatch}>
			<UIContext.Provider value={{ views }}>{children}</UIContext.Provider>
		</UIContextDispatch.Provider>
	);
}

export function useUIContextState() {
	const context = useContext(UIContext);
	if (!context) {
		throw new Error("useUIContext must be used within a UIProvider");
	}
	return context;
}

export function useUIContextDispatch() {
	const context = useContext(UIContextDispatch);
	if (!context) {
		throw new Error("useUIContextDispatch must be used within a UIProvider");
	}
	return context;
}
