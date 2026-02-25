import SlidingUpContainer from "../../../../styled-ui/sliding-up-container";
import ViewMain from "../../../../styled-ui/view-main";
import ViewHeader from "../../../../styled-ui/view-header";
import { useUIContextDispatch } from "../../../../context/ui";
import { ResetButton } from "../../../../styled-ui/reset-components";
import { ViewSubTitle, ViewTitle } from "../../../../styled-ui/view-title";
import styled from "styled-components";
import OnboardingFormBody from "./form-body";
import ContactButton from "../../../../styled-ui/contact-button";
import MyPageButton from "../../../../styled-ui/mypage-button";
import { BottomFloatingContainer } from "../../../../styled-ui/bottom-floating-container";

export default function OnboardingForm() {
	const { setViews } = useUIContextDispatch();
	return (
		<SlidingUpContainer>
			<ViewHeader marginBottom={40} backViewPath="onboarding-intro" pageTitle="프로필 설정">
				<HeaderActions>
					<ContactButton />
					<MyPageButton />
				</HeaderActions>
			</ViewHeader>
			<ViewMain>
				<PaddingAdditional>
					<ViewTitle>핏코가 나를 이해하는 첫 걸음이에요.</ViewTitle>
					<ViewSubTitle>
						조금만 입력해주시면, 예측이 훨씬 더 정확해져요.
						<br />
						입력한 정보는 사이즈 분석 외엔 쓰이지 않아요!
					</ViewSubTitle>
				</PaddingAdditional>
				<OnboardingFormBody />
			</ViewMain>
			<BottomFloatingContainer>
				<SubmitButton onClick={() => setViews(["result-summary"])}>사이즈 추천받기</SubmitButton>
			</BottomFloatingContainer>
		</SlidingUpContainer>
	);
}

const HeaderActions = styled.div`
	display: flex;
	align-items: center;
	gap: 24px;
`;

const SubmitButton = styled(ResetButton)`
	width: 100%;
    padding: 0px 16px;
	height: 56px;
    border-radius: 16px;
    background: ${(props) => (props.disabled ? props.theme.color.primary[20] : props.theme.color.primary[140])};
    color: #FFF;
    font-size: 16px;
    font-weight: 600;
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
    transition: all 0.2s ease;
	box-shadow: 4px 4px 20px 0px hsla(0, 0%, 0%, 0.08);
    
    &:hover:not(:disabled) {
        background: ${(props) => props.theme.color.primary[120]};
    }
`;

const PaddingAdditional = styled.div`
	padding: 0 8px 24px 8px;
`;
