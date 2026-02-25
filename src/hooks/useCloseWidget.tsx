import { useCallback } from "react";
import { useUIContextDispatch, useUIContextState } from "../context/ui";
import { useUpdateAnalytics } from "./useUpdateAnalytics";

export function useCloseWidget() {
	const { views } = useUIContextState();
	const { setViews } = useUIContextDispatch();
	const updateAnalytics = useUpdateAnalytics();

	const view = views[views.length - 1];

	const closeWidget = useCallback(() => {
		setViews(["none"]);
		updateAnalytics({
			exitView: view,
		});
	}, [setViews, view, updateAnalytics]);

	return closeWidget;
}
