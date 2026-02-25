import { useCallback, useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useCloseWidget } from "../hooks/useCloseWidget";
import { useIsMobile } from "../hooks/useIsMobile";

const Y_OFFSET = 320;

export default function SlidingUpContainer({
	children,
	onDragEnd,
	bgReverse = false,
	initialExpanded = true,
	forceUp = false,
}: {
	children: React.ReactNode;
	onDragEnd?: (expanded: boolean) => void;
	bgReverse?: boolean;
	initialExpanded?: boolean;
	forceUp?: boolean;
}) {
	const isMobile = useIsMobile();
	const closeWidget = useCloseWidget();
	const [translateY, setTranslateY] = useState(initialExpanded ? 0 : window.innerHeight - Y_OFFSET);
	const [isDragging, setIsDragging] = useState(false); // ← transition 토글용
	const startYRef = useRef(0);
	const startTranslateYRef = useRef(0); // 드래그 시작 시점의 translateY 값
	const draggingRef = useRef(false);
	const rafRef = useRef<number | null>(null); // ← rAF throttle

	const commitTranslate = useCallback((y: number) => {
		// rAF로 부드럽게 업데이트 (선택)
		if (rafRef.current) cancelAnimationFrame(rafRef.current);
		rafRef.current = requestAnimationFrame(() => {
			setTranslateY(y);
		});
	}, []);

	// 공통 드래그 시작
	const startDrag = useCallback(
		(y: number) => {
			if (!isMobile) return;
			draggingRef.current = true;
			startYRef.current = y;
			startTranslateYRef.current = translateY; // 드래그 시작 시점의 현재 위치 저장
		},
		[isMobile, translateY],
	);

	// 공통 드래그 이동
	const moveDrag = useCallback(
		(y: number) => {
			setIsDragging(true);
			if (!draggingRef.current || !isMobile) return;
			const dy = y - startYRef.current;

			// 실제로 드래그가 시작되었을 때만 위치 업데이트
			if (isDragging || Math.abs(dy) > 5) {
				// 드래그 시작 시점의 위치에서 드래그 거리만큼 이동
				const newTranslateY = startTranslateYRef.current + dy;
				const next = Math.max(0, Math.min(newTranslateY, window.innerHeight * 0.8));
				commitTranslate(next);
			}
		},
		[commitTranslate, isMobile, isDragging],
	);

	// 공통 드래그 종료
	const endDrag = useCallback(
		(y: number) => {
			if (!draggingRef.current || !isMobile) return;
			draggingRef.current = false;
			setIsDragging(false);
			const dy = y - startYRef.current;
			const thresholdClose = window.innerHeight * 0.35;
			const thresholdHalf = window.innerHeight * 0.18;
			const thresholdUp = window.innerHeight * 0.15; // 위로 올릴 때 임계값

			// 화면 하위 15% 영역에서 손을 뗀 경우
			const bottomThreshold = window.innerHeight * 0.85;
			if (y > bottomThreshold) {
				closeWidget();
				return;
			}

			// 현재 위치를 기준으로 드래그 방향과 거리 판단
			const currentTranslateY = translateY;
			const isCurrentlyUp = currentTranslateY < window.innerHeight * 0.5;

			// 위로 올리는 동작 (dy가 음수)
			if (dy < -thresholdUp) {
				commitTranslate(0);
				if (isMobile) {
					onDragEnd?.(true);
				}
			}
			// 아래로 내리는 동작 (dy가 양수)
			else if (dy > thresholdClose) {
				commitTranslate(window.innerHeight - Y_OFFSET);
				if (isMobile) {
					onDragEnd?.(false);
				}
			} else if (dy > thresholdHalf) {
				commitTranslate(window.innerHeight - Y_OFFSET);
				if (isMobile) {
					onDragEnd?.(false);
				}
			} else {
				// 임계값에 도달하지 못한 경우 현재 위치에 따라 복원
				if (isCurrentlyUp) {
					// 현재 위쪽에 있으면 완전히 올라감
					commitTranslate(0);
					if (isMobile) {
						onDragEnd?.(true);
					}
				} else {
					// 현재 아래쪽에 있으면 완전히 내려감
					commitTranslate(window.innerHeight - Y_OFFSET);
					if (isMobile) {
						onDragEnd?.(false);
					}
				}
			}
		},
		[commitTranslate, isMobile, onDragEnd, closeWidget, translateY],
	);

	// Pointer 핸들러
	const onPointerDown = useCallback(
		(e: React.PointerEvent) => {
			if (!isMobile) return;
			(e.currentTarget as Element).setPointerCapture?.(e.pointerId);
			startDrag(e.clientY);
		},
		[isMobile, startDrag],
	);

	const onPointerMove = useCallback(
		(e: React.PointerEvent) => {
			moveDrag(e.clientY);
		},
		[moveDrag],
	);

	const onPointerUp = useCallback(
		(e: React.PointerEvent) => {
			endDrag(e.clientY);
		},
		[endDrag],
	);

	// Touch 폴백
	const onTouchStart = useCallback(
		(e: React.TouchEvent) => {
			if (!isMobile) return;
			startDrag(e.touches[0].clientY);
		},
		[isMobile, startDrag],
	);

	const onTouchMove = useCallback(
		(e: React.TouchEvent) => {
			moveDrag(e.touches[0].clientY);
		},
		[moveDrag],
	);

	const onTouchEnd = useCallback(
		(e: React.TouchEvent) => {
			const y = e.changedTouches[0]?.clientY ?? startYRef.current;
			endDrag(y);
		},
		[endDrag],
	);

	// 배경 스크롤 방지 (드래그 중에만)
	useEffect(() => {
		if (!isMobile) return;
		const prevent = (e: TouchEvent) => {
			if (draggingRef.current) e.preventDefault();
		};
		document.addEventListener("touchmove", prevent, { passive: false });
		return () => document.removeEventListener("touchmove", prevent);
	}, [isMobile]);

	useEffect(() => {
		if (!isMobile) return;
		if (forceUp) {
			commitTranslate(0);
		}
	}, [commitTranslate, forceUp, isMobile]);

	return (
		<Container>
			<Backdrop aria-hidden />
			<AnimatedWrap>
				{/* transform을 style로 전달 (클래스 재생성 방지) */}
				<SlidingArea
					$bgReverse={bgReverse}
					data-dragging={isDragging ? "1" : "0"}
					style={{ transform: `translateY(${translateY}px)` }}
				>
					<Handle
						aria-label="Drag handle"
						onPointerDown={onPointerDown}
						onPointerMove={onPointerMove}
						onPointerUp={onPointerUp}
						onTouchStart={onTouchStart}
						onTouchMove={onTouchMove}
						onTouchEnd={onTouchEnd}
					/>
					<Box>{children}</Box>
				</SlidingArea>
			</AnimatedWrap>
		</Container>
	);
}

