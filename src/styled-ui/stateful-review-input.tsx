import { debounce } from "lodash-es";
import { useCallback, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { LoadingSpinner } from "../svgs";
import { theme } from "../styles/theme";
import type { UpdateReviewRequest } from "../types";
import { API_URL, TOKEN_NAME } from "../const";
import { FitcoInput } from "./fitco-input";
import { ResetButton } from "./reset-components";

export default function StatefulReviewInput({
	productSpecificationId,
	content,
	onComplete,
}: {
	productSpecificationId: number;
	content: string;
	onComplete?: () => void;
}) {
	const inputRef = useRef<HTMLInputElement>(null);
	const [loadingState, setLoadingState] = useState<"none" | "edit" | "loading" | "success">("none");

	const debouncedUpdate = useMemo(
		() =>
			debounce(async (value: string) => {
				if (!productSpecificationId) {
					return;
				}

				const token = localStorage.getItem(TOKEN_NAME);

				const payload: UpdateReviewRequest = {
					productSpecificationId,
					content: value,
				};

				const response = await fetch(`${API_URL}/api/widget/reviews`, {
					method: "POST",
					body: JSON.stringify(payload),
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
						"ngrok-skip-browser-warning": "true",
					},
				});

				if (response.ok) {
					setLoadingState("success");
					onComplete?.();
				}
			}, 1000),
		[productSpecificationId, onComplete],
	);

	const handleClickEdit = useCallback(() => {
		setLoadingState("edit");
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setLoadingState("loading");
			const value = e.target.value;
			debouncedUpdate(value);
		},
		[debouncedUpdate],
	);

	const handleBlurInput = () => {
		setLoadingState("none");
		debouncedUpdate.cancel();
	};

	return (
		<Container>
			<Input
				$isActive={loadingState === "edit"}
				ref={inputRef}
				type="text"
				placeholder="착용감을 편하게 작성해 주세요."
				defaultValue={content}
				onChange={handleChange}
				onBlur={handleBlurInput}
			/>
			<StateContainer>
				{loadingState === "none" && (
					<ResetButton onClick={handleClickEdit}>
						<EditIcon />
					</ResetButton>
				)}
				{loadingState === "loading" && (
					<LoadingSpinner
						style={{
							fill: theme.color.primary[140],
							stroke: theme.color.primary[40],
						}}
					/>
				)}
				{loadingState === "success" && <CheckIcon />}
			</StateContainer>
		</Container>
	);
}

const Container = styled.div`
    position: relative;
    display: flex;
	box-sizing: border-box;
	width: 100%;
	height: 56px;
    border-radius: 16px;
	background: ${(props) => props.theme.color.primary[5]};
`;

const Input = styled(FitcoInput)<{ $isActive: boolean }>`
    position: absolute;
    inset: 0;
	padding: 16px 48px 16px 16px;
	pointer-events: ${(props) => (props.$isActive ? "auto" : "none")};
	border: 1px solid ${(props) => props.theme.color.primary[10]};
`;

const StateContainer = styled.div`
    z-index: 10;
    position: absolute;
    right: 16px;
    width: 24px;
    height: 24px;
    top: 50%;
    transform: translateY(-50%);
`;

function CheckIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
			<title>check</title>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M20.5813 4.18628C21.0307 4.50729 21.1348 5.13184 20.8138 5.58125L10.8138 19.5813C10.6351 19.8314 10.3513 19.9855 10.0442 19.999C9.7371 20.0126 9.44082 19.8842 9.24077 19.6508L3.24076 12.6508C2.88134 12.2315 2.9299 11.6002 3.34923 11.2408C3.76855 10.8813 4.39985 10.9299 4.75927 11.3492L9.92838 17.3798L19.1863 4.41878C19.5073 3.96937 20.1318 3.86527 20.5813 4.18628Z"
				fill="#6C757D"
			/>
		</svg>
	);
}

function EditIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
			<title>edit</title>
			<path
				d="M16.1402 4.66223C17.0232 3.77926 18.4548 3.77926 19.3378 4.66223C20.2207 5.5452 20.2207 6.97678 19.3378 7.85976L14.5415 12.656L11.344 9.45852L16.1402 4.66223Z"
				fill="#6C757D"
			/>
			<path
				d="M10.5446 10.2579L13.7421 13.4554L8.94582 18.2517L5.74829 15.0542L10.5446 10.2579Z"
				fill="#6C757D"
			/>
			<path
				d="M4.94891 15.8536L8.14643 19.0511L4.68756 19.9776C4.25539 20.0933 3.90668 19.7446 4.02244 19.3124L4.94891 15.8536Z"
				fill="#6C757D"
			/>
		</svg>
	);
}
