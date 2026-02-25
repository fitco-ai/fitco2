import styled from "styled-components";
import { ResetButton } from "../../../../styled-ui/reset-components";
import ViewMain from "../../../../styled-ui/view-main";
import { ArrowLeftIcon, CheckIcon, LoadingDots, XCircleIcon } from "../../../../svgs";
import { useUIContextDispatch } from "../../../../context/ui";
import SlidingUpFullscreenContainer from "../../../../styled-ui/sliding-up-fullscreen-container";
import { useCallback, useState } from "react";
import FormCode from "./form-code";
import ContactButton from "../../../../styled-ui/contact-button";
import { Formatters } from "../../../../utils/formatter";
import type { RequestLoginCodeRequest } from "../../../../types";
import { API_URL } from "../../../../const";
import { ViewSubTitle, ViewTitle } from "../../../../styled-ui/view-title";
import { theme } from "../../../../styles/theme";
import { BottomFloatingContainer } from "../../../../styled-ui/bottom-floating-container";

export type SignUpAgreement = {
	label: string;
	value: string;
	isRequired: boolean;
	checked: boolean;
};

const initialAgreements = [
	{
		label: "서비스 이용약관 동의",
		value: "service",
		isRequired: true,
		checked: false,
	},
	{
		label: "개인정보 수집·이용 동의",
		value: "privacy",
		isRequired: true,
		checked: false,
	},
	{
		label: "만 14세 이상 여부 확인",
		value: "age",
		isRequired: true,
		checked: false,
	},
	{
		label: "마케팅 정보 수신 동의",
		value: "marketing",
		isRequired: false,
		checked: false,
	},
	{
		label: "데이터 분석·맞춤형 추천 활용 동의",
		value: "data",
		isRequired: false,
		checked: false,
	},
];

