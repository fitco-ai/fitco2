import styled from "styled-components";
import { Formatters } from "../../../../utils/formatter";
import { useCallback, useState, useEffect } from "react";
import { LoadingDots } from "../../../../svgs";
import { API_URL, TOKEN_NAME } from "../../../../const";
import type { SignInRequest, SignInResponseData, RequestLoginCodeRequest } from "../../../../types";
import { theme } from "../../../../styles/theme";
import { useMemberContextDispatch } from "../../../../context/member";
import { useOrderContextDispatch } from "../../../../context/order";
import { useUIContextDispatch } from "../../../../context/ui";
import { ResetButton } from "../../../../styled-ui/reset-components";
import CodeInput from "../../../../styled-ui/code-input";

export default function FormCode({ phone }: { phone: string }) {
	const { setViews } = useUIContextDispatch();
	const { setMember } = useMemberContextDispatch();
	const { refetchHistories } = useOrderContextDispatch();
	const [value, setValue] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const submitCode = useCallback(
		async (code: string) => {
			try {
				const payload: SignInRequest = {
					phone,
					code,
				};

				const options: RequestInit = {
					method: "POST",
					body: JSON.stringify(payload),
				};

				const currentToken = localStorage.getItem(TOKEN_NAME);
				if (currentToken) {
					options.headers = {
						Authorization: `Bearer ${currentToken}`,
						"ngrok-skip-browser-warning": "true",
					};
				}
				const response = await fetch(`${API_URL}/api/widget/members/sign-in`, options);

				if (!response.ok) {
					throw new Error("Failed to confirm sign up code");
				}

				const data = (await response.json()) as SignInResponseData;

				const { token, member } = data;

				localStorage.setItem(TOKEN_NAME, token);
				setMember(member);
				refetchHistories();
				setViews(["order-list"]);
			} catch (error) {
				console.error(error);
				setError("인증번호가 일치하지 않습니다.");
			} finally {
				setLoading(false);
			}
		},
		[phone, setMember, refetchHistories, setViews],
	);

	const handleValueChange = useCallback(
		(value: string) => {
			setValue(value);
			if (value.length >= 6) {
				setLoading(true);
				submitCode(value);
			}
		},
		[submitCode],
	);

	const resendCode = useCallback(async () => {
		try {
			const payload: RequestLoginCodeRequest = {
				phone,
			};

			const response = await fetch(`${API_URL}/api/widget/members/code`, {
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

			setValue("");
			setError(null);
		} catch (error) {
			console.error(error);
		}
	}, [phone]);

	return (
		<div>
			<Title>코드를 입력해 주세요.</Title>
			<SubTitle>{Formatters.phone.simple(phone)}로 전송되었습니다.</SubTitle>
			<MarginBottom72>
				{loading ? (
					<LoadingDots style={{ width: 48, height: 48, fill: theme.color.primary[140] }} />
				) : (
					<CodeInput
						renderInput={(props) => {
							return (
								<InputContainer>
									<Input {...props} />
									{!props.value && <EmptyInputDot />}
								</InputContainer>
							);
						}}
						skipDefaultStyles={true}
						value={value}
						inputType="text"
						onChange={handleValueChange}
						numInputs={6}
						shouldAutoFocus={true}
					/>
				)}
				{error && <ErrorMessage>{error}</ErrorMessage>}
			</MarginBottom72>
			<ExpiresTime resendCode={resendCode} />
		</div>
	);
}

function ExpiresTime({ resendCode }: { resendCode: () => void }) {
	const [timeLeft, setTimeLeft] = useState(180); // 3분 = 180초

	const handleResendCode = useCallback(() => {
		resendCode();
		setTimeLeft(180);
	}, [resendCode]);

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft((prev) => {
				if (prev <= 1) {
					clearInterval(timer);
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	const formatTime = (seconds: number) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
	};

	return (
		<ExpiresTimeContainer>
			<ExpiresText>{`인증 대기 시간 ${formatTime(timeLeft)}`}</ExpiresText>
			<ResendButton onClick={handleResendCode}>문자 재전송</ResendButton>
		</ExpiresTimeContainer>
	);
}

const Title = styled.div`
	color: ${(props) => props.theme.color.primary[140]};
	font-size: 32px;
	font-style: normal;
	font-weight: 400;
	line-height: 44px;
	letter-spacing: -0.32px;
`;

const SubTitle = styled.div`
	margin-bottom: 66px;
	color: ${(props) => props.theme.color.primary[60]};
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;

const ErrorMessage = styled.div`
	color: ${(props) => props.theme.color.alarm[140]};
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;

const MarginBottom72 = styled.div`
	margin-bottom: 72px;
`;

const ExpiresTimeContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 12px;
`;

const ExpiresText = styled.div`
	color: ${(props) => props.theme.color.primary[60]};
	letter-spacing: -3%;
`;

const ResendButton = styled(ResetButton)`
	background-color: ${(props) => props.theme.color.primary[5]};
	border: 1px solid ${(props) => props.theme.color.primary[100]};
	color: ${(props) => props.theme.color.primary[100]};
	border-radius: 7px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 14px;
	letter-spacing: -3%;
	padding: 6px 10px;
`;

const InputContainer = styled.div`
	position: relative;
	width: 32px !important;
	height: 56px !important;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Input = styled.input`
	position: absolute;
	inset: 0;
	padding: 0px !important;
	height: 56px !important;
	border: none !important;
	outline: none !important;
	font-size: 32px !important;
	letter-spacing: -1% !important;
	line-height: 140% !important;
	text-align: center !important;
	caret-color: transparent;
`;

const EmptyInputDot = styled.div`
	z-index: 10;
	width: 16px;
	height: 16px;
	border-radius: 999px;
	background-color: ${(props) => props.theme.color.primary[10]};
	pointer-events: none;
`;