const Container = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: end;

  @media (min-width: 600px) {
    align-items: center;
  }
`;

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0,0,0,0.3);
`;

const slideUp = keyframes`
  from { transform: translateY(300px); opacity: 0; }
  to   { transform: translateY(0);     opacity: 1; }
`;

const AnimatedWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  animation: ${slideUp} 0.3s ease-out forwards;
  @media (min-width: 600px) {
    animation: none;
  }
`;

// ★ transform 제거, transition은 data-attr로 토글
const SlidingArea = styled.div<{ $bgReverse: boolean }>`
  position: relative;
  width: 100%;
  border-radius: 12px 12px 0 0;
  overflow: hidden;
  height: 90vh;
  background-color: ${(props) => (props.$bgReverse ? props.theme.color.primary[5] : props.theme.color.primary[0])};
  box-sizing: content-box;
  touch-action: none;
  will-change: transform;

  transition: transform 0.2s ease-out;
  &[data-dragging="1"] {
    transition: none; /* 드래그 중 랙 방지 */
  }

  @media (min-width: 600px) {
    width: 50vw; min-width: 400px; max-width: 600px;
    height: 80vh; border-radius: 12px;
    animation: none; transform: none; transition: none;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.1);
  }
`;

const Handle = styled.button`
  appearance: none;
  border: 0;
  background: transparent;
  width: 100%;
  height: 24px;
  cursor: grab;
  touch-action: none;
  display: flex;
  justify-content: center;
  align-items: center;

  &::before {
    content: "";
    display: block;
    width: 40px;
    height: 5px;
    border-radius: 9999px;
    background: ${(props) => props.theme.color.primary[10]};
  }

  @media (min-width: 600px) {
    display: none;
  }
`;

const Box = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
