import styled from "styled-components";
import SlidingUpContainer from "../../../styled-ui/sliding-up-container";
import ViewMain from "../../../styled-ui/view-main";
import { Accordion } from "./accordion";
import MyPageOrderHistories from "./mypage-orders";
import MyPageRecommendations from "./mypage-recommendations";
import CloseButton from "../../../styled-ui/close-button";
import { ResetButton } from "../../../styled-ui/reset-components";
import { ArrowLeftIcon } from "../../../svgs";
import { useUIContextDispatch } from "../../../context/ui";
import MyPageInfo from "./mypage-info";
import { PrimaryButton } from "../../../styled-ui/fitco-button";
import ContactButton from "../../../styled-ui/contact-button";
import { useIsMobile } from "../../../hooks/useIsMobile";
import MyPageSettings from "./mypage-settings";
import { useMemberContextDispatch } from "../../../context/member";
import { API_URL, TOKEN_NAME } from "../../../const";
import { useOrderContextDispatch } from "../../../context/order";
import { useRecommendationContextDispatch } from "../../../context/recommendation";
import { useSizeResultContextDispatch } from "../../../context/size-result";

export default function MyPage() {
	const isMobile = useIsMobile();
	const { popView, pushView, setViews } = useUIContextDispatch();
	const { setMember } = useMemberContextDispatch();
	const { clearSizeResult } = useSizeResultContextDispatch();
	const { clearRecommendations } = useRecommendationContextDispatch();
	const { clearHistories } = useOrderContextDispatch();

	const handleClickLogout = () => {
		pushView("logout");
	};

	const handleClickDeleteAccount = async () => {
		if (window.confirm("탈퇴하시겠습니까?")) {
			try {
				const token = localStorage.getItem(TOKEN_NAME);
				if (!token) {
					return;
				}
				const response = await fetch(`${API_URL}/api/widget/members/delete`, {
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${token}`,
						"ngrok-skip-browser-warning": "true",
					},
				});

				if (response.ok) {
					localStorage.removeItem(TOKEN_NAME);
					setMember(null);
					clearSizeResult();
					clearRecommendations();
					clearHistories();
					setViews(["none"]);
				}
			} catch (error) {
				console.error(error);
			}
		}
	};

	return (
		<SlidingUpContainer bgReverse>
			<HeaderContainer>
				<HeaderLeft>
					<ResetButton onClick={popView}>
						<ArrowLeftIcon style={{ width: 24, height: 24 }} />
					</ResetButton>
					<HeaderTitle>마이페이지</HeaderTitle>
				</HeaderLeft>
				<Actions>
					<ContactButton />
					{!isMobile && <CloseButton />}
				</Actions>
			</HeaderContainer>
			<ViewMain>
				<AccordionGroup>
					<Accordion title="기본정보">
						<MyPageInfo />
					</Accordion>
					<Accordion title="구매내역 및 착용감 리뷰">
						<MyPageOrderHistories />
					</Accordion>
					<Accordion title="히스토리">
						<MyPageRecommendations />
					</Accordion>
					<Accordion title="설정">
						<MyPageSettings />
					</Accordion>
				</AccordionGroup>
				<FlexCenter>
					<LogoutButton onClick={handleClickLogout}>로그아웃</LogoutButton>
					<DeleteAccountButton onClick={handleClickDeleteAccount}>탈퇴하기</DeleteAccountButton>
				</FlexCenter>
			</ViewMain>
		</SlidingUpContainer>
	);
}

const AccordionGroup = styled.div`
	margin-bottom: 212px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const HeaderContainer = styled.div`
	margin-bottom: 24px;
    padding-top: 32px;
    padding-left: 24px;
    padding-right: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;

	@media (min-width: 600px) {
		padding-top: 24px;
	}
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

const Actions = styled.div`
	display: flex;
	align-items: center;
	gap: 24px;
`;

const FlexCenter = styled.div`
	margin-bottom: 100px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const LogoutButton = styled(PrimaryButton)`
	margin-bottom: 25px;
	width: 151px;
	color: ${(props) => props.theme.color.primary[140]};
`;

const DeleteAccountButton = styled(ResetButton)`
	color: var(--Fitco-Primary-80, #6C757D);
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: 150%; /* 24px */
	letter-spacing: -0.48px;
`;
