import { useEffect, useState } from "react";

export function usePathname() {
	const [pathname, setPathname] = useState("");

	useEffect(() => {
		setPathname(window.location.pathname);
	}, []);

	return pathname;
}
