import { useId, useRef, useState } from "react";
import styled from "styled-components";
import { useUIContextDispatch } from "../../../context/ui";
import { LoadingDots, XIcon } from "../../../svgs";
import { ResetButton } from "../../../styled-ui/reset-components";
import { API_URL, TOKEN_NAME } from "../../../const";
import type { UpdateMemberRequest } from "../../../types";
import { useMemberContextDispatch } from "../../../context/member";
import { theme } from "../../../styles/theme";
import { useCloseWidget } from "../../../hooks/useCloseWidget";

export default function OnboardingIntro() {
	const { setViews } = useUIContextDispatch();
	const { updateMember } = useMemberContextDispatch();
	const closeWidget = useCloseWidget();
	const inputRef = useRef<HTMLInputElement>(null);
	const [loading, setLoading] = useState(false);
	const dontShowAgainCheckboxId = useId();

	const handleClickStart = async () => {
		if (!inputRef.current) {
			return;
		}
		if (inputRef.current.checked) {
			try {
				setLoading(true);
				const payload: UpdateMemberRequest = {
					onboarding: false,
				};
				const token = localStorage.getItem(TOKEN_NAME);
				const response = await fetch(`${API_URL}/api/widget/members/update`, {
					method: "POST",
					body: JSON.stringify(payload),
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
						"ngrok-skip-browser-warning": "true",
					},
				});
				if (!response.ok) {
					throw new Error("Failed to update member");
				}
				updateMember(payload);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		}
		setViews(["onboarding-form"]);
	};

	return (
		<Container>
			<Dialog>
				<Top>
					<img
						src="https://d22a5p9j44snqb.cloudfront.net/fitco_logo_204x101.png"
						alt="fitco logo"
						width={51}
						height={25}
					/>
					<ResetButton onClick={closeWidget}>
						<XIcon style={{ width: 24, height: 24 }} />
					</ResetButton>
				</Top>
				<Middle>
					<MiddleIntro>
						<MiddleIntroTitle>👋 핏코에 오신 걸 환영해요!</MiddleIntroTitle>
						{/* <MiddleIntroDescription>
							핏코는 리뷰와 구매 기록을 분석해서
							<br />
							가장 잘 맞는 사이즈와 핏을 추천해드려요.
						</MiddleIntroDescription> */}
					</MiddleIntro>
					<MiddleContent>
						<MiddleContentItem>👕 리뷰 한 줄만 남기면,</MiddleContentItem>
						<MiddleContentItem>📐 사이즈도 알려주고,</MiddleContentItem>
						<MiddleContentItem>📄 입었을 때 핏까지 말로 설명해줘요!</MiddleContentItem>
					</MiddleContent>
				</Middle>
				<Bottom>
					<StartButton onClick={handleClickStart} disabled={loading}>
						<StartButtonText>
							{loading ? (
								<LoadingDots style={{ width: 24, height: 24, fill: theme.color.primary[0] }} />
							) : (
								"시작하기"
							)}
						</StartButtonText>
					</StartButton>
					<DontShowAgain>
						<DontShowAgainCheckbox ref={inputRef} type="checkbox" id={dontShowAgainCheckboxId} />
						<DontShowAgainLabel htmlFor={dontShowAgainCheckboxId}>
							다시 보지 않기
						</DontShowAgainLabel>
					</DontShowAgain>
				</Bottom>
			</Dialog>
		</Container>
	);
}

const Container = styled.div`
	position: fixed;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.8);
`;

const Dialog = styled.div`
    padding: 24px 16px;
    width: 80vw;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    border-radius: 12px;
    background-color: white;
`;

const Top = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Middle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const MiddleIntro = styled.div`
    padding-bottom: 16px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    border-bottom: 1px solid lightgray;
`;

const MiddleIntroTitle = styled.div`
    color: ${(props) => props.theme.color.primary[140]};
    text-align: center;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%;
    letter-spacing: -0.4px;
`;

// const MiddleIntroDescription = styled.div`
//     color: ${(props) => props.theme.color.primary[80]};
//     text-align: center;
//     font-size: 14px;
//     font-style: normal;
//     font-weight: 400;
//     line-height: 150%;
//     letter-spacing: -0.28px;
// `;

const MiddleContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
`;

const MiddleContentItem = styled.div`
    color: ${(props) => props.theme.color.primary[100]};
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: -0.48px;
`;

const Bottom = styled.div`
    padding-top: 16px;;
`;

const StartButton = styled(ResetButton)`
    margin-bottom: 24px;
    width: 100%;
    height: 56px;
    display: flex;
    padding: 16px 24px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    border-radius: 16px;
    background: ${(props) => props.theme.color.primary[140]};
	box-shadow: 4px 4px 20px 0px hsla(0, 0%, 0%, 0.08);

`;

const StartButtonText = styled.div`
    color: ${(props) => props.theme.color.primary[0]};
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: -0.48px;
`;

const DontShowAgain = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 8px;  
`;

const DontShowAgainCheckbox = styled.input`
    width: 16px;
    height: 16px;
`;

const DontShowAgainLabel = styled.label`
    color: ${(props) => props.theme.color.primary[80]};
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: -0.42px;
`;
