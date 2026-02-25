import styled from "styled-components";
import { useCallback, useEffect, useId, useState } from "react";
import { API_URL, PRODUCT_CATEGORIES, TOKEN_NAME } from "../../../../../../const";
import { PrimaryButton } from "../../../../../../styled-ui/fitco-button";
import FitcoSelect from "../../../../../../styled-ui/fitco-select";
import type { CreateDirectReviewRequest } from "../../../../../../types";
import { LoadingDots, PlusIcon } from "../../../../../../svgs";
import { theme } from "../../../../../../styles/theme";
import { ResetButton } from "../../../../../../styled-ui/reset-components";
import { useOrderContextDispatch } from "../../../../../../context/order";
import { FitcoInput } from "../../../../../../styled-ui/fitco-input";

export default function DirectBlock() {
	const { refetchHistories } = useOrderContextDispatch();
	const [completed, setCompleted] = useState(false);
	const [loading, setLoading] = useState(false);
	const [brand, setBrand] = useState<string>("");
	const [productName, setProductName] = useState<string>("");
	const [category, setCategory] = useState<(typeof PRODUCT_CATEGORIES)[number]["value"]>();
	const [size, setSize] = useState<string>("");
	const [specs, setSpecs] = useState<{ key: string; value: string }[]>([]);
	const [review, setReview] = useState<string>("");
	const brandId = useId();
	const productNameId = useId();
	const sizeId = useId();

	const handleChangeBrand = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setBrand(e.target.value);
	}, []);

	const handleChangeProductName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setProductName(e.target.value);
	}, []);

	const handleChangeCategory = useCallback((value: string) => {
		const specKeys = PRODUCT_CATEGORIES.find((c) => c.value === value)?.keys ?? [];
		setSpecs(specKeys.map((key) => ({ key, value: "" })));
		setCategory(value as (typeof PRODUCT_CATEGORIES)[number]["value"]);
	}, []);

	const handleChangeSize = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setSize(e.target.value);
	}, []);

	const handleChangeSpecKey = useCallback((key: string, value: string) => {
		setSpecs((prev) => prev.map((item) => (item.key === key ? { ...item, key: value } : item)));
	}, []);

	const handleChangeSpec = useCallback((key: string, value: string) => {
		setSpecs((prev) => prev.map((item) => (item.key === key ? { ...item, value } : item)));
	}, []);

	const handleChangeReview = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setReview(e.target.value);
	}, []);

	const handleClickAddSpec = useCallback(() => {
		setSpecs((prev) => [...prev, { key: "", value: "" }]);
	}, []);

	const handleSubmit = async () => {
		try {
			setLoading(true);

			if (!category) {
				window.alert("카테고리를 선택해주세요.");
				return;
			}
			if (!size) {
				window.alert("구매한 사이즈를 입력해주세요.");
				return;
			}
			if (!review) {
				window.alert("착용감을 입력해주세요.");
				return;
			}
			if (!specs.length) {
				window.alert("사이즈 정보를 입력해주세요.");
				return;
			}

			const payload: CreateDirectReviewRequest = {
				brand: brand ?? null,
				productName: productName ?? null,
				category,
				size,
				spec: specs
					.filter((spec) => spec.key && !!spec.value)
					.reduce(
						(acc, cur) => {
							acc[cur.key] = cur.value;
							return acc;
						},
						{} as Record<string, string>,
					),
				review,
			};

			const token = localStorage.getItem(TOKEN_NAME);

			const response = await fetch(`${API_URL}/api/widget/reviews/direct`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
					"ngrok-skip-browser-warning": "true",
				},
				body: JSON.stringify(payload),
			});

			if (!response.ok) {
				throw new Error("Failed to crawl url");
			}

			setCompleted(true);
			refetchHistories();
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		handleChangeCategory(PRODUCT_CATEGORIES[0].value);
	}, [handleChangeCategory]);

	return (
		<Container>
			<InputContainer>
				<Label htmlFor={brandId}>브랜드</Label>
				<FitcoInput
					id={brandId}
					type="text"
					placeholder="브랜드 명"
					value={brand}
					onChange={handleChangeBrand}
				/>
			</InputContainer>
			<InputContainer>
				<Label htmlFor={productNameId}>상품명</Label>
				<FitcoInput
					id={productNameId}
					type="text"
					placeholder="상품명"
					value={productName}
					onChange={handleChangeProductName}
				/>
			</InputContainer>
			<HorizontalGrid>
				<InputContainer>
					<Label>카테고리 *</Label>
					<FitcoSelect
						options={PRODUCT_CATEGORIES.map((c) => ({
							label: c.label,
							value: c.value,
						}))}
						onChange={handleChangeCategory}
					/>
				</InputContainer>
				<InputContainer>
					<Label htmlFor={sizeId}>구매한 사이즈 *</Label>
					<FitcoInput id={sizeId} type="text" value={size} onChange={handleChangeSize} />
				</InputContainer>
			</HorizontalGrid>
			{category && (
				<SpecificSize>
					<SpecificSizeLabel>
						실측사이즈{" "}
						<SpecificSizeLabelDimmed>(모르는 항목은 비워두셔도 괜찮아요!)</SpecificSizeLabelDimmed>
					</SpecificSizeLabel>
					<SpecGroup>
						{specs.map((spec, index) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							<SpecItem key={`spec-item-${index}`}>
								<SpecKeyInput
									type="text"
									value={spec.key}
									onChange={(e) => handleChangeSpecKey(spec.key, e.target.value)}
									placeholder="직접입력"
								/>
								<SpecInput
									type="text"
									onChange={(e) => handleChangeSpec(spec.key, e.target.value)}
								/>
							</SpecItem>
						))}
						<SpecItem>
							<SpecKeyLabel>
								<AddSpecButton onClick={handleClickAddSpec}>
									<PlusIcon style={{ width: 24, height: 24, fill: theme.color.primary[140] }} />
								</AddSpecButton>
							</SpecKeyLabel>
							<SpecInput type="text" disabled />
						</SpecItem>
					</SpecGroup>
				</SpecificSize>
			)}
			<InputContainer>
				<FitcoInput
					type="text"
					value={review}
					placeholder="착용감을 편하게 작성해 주세요."
					onChange={handleChangeReview}
				/>
			</InputContainer>
			<PrimaryButton $isActive={!completed} onClick={handleSubmit} disabled={loading || completed}>
				{loading ? (
					<LoadingDots style={{ width: 24, height: 24, fill: theme.color.primary[0] }} />
				) : completed ? (
					"저장 완료"
				) : (
					"저장"
				)}
			</PrimaryButton>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
    margin-bottom: 24px;
	padding-bottom: 24px;
	border-bottom: 1px solid ${(props) => props.theme.color.primary[10]};

    &:last-child {
        border-bottom: none;
    }
