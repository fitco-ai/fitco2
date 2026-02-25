import styled from "styled-components";
import { useUIContextDispatch } from "../../../context/ui";
import { ResetButton } from "../../../styled-ui/reset-components";
import { API_URL, TOKEN_NAME } from "../../../const";
import type { SignInMemberResponseData } from "../../../types";
import { useMemberContextDispatch } from "../../../context/member";
import { XIcon } from "../../../svgs";
import { PrimaryButton } from "../../../styled-ui/fitco-button";

export default function LoginMethods() {
	const { setViews, pushView } = useUIContextDispatch();
	const { setMember } = useMemberContextDispatch();

	const handleGuestLogin = async () => {
		try {
			const response = await fetch(`${API_URL}/api/widget/members/guest-sign-in`, {
				method: "GET",
				headers: {
					"ngrok-skip-browser-warning": "true",
				},
			});

			if (!response.ok) {
				return;
			}

			const data = (await response.json()) as SignInMemberResponseData;
			const { token, member } = data;

			localStorage.setItem(TOKEN_NAME, token);
			setMember(member);

			if (member.onboarding) {
				setViews(["onboarding-intro"]);
			} else {
				setViews(["result-summary"]);
			}
		} catch (error) {
			console.error(error);
		}
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
					<ResetButton onClick={() => setViews(["none"])}>
						<XIcon style={{ width: 24, height: 24 }} />
					</ResetButton>
				</Top>
				<Middle>
					<MiddleIntro>
						<MiddleIntroTitle>핏코에 핸드폰 번호로 가입해 보세요!</MiddleIntroTitle>
						<MiddleIntroDescription>
							핸드폰 번호 입력 한번으로 핏코가 나를 기억해요🗒️
						</MiddleIntroDescription>
					</MiddleIntro>
				</Middle>
				<Bottom>
					<SignUpButton onClick={() => pushView("sign-up")}>
						<StartButtonText>회원가입하기</StartButtonText>
					</SignUpButton>
					<SignInButton onClick={() => pushView("sign-in")} style={{ marginBottom: "30px" }}>
						로그인하기
					</SignInButton>
					<GuestButton onClick={handleGuestLogin}>게스트 모드로 시작하기</GuestButton>
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

const MiddleIntroDescription = styled.div`
    color: ${(props) => props.theme.color.primary[80]};
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: -0.28px;
`;

const Bottom = styled.div`
    padding-top: 16px;
`;

const SignUpButton = styled(ResetButton)`
    margin-bottom: 20px;
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
`;

const SignInButton = styled(PrimaryButton)`
    color: ${(props) => props.theme.color.primary[140]};
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

const GuestButton = styled(ResetButton)`
	width: 100%;
	color: ${(props) => props.theme.color.primary[80]};
	font-size: 16px;
	text-align: center;
`;
