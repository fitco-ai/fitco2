import { useEffect, useRef } from "react";

/**
 * 컴포넌트 외부를 가리지 않은 상태에서(pointer event 가능한 상태) 외부 클릭시 close를 실행하는 ref
 */
export default function useClickOutsideRef(close: () => void, closeOnScroll: boolean) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				close();
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		if (closeOnScroll) {
			document.addEventListener("scroll", close, { capture: true });
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			if (closeOnScroll) {
				document.removeEventListener("scroll", close, { capture: true });
			}
		};
	}, [close, closeOnScroll]);

	return ref;
}
