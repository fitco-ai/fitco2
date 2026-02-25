import styled from "styled-components";
import { ResetButton } from "./reset-components";
import { ArrowLeftIcon } from "../svgs";
import { useUIContextDispatch, type View } from "../context/ui";

export default function ViewHeader({
	marginBottom = 0,
	children,
	pageTitle,
	backViewPath,
}: {
	marginBottom?: number;
	children: React.ReactNode;
	pageTitle?: string;
	backViewPath?: View;
}) {
	const { setViews } = useUIContextDispatch();
	const handleClickGoBack = () => {
		if (backViewPath) {
			setViews([backViewPath]);
		}
	};

	return (
		<Container $marginBottom={marginBottom}>
			{backViewPath ? (
				<HeaderLeft>
					<ResetButton onClick={handleClickGoBack}>
						<ArrowLeftIcon style={{ width: 24, height: 24 }} />
					</ResetButton>
					<HeaderTitle>{pageTitle}</HeaderTitle>
				</HeaderLeft>
			) : (
				<img
					src="https://d22a5p9j44snqb.cloudfront.net/fitco_logo_204x101.png"
					alt="fitco logo"
					width={51}
					height={25}
				/>
			)}

			{children}
		</Container>
	);
}

const Container = styled.div<{ $marginBottom: number }>`
	margin-bottom: ${(props) => props.$marginBottom}px;
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
