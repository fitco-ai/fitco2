import { useCallback, useState } from "react";
import styled from "styled-components";
import { LoadingDots, XCircleIcon } from "../../../../svgs";
import { theme } from "../../../../styles/theme";
import { ResetButton } from "../../../../styled-ui/reset-components";
import { Formatters } from "../../../../utils/formatter";
import { API_URL } from "../../../../const";
import type { RequestLoginCodeRequest } from "../../../../types/member";
import { ViewTitle } from "../../../../styled-ui/view-title";

export default function FormPhone({ goCodeForm }: { goCodeForm: (phone: string) => void }) {
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

	return (
		<div>
			<ViewTitle $marginBottom="24px">핸드폰 번호를 입력해 주세요.</ViewTitle>
			<InputContainer>
				<Input
					value={value}
					onChange={handleValueChange}
					inputMode="numeric"
					autoComplete="off"
					placeholder="010 1234 5678"
				/>
				<ClearButton onClick={handleClickClear} disabled={!value}>
					<XCircleIcon style={{ fill: theme.color.primary[60], width: 24, height: 24 }} />
				</ClearButton>
			</InputContainer>
			{error && <ErrorMessage>{error}</ErrorMessage>}
			<SubmitButton onClick={handleSubmit} disabled={loading}>
				{loading ? (
					<LoadingDots style={{ width: 24, height: 24, fill: theme.color.primary[0] }} />
				) : (
					"인증번호 받기"
				)}
			</SubmitButton>
		</div>
	);
}

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
	margin-top: 60px;
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
