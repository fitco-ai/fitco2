import { useCallback, useState } from "react";
import styled from "styled-components";
import { isValidUrl } from "../../../../../../../utils/ common";
import { LoadingSpinner } from "../../../../../../../svgs";
import { PrimaryButton } from "../../../../../../../styled-ui/fitco-button";
import ReviewProductForm from "./review-product-form";
import { API_URL, CDN_URL, TOKEN_NAME } from "../../../../../../../const";
import type { CrawlUrlRequest, CrawlUrlResponseData } from "../../../../../../../types/url";
import type { Spec } from "../../../../../../../types";

export default function UrlBlock({ titleToDirect }: { titleToDirect: () => void }) {
	const [url, setUrl] = useState("");
	const [isValid, setIsValid] = useState(false);
	const [step, setStep] = useState<"url" | "loading" | "other-info" | "invalid-url">("url");
	const [productSpecifications, setProductSpecifications] = useState<Spec[]>();

	const handleValueChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setUrl(e.target.value);
		setIsValid(isValidUrl(e.target.value));
	}, []);

	const handleSendUrl = useCallback(async () => {
		try {
			setStep("loading");

			const payload: CrawlUrlRequest = {
				url,
			};

			const token = localStorage.getItem(TOKEN_NAME);

			const response = await fetch(`${API_URL}/api/widget/url/crawl`, {
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

			const data = (await response.json()) as CrawlUrlResponseData;
			if (data.data) {
				const { specs } = data.data;
				setProductSpecifications(specs);
				setStep("other-info");
				titleToDirect();
				return;
			}

			if (!data.isValidUrl) {
				setStep("invalid-url");
				return;
			}
		} catch (error) {
			console.error(error);
			setStep("invalid-url");
		}
	}, [url, titleToDirect]);

	return (
		<Container>
			<MarginBottom10>
				<Row>
					<InputContainer>
						<Input
							value={url}
							onChange={handleValueChange}
							autoComplete="off"
							placeholder="URL을 입력해 주세요"
						/>
						{step === "loading" && <LoadingSpinner style={{ width: 24, height: 24 }} />}
						{step === "other-info" && (
							<img src={`${CDN_URL}/check_circle_green_20x20.png`} width={24} height={24} alt="" />
						)}
					</InputContainer>
					<SendButton
						$isActive={isValid}
						disabled={!isValid || step === "loading"}
						onClick={handleSendUrl}
					>
						확인
					</SendButton>
				</Row>
				{step === "invalid-url" && (
					<InvalidUrl>URL 인식 불가. 수동입력을 이용해 주세요.</InvalidUrl>
				)}
				{step === "other-info" && !!productSpecifications && (
					<ReviewProductForm
						sizeOptions={productSpecifications.map((spec) => ({
							value: spec.id.toString(),
							label: spec.size ?? "Free",
						}))}
					/>
				)}
			</MarginBottom10>
		</Container>
	);
}

const Container = styled.div`
	padding: 16px 16px 20px 16px;
	border-bottom: 1px solid ${(props) => props.theme.color.primary[10]};

    &:last-child {
        border-bottom: none;
    }
`;

const MarginBottom10 = styled.div`
	margin-bottom: 10px;
`;

const Row = styled.div`
	margin-bottom: 10px;
	display: flex;
	align-items: center;
	gap: 12px;

`;

const InputContainer = styled.div`
	flex: 1;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	padding: 0px 16px;
	gap: 16px;
	border-radius: 16px;
	background: ${(props) => props.theme.color.primary[5]};
`;

const Input = styled.input`
	box-sizing: border-box;
	width: 100%;
	height: 56px;
	outline: none;
	border: none;
	color: ${(props) => props.theme.color.primary[140]};
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: 150%;
	letter-spacing: -0.48px;
	background-color: transparent;

	&::placeholder {
		color: ${(props) => props.theme.color.primary[60]};
	}
`;

const SendButton = styled(PrimaryButton)`
	width: 77px;
	padding: 0px;
`;

// const ClearButton = styled(ResetButton)`
// 	&:disabled {
// 		cursor: default;
// 		opacity: 0.4;
// 		pointer-events: none;
//   }
// `;

const InvalidUrl = styled.div`
	margin-top: 8px;
	color: ${(props) => props.theme.color.alarm[140]};
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: 150%;
	letter-spacing: -0.42px;
`;
