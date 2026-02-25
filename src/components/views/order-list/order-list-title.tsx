import styled from "styled-components";
import type { ReactNode } from "react";

export default function OnboardingFormTitle({ title }: { title: ReactNode }) {
	return (
		<Container>
			<Title>{title}</Title>
		</Container>
	);
}

const Container = styled.h2`
	padding: 0 24px;
	margin-top: 0;
	margin-bottom: 24px;
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