export default function SignUp() {
	const { popView } = useUIContextDispatch();
	const [phase, setPhase] = useState<"phone" | "code">("phone");
	const [phone, setPhone] = useState<string>("");
	const [agreements, setAgreements] = useState(initialAgreements);

	const [value, setValue] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleCheckAgreement = useCallback((label: string) => {
		setAgreements((prev) =>
			prev.map((agreement) => {
				if (agreement.label === label) {
					return { ...agreement, checked: !agreement.checked };
				}
				return agreement;
			}),
		);
	}, []);

	const handleCheckAll = useCallback(() => {
		setAgreements((prev) => {
			const isAllChecked = prev.every((agreement) => agreement.checked);
			if (isAllChecked) {
				return prev.map((agreement) => ({ ...agreement, checked: false }));
			} else {
				return prev.map((agreement) => ({ ...agreement, checked: true }));
			}
		});
	}, []);

	const handleClickGoBack = () => {
		popView();
	};

	const goCodeForm = (phone: string) => {
		setPhase("code");
		setPhone(phone);
	};

	const handleValueChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(Formatters.phone.simple(e.target.value));
	}, []);

	const handleClickClear = useCallback(() => {
		setValue("");
	}, []);

	const handleSubmit = async () => {
		try {
			setLoading(true);
			const phoneRaw = Formatters.phone.removeSpaces(value);
			const payload: RequestLoginCodeRequest = {
				phone: phoneRaw,
			};

			const response = await fetch(`${API_URL}/api/widget/members/code/sign-up`, {
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
			setError("가입할 수 없는 핸드폰번호입니다.");
		} finally {
			setLoading(false);
		}
	};

	const isAllAgreementsChecked = agreements.every((agreement) => agreement.checked);
	const isRequiredAgreementsChecked = agreements
		.filter((a) => a.isRequired)
		.every((a) => a.checked);

	return (
		<SlidingUpFullscreenContainer>
			<Header>
				<HeaderLeft>
					<ResetButton onClick={handleClickGoBack}>
						<ArrowLeftIcon style={{ width: 24, height: 24 }} />
					</ResetButton>
					<HeaderTitle>회원가입</HeaderTitle>
				</HeaderLeft>
				<ContactButton />
			</Header>
			<ViewMain paddingHorizontal={24}>
				{phase === "phone" && (
					<div>
						<ViewTitle>핸드폰인증 한번으로 간편하게 로그인하세요.</ViewTitle>
						<ViewSubTitle $marginBottom="24px">
							로그인으로 내 정보를 모아보세요!
							<br />
							정보가 많을 수록 더 정확하고 다양한 결과를 받아보실 수 있어요.
						</ViewSubTitle>
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
						<Agreement>
							<AgreementButton onClick={handleCheckAll}>
								{isAllAgreementsChecked && (
									<CheckIcon
										style={{
											position: "absolute",
											left: 24,
											top: "50%",
											transform: "translateY(-50%)",
											strokeWidth: 2,
											width: 24,
											height: 24,
											fill: theme.color.primary[140],
										}}
									/>
								)}
								모두 동의합니다.
							</AgreementButton>
							<AgreementList>
								{agreements.map((agreement) => (
									<AgreementListItem key={agreement.label}>
										<AgreementListItemLabel>
											<AgreementListItemCheckbox
												type="checkbox"
												checked={agreement.checked}
												onChange={() => handleCheckAgreement(agreement.label)}
											/>
											<div>
												<span>{agreement.label}</span>
												<span>{agreement.isRequired ? " (필수)" : " (선택)"}</span>
											</div>
										</AgreementListItemLabel>
										<AgreementDetailButton>보기</AgreementDetailButton>
									</AgreementListItem>
								))}
							</AgreementList>
						</Agreement>
						{error && <ErrorMessage>{error}</ErrorMessage>}
					</div>
				)}
				{phase === "code" && (
					<FormCode
						phone={phone}
						optionalCheckedAgreementValues={agreements
							.filter((a) => !a.isRequired && a.checked)
							.map((a) => a.value)}
					/>
				)}
			</ViewMain>
			{phase === "phone" && (
				// bottom floating phone
				<BottomFloatingContainer>
					<SubmitButton
						onClick={handleSubmit}
						disabled={loading || !isRequiredAgreementsChecked || !value}
					>
						{loading ? (
							<LoadingDots style={{ width: 24, height: 24, fill: theme.color.primary[0] }} />
						) : (
							"인증번호 받기"
						)}
					</SubmitButton>
				</BottomFloatingContainer>
			)}
		</SlidingUpFullscreenContainer>
	);
}

const Header = styled.div`
    margin-top: 32px;
	margin-bottom: 40px;
	padding: 0px 24px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 20px;
`;

const HeaderLeft = styled.div`
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

// ------ phone

const InputContainer = styled.div`
	margin: 16px 0px 26px 0px;
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

const Agreement = styled.div`
	margin-bottom: 47px;
`;

const AgreementButton = styled(ResetButton)`
	position: relative;
	margin-bottom: 16px;
	width: 100%;
	padding: 16px 8px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 16px;
	color: ${(props) => props.theme.color.primary[140]};
	border: 1px solid ${(props) => props.theme.color.primary[10]};
	text-align: center;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: 150%;
	letter-spacing: -3%;
`;

const AgreementList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

const AgreementListItem = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const AgreementListItemLabel = styled.label`
	display: flex;
	align-items: center;
	gap: 8px;
	color: var(--Fitco-Primary-80, #6C757D);
	font-size: 12px;
	font-style: normal;
	font-weight: 400;
	line-height: 150%;
`;

const AgreementListItemCheckbox = styled.input`
	width: 16px;
	height: 16px;
`;

const AgreementDetailButton = styled(ResetButton)`
	color: ${(props) => props.theme.color.primary[60]};
	font-size: 12px;
	font-style: normal;
	font-weight: 400;
	line-height: 150%;
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

	&:disabled {
		background-color: ${(props) => props.theme.color.primary[10]};
		color: ${(props) => props.theme.color.primary[60]};
	}
`;

const ErrorMessage = styled.div`
	margin-bottom: 12px;
	color: ${(props) => props.theme.color.alarm[140]};
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;
