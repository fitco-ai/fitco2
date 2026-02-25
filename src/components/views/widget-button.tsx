import styled from "styled-components";
import { WidgetBannerBackground } from "../../svgs";
import { useMemberContextState } from "../../context/member";
import { useUIContextDispatch } from "../../context/ui";
import { ResetButton } from "../../styled-ui/reset-components";
import { useUpdateAnalytics } from "../../hooks/useUpdateAnalytics";

export default function WidgetButton() {
	const { member } = useMemberContextState();
	const { setViews } = useUIContextDispatch();
	const updateAnalytics = useUpdateAnalytics();

	const handleClick = () => {
		if (!member) {
			setViews(["login-methods"]);
		} else if (member.onboarding) {
			setViews(["onboarding-intro"]);
		} else {
			setViews(["result-summary"]);
		}
		updateAnalytics({
			click: true,
		});
	};

	return (
		<Container>
			<Button onClick={handleClick}>
				<WidgetBannerBackground style={{ position: "absolute", inset: 0 }} />
				<Shadow />
				<Text>사이즈 물어보기</Text>
			</Button>
		</Container>
	);
}

const Container = styled.div`
	position: fixed;
	bottom: 100px;
	right: 30px;
`;

const Button = styled(ResetButton)`
	box-sizing: border-box;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 121px;
	height: 44px;
	flex-shrink: 0;
`;

const Text = styled.div`
	z-index: 1;
	font-style: normal;
	font-size: 16px;
	font-weight: 400;
	line-height: 150%; /* 24px */
	letter-spacing: -0.48px;
	color: white;
`;

const Shadow = styled.div`
	position: absolute;
	left: 10px;
	right: 0;
	top: 0;
	bottom: 0;
	box-shadow: 4px 4px 20px 0px hsla(0, 0%, 0%, 0.25);
`;
