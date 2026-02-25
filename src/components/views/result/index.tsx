import { useEffect } from "react";
import {
	useSizeResultContextDispatch,
	useSizeResultContextState,
} from "../../../context/size-result";
import ResultDesktop from "./desktop";
import LoadingFullscreen from "../../../styled-ui/loading-fullscreen";
import { useIsMobile } from "../../../hooks/useIsMobile";
import ResultMobile from "./mobile";

export default function Result({ type }: { type: "detail" | "summary" }) {
	const isMobile = useIsMobile();
	const { loading } = useSizeResultContextState();
	const { fetchSizeResult } = useSizeResultContextDispatch();
	// const [data, setData] = useState<SizeResult[]>([]);

	// const [selectedResult, setSelectedResult] = useState<SizeResult | null>(null);

	useEffect(() => {
		fetchSizeResult();
	}, [fetchSizeResult]);

	if (loading) {
		return <LoadingFullscreen />;
	}

	return isMobile ? <ResultMobile type={type} /> : <ResultDesktop type={type} />;
}
