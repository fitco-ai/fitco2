import styled from "styled-components";
import { useUIContextState } from "../context/ui";
import OnboardingForm from "./views/onboarding/form";
import OnboardingIntro from "./views/onboarding/intro";
import Result from "./views/result";
import WidgetButton from "./views/widget-button";
import OrderList from "./views/order-list";
import LoginMethods from "./views/login/login-methods";
import MyPage from "./views/mypage";
import PromoteMember from "./views/promote-member";
import Logout from "./views/logout";
import SignUp from "./views/login/sign-up";
import SignIn from "./views/login/sign-in";

export default function ViewNavigator() {
	const { views } = useUIContextState();

	const view = views[views.length - 1];

	return (
		<Container>
			{view === "none" ? (
				<WidgetButton />
			) : view === "login-methods" ? (
				<LoginMethods />
			) : view === "sign-up" ? (
				<SignUp />
			) : view === "sign-in" ? (
				<SignIn />
			) : view === "onboarding-intro" ? (
				<OnboardingIntro />
			) : view === "onboarding-form" ? (
				<OnboardingForm />
			) : view.startsWith("result") ? (
				<Result type={view.split("-")[1] as "detail" | "summary"} />
			) : view === "order-list" ? (
				<OrderList />
			) : view === "mypage" ? (
				<MyPage />
			) : view === "promote-member" ? (
				<PromoteMember />
			) : view === "logout" ? (
				<Logout />
			) : null}
		</Container>
	);
}

const Container = styled.div`
	font-family: "Poppins", sans-serif;
`;
