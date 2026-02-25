import styled from "styled-components";
import FitcoSelect from "../../../../../../../styled-ui/fitco-select";
import { useCallback, useState } from "react";
import { API_URL, PRODUCT_CATEGORIES, TOKEN_NAME } from "../../../../../../../const";
import { PrimaryButton } from "../../../../../../../styled-ui/fitco-button";
import type { SetUrlReviewRequest } from "../../../../../../../types";
import { FitcoInput } from "../../../../../../../styled-ui/fitco-input";
import { LoadingDots } from "../../../../../../../svgs";
import { theme } from "../../../../../../../styles/theme";
import { useOrderContextDispatch } from "../../../../../../../context/order";
import { Dialog } from "../../../../../../../styled-ui/dialog";

export default function ReviewProductForm({
	sizeOptions,
}: {
	sizeOptions: { value: string; label: string }[];
}) {
	const { refetchHistories } = useOrderContextDispatch();
	const [completed, setCompleted] = useState(false);
	const [loading, setLoading] = useState(false);
	const [selectedSpecId, setSelectedSpecId] = useState<string | null>(null);
	const [reviewContent, setReviewContent] = useState<string>();
	const [selectedCategory, setSelectedCategory] = useState<
		(typeof PRODUCT_CATEGORIES)[number]["value"] | null
	>(null);
	const [dialogProps, setDialogProps] = useState<{
		title: string;
		subtitle: string;
		onConfirm: () => void;
	} | null>(null);

	const handleChangeSpec = useCallback((value: string) => {
		setSelectedSpecId(value);
	}, []);

	const handleChangeReview = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setReviewContent(e.target.value);
	}, []);

	const handleSubmit = useCallback(async () => {
		try {
			if (!selectedCategory) {
				setDialogProps({
					title: "미입력된 항목이 있습니다.",
					subtitle: "카테고리를 선택해 주세요.",
					onConfirm: () => setDialogProps(null),
				});
				// window.alert("카테고리를 선택해 주세요.");
				return;
			}
			if (!selectedSpecId) {
				setDialogProps({
					title: "미입력된 항목이 있습니다.",
					subtitle: "사이즈를 선택해 주세요.",
					onConfirm: () => setDialogProps(null),
				});
				// window.alert("사이즈를 선택해 주세요.");
				return;
			}
			if (!reviewContent?.trim()) {
				setDialogProps({
					title: "미입력된 항목이 있습니다.",
					subtitle: "리뷰 내용을 입력해 주세요.",
					onConfirm: () => setDialogProps(null),
				});
				// window.alert("리뷰 내용을 입력해 주세요.");
				return;
			}
			setLoading(true);

			const payload: SetUrlReviewRequest = {
				productSpecificationId: Number(selectedSpecId),
				content: reviewContent,
				category: selectedCategory,
			};

			const token = localStorage.getItem(TOKEN_NAME);

			const response = await fetch(`${API_URL}/api/widget/reviews/url`, {
				method: "POST",
				body: JSON.stringify(payload),
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
					"ngrok-skip-browser-warning": "true",
				},
			});

			if (!response.ok) {
				throw new Error("Failed to set url review");
			}

			setCompleted(true);
			setLoading(false);
			refetchHistories();
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}, [selectedSpecId, reviewContent, refetchHistories, selectedCategory]);

	const handleChangeCategory = useCallback((value: string) => {
		setSelectedCategory(value as (typeof PRODUCT_CATEGORIES)[number]["value"]);
	}, []);

	return (
		<>
			<Container>
				<SelectGroup>
					<SelectContainer>
						<SelectLabel>카테고리 *</SelectLabel>
						<FitcoSelect
							options={PRODUCT_CATEGORIES.map((c) => ({
								label: c.label,
								value: c.value,
							}))}
							onChange={handleChangeCategory}
							value={
								selectedCategory
									? {
											label:
												PRODUCT_CATEGORIES.find((c) => c.value === selectedCategory)?.label ?? "",
											value: selectedCategory,
										}
									: undefined
							}
						/>
					</SelectContainer>
					<SelectContainer>
						<SelectLabel>사이즈</SelectLabel>
						<FitcoSelect options={sizeOptions} onChange={handleChangeSpec} />
					</SelectContainer>
				</SelectGroup>
				<InputContainer>
					<FitcoInput
						type="text"
						placeholder="착용감을 편하게 작성해 주세요."
						defaultValue=""
						onChange={handleChangeReview}
					/>
				</InputContainer>
				<PrimaryButton $isActive={!completed} onClick={handleSubmit} disabled={loading}>
					{loading ? (
						<LoadingDots style={{ width: 24, height: 24, fill: theme.color.primary[140] }} />
					) : completed ? (
						"저장 완료"
					) : (
						"저장"
					)}
				</PrimaryButton>
			</Container>
			<Dialog
				open={!!dialogProps}
				title={dialogProps?.title ?? ""}
				subtitle={dialogProps?.subtitle ?? ""}
				onConfirm={dialogProps?.onConfirm ?? (() => {})}
			/>
		</>
	);
}

const Container = styled.div``;

const SelectGroup = styled.div`
	margin-bottom: 8px;
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 8px;
`;

const SelectContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
`;

const SelectLabel = styled.span`
	color: ${(props) => props.theme.color.primary[60]};
	font-size: 14px;
	font-weight: 400;
	line-height: 150%;
	letter-spacing: -0.42px;
`;

const InputContainer = styled.div`
	margin-bottom: 8px;
    position: relative;
    display: flex;
	box-sizing: border-box;
	width: 100%;
	height: 56px;
    border-radius: 16px;
	background: ${(props) => props.theme.color.primary[5]};
`;

// const Input = styled(FitcoInput)`
//     position: absolute;
//     inset: 0;
//     border-radius: 16px;
// 	font-size: 16px;
// 	font-weight: 400;
// 	line-height: 150%;
// 	letter-spacing: -0.48px;
// 	padding: 16px 48px 16px 16px;
//     border: none !important;
//     background-color: transparent;

// 	&::placeholder {
// 		color: ${(props) => props.theme.color.primary[60]};
// 	}
// `;
