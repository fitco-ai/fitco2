import styled from "styled-components";

export default function OnboardingFormTitle() {
	return (
		<Container>
			<Title>핏코가 나를 이해하는 첫 걸음이에요.</Title>
			<SubTitle>
				조금만 입력해주시면, 예측이 훨씬 더 정확해져요.
				<br />
				입력한 정보는 사이즈 분석 외엔 쓰이지 않아요!
			</SubTitle>
		</Container>
	);
}

const Container = styled.h2`
	margin-top: 0;
	margin-bottom: 34px;
	font-size: 20px;
	font-weight: 600;
	display: flex;
	flex-direction: column;
	gap: 2px;
`;

const Title = styled.div`
	color: ${(props) => props.theme.color.primary[140]};
	font-size: 32px;
	font-style: normal;
	font-weight: 400;
	line-height: 44px;
	letter-spacing: -0.32px;
`;

const SubTitle = styled.div`
	color: ${(props) => props.theme.color.primary[60]};
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;
