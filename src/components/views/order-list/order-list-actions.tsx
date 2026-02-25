import styled from "styled-components";
import { ResetButton } from "../../../styled-ui/reset-components";
import { useUIContextDispatch } from "../../../context/ui";
import { BottomFloatingContainer } from "../../../styled-ui/bottom-floating-container";

export default function OrderListActions() {
	const { pushView } = useUIContextDispatch();

	const goResult = () => {
		pushView("result-summary");
	};

	return (
		<BottomFloatingContainer>
			<ActionButton $isPrimary onClick={goResult}>
				사이즈 추천받기
			</ActionButton>
		</BottomFloatingContainer>
	);
}

const ActionButton = styled(ResetButton)<{ $isPrimary?: boolean }>`
    display: flex;
    width: 100%;
    height: 56px;
    padding: 16px 32px;
    justify-content: center;
    align-items: center;
	font-size: 16px;
    flex: 1 0 0;
    border-radius: 16px;
    color: ${(props) => (props.$isPrimary ? props.theme.color.primary[0] : props.theme.color.primary[140])};
    background-color: ${(props) => (props.$isPrimary ? props.theme.color.primary[140] : props.theme.color.primary[10])};
    box-shadow: ${(props) => (props.$isPrimary ? "4px 4px 20px 0px hsla(0, 0%, 0%, 0.08)" : "none")};
`;
