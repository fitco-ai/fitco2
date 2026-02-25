import styled from "styled-components";
import { PrimaryButton } from "../../../../styled-ui/fitco-button";
import { ResetButton } from "../../../../styled-ui/reset-components";
import { LoadingDots } from "../../../../svgs";
import { theme } from "../../../../styles/theme";

export default function FormActions({
	isActive,
	loading,
	setIsActive,
	handleSubmit,
}: {
	isActive: boolean;
	loading: boolean;
	setIsActive: (isActive: boolean) => void;
	handleSubmit: () => void;
}) {
	return (
		<Container>
			<EditButton onClick={() => setIsActive(true)}>수정하기</EditButton>
			<PrimaryButton $isActive disabled={!isActive || loading} onClick={handleSubmit}>
				{loading ? (
					<LoadingDots style={{ width: 24, height: 24, fill: theme.color.primary[140] }} />
				) : (
					"저장하기"
				)}
			</PrimaryButton>
		</Container>
	);
}

const Container = styled.div`
    display: flex;
    gap: 8px;
	border-top: 1px solid ${(props) => props.theme.color.primary[10]};
	padding-top: 16px;
`;

export const EditButton = styled(ResetButton)`
	box-sizing: border-box;
	width: 100%;
	height: 56px;
    padding: 0 24px;
	border-radius: 16px;
	background: ${(props) => props.theme.color.primary[10]};
	color: ${(props) => props.theme.color.primary[140]};
	font-size: 16px;
`;
