import styled from "styled-components";
import { ResetButton } from "../../../../styled-ui/reset-components";
import ViewMain from "../../../../styled-ui/view-main";
import { ArrowLeftIcon, LoadingDots, XCircleIcon } from "../../../../svgs";
import { useUIContextDispatch } from "../../../../context/ui";
import SlidingUpFullscreenContainer from "../../../../styled-ui/sliding-up-fullscreen-container";
import { useCallback, useState } from "react";
import FormCode from "./form-code";
import { Formatters } from "../../../../utils/formatter";
import type { RequestLoginCodeRequest } from "../../../../types";
import { API_URL } from "../../../../const";
import { ViewTitle } from "../../../../styled-ui/view-title";
import { theme } from "../../../../styles/theme";
import { BottomFloatingContainer } from "../../../../styled-ui/bottom-floating-container";

export default function SignIn() {
	const { popView } = useUIContextDispatch();
	const [phase, setPhase] = useState<"phone" | "code">("phone");
	const [phone, setPhone] = useState<string>("");

	const [value, setValue] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleValueChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(Formatters.phone.simple(e.target.value));
	}, []);

	const handleClickClear = useCallback(() => {
		setValue("");
	}, []);

	const handleSubmit = async () => {
		try {
			setError(null);
			setLoading(true);
			const phoneRaw = Formatters.phone.removeSpaces(value);
			const payload: RequestLoginCodeRequest = {
				phone: phoneRaw,
			};

			const response = await fetch(`${API_URL}/api/widget/members/code/sign-in`, {
				method: "POST",
				body: JSON.stringify(payload),
				headers: {
					"Content-Type": "application/json",
					"ngrok-skip-browser-warning": "true",
				},
			});

			if (!response.ok) {
				throw new Error("Failed to request sign in code");
			}

			goCodeForm(phoneRaw);
		} catch (error) {
			console.error(error);
			setError("계정을 찾을 수 없습니다.");
		} finally {
			setLoading(false);
		}
	};

	const handleClickGoBack = () => {
		popView();
	};

	const goCodeForm = (phone: string) => {
		setPhase("code");
		setPhone(phone);
	};

	return (
		<SlidingUpFullscreenContainer>
			<Header>
				<ResetButton onClick={handleClickGoBack}>
					<ArrowLeftIcon style={{ width: 24, height: 24 }} />
				</ResetButton>
				<HeaderTitle>로그인</HeaderTitle>
			</Header>
			<ViewMain paddingHorizontal={24}>
				{phase === "phone" && (
					<>
						<ViewTitle $marginBottom="24px">핸드폰 번호를 입력해 주세요.</ViewTitle>
						<InputContainer>
							<Input
								value={value}
								onChange={handleValueChange}
								inputMode="numeric"
								autoComplete="tel"
								placeholder="010 1234 5678"
							/>
							<ClearButton onClick={handleClickClear} disabled={!value}>
								<XCircleIcon style={{ fill: theme.color.primary[60], width: 24, height: 24 }} />
							</ClearButton>
						</InputContainer>
						{error && <ErrorMessage>{error}</ErrorMessage>}
					</>
				)}
				{phase === "code" && <FormCode phone={phone} />}
			</ViewMain>
			<BottomFloatingContainer>
				<SubmitButton onClick={handleSubmit} disabled={loading}>
					{loading ? (
						<LoadingDots style={{ width: 24, height: 24, fill: theme.color.primary[0] }} />
					) : (
						"인증번호 받기"
					)}
				</SubmitButton>
			</BottomFloatingContainer>
		</SlidingUpFullscreenContainer>
	);
}

const Header = styled.div`
    margin-top: 32px;
	margin-bottom: 40px;
	padding: 0px 24px;
	display: flex;
	align-items: center;
	gap: 20px;
`;

const HeaderTitle = styled.div`
	font-size: 16px;
	font-weight: 400;
	line-height: 100%;
	letter-spacing: 0%;
	color: ${(props) => props.theme.color.primary[140]};
`;

const InputContainer = styled.div`
	margin: 16px 0px;
	padding: 16px;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	width: 100%;
	height: 56px;
	gap: 16px;
	border-radius: 16px;
	background: var(--Fitco-Primary-5, #F8F9FA);
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
`;

const ClearButton = styled(ResetButton)`
	&:disabled {
		cursor: default;
		opacity: 0.4;
		pointer-events: none;
  }
`;

const SubmitButton = styled(ResetButton)`
	display: flex;
	width: 100%;
	padding: 16px 24px;
	justify-content: center;
	align-items: center;
	border-radius: 16px;
	background: ${(props) => props.theme.color.primary[140]};
	color: ${(props) => props.theme.color.primary[0]};
	text-align: center;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: 150%;
	letter-spacing: -0.48px;
	box-shadow: 4px 4px 20px 0px hsla(0, 0%, 0%, 0.08);
`;

const ErrorMessage = styled.div`
	color: ${(props) => props.theme.color.alarm[140]};
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;
