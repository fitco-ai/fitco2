import styled from "styled-components";
import { ResetButton } from "../../../styled-ui/reset-components";
import { XIcon } from "../../../svgs";
import { PrimaryButton } from "../../../styled-ui/fitco-button";
import { useUIContextDispatch } from "../../../context/ui";
import { useMemberContextDispatch } from "../../../context/member";
import { TOKEN_NAME } from "../../../const";
import { useSizeResultContextDispatch } from "../../../context/size-result";
import { useRecommendationContextDispatch } from "../../../context/recommendation";
import { useOrderContextDispatch } from "../../../context/order";

export default function Logout() {
	const { popView, setViews } = useUIContextDispatch();
	const { setMember } = useMemberContextDispatch();
	const { clearSizeResult } = useSizeResultContextDispatch();
	const { clearRecommendations } = useRecommendationContextDispatch();
	const { clearHistories } = useOrderContextDispatch();

	const handleConfirmLogout = () => {
		localStorage.removeItem(TOKEN_NAME);
		setMember(null);
		clearSizeResult();
		clearRecommendations();
		clearHistories();
		setViews(["none"]);
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
					<ResetButton onClick={popView}>
						<XIcon style={{ width: 24, height: 24 }} />
					</ResetButton>
				</Top>
				<Middle>
					<MiddleIntro>
						<MiddleIntroTitle>로그아웃 하시나요?</MiddleIntroTitle>
						<MiddleIntroDescription>
							같은 휴대폰 번호로 다시 로그인하면
							<br />내 맞춤 사이즈 기록이 안전하게 보관되어 있어요.
						</MiddleIntroDescription>
					</MiddleIntro>
				</Middle>
				<Bottom>
					<PrimaryButton $isActive onClick={handleConfirmLogout}>
						로그아웃하기
					</PrimaryButton>
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
    padding-top: 16px;;
`;