`;

const InputContainer = styled.div`
    display: flex;
	flex-direction: column;
	gap: 4px;
`;

const Label = styled.label`
	color: ${(props) => props.theme.color.primary[60]};
	font-size: 14px;
	font-weight: 400;
	line-height: 150%;
	letter-spacing: -0.42px;
`;

const HorizontalGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 8px;
`;

const SpecGroup = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	border-top: 1px solid ${(props) => props.theme.color.primary[20]} !important;
	border-left: 1px solid ${(props) => props.theme.color.primary[20]} !important;
	
	/* & > *:nth-child(3) {
		border-right: 1px solid ${(props) => props.theme.color.primary[20]} !important;
	} */
`;

const SpecItem = styled.div`
	box-sizing: border-box;
	display: flex;
	flex-direction: column;

	border-top: none !important;
	border-bottom: 1px solid ${(props) => props.theme.color.primary[20]} !important;
	border-right: 1px solid ${(props) => props.theme.color.primary[20]} !important;
	border-left: none !important;
`;

const SpecKeyLabel = styled.div`
	box-sizing: border-box;
	width: 100%;
	height: 44px !important;
	display: flex;
	justify-content: center;
	align-items: center;
	color: ${(props) => props.theme.color.primary[140]};
	font-size: 16px;
	font-weight: 400;
	line-height: 150%;
	letter-spacing: -0.48px;
	border-top: none !important;
	border-left: none !important;
	border-right: none !important;
	border-bottom: 1px solid ${(props) => props.theme.color.primary[20]} !important;
`;

const SpecKeyInput = styled.input`
	padding: 0 12px !important;
	text-align: center;
	box-sizing: border-box;
	width: 100%;
	height: 44px !important;
	display: flex;
	justify-content: center;
	align-items: center;
	color: ${(props) => props.theme.color.primary[140]};
	font-size: 16px;
	font-weight: 400;
	line-height: 150%;
	letter-spacing: -0.48px;
	&::placeholder {
		color: ${(props) => props.theme.color.primary[60]};
	}
	border-top: none !important;
	border-left: none !important;
	border-right: none !important;
	border-bottom: 1px solid ${(props) => props.theme.color.primary[20]} !important;
`;

const SpecInput = styled.input`
	text-align: center;
	box-sizing: border-box;
	padding: 0 12px !important;
	width: 100%;
	height: 44px !important;
	color: ${(props) => props.theme.color.primary[100]};
	border-top: none !important;
	border-left: none !important;
	border-right: none !important;
	border-bottom: none !important;
`;

const AddSpecButton = styled(ResetButton)`
		height: 40px !important;
`;

const SpecificSize = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

const SpecificSizeLabel = styled.div`
	color: ${(props) => props.theme.color.primary[120]};
	font-size: 16px;
	font-weight: 400;
	line-height: 150%;
	letter-spacing: -0.48px;
`;

const SpecificSizeLabelDimmed = styled.span`
	color: ${(props) => props.theme.color.primary[60]};
	font-size: 14px;
	font-weight: 400;
	line-height: 150%;
	letter-spacing: -0.42px;
`;
