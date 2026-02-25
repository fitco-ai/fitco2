import styled from "styled-components";
import { ResetButton } from "../../../../styled-ui/reset-components";
import { useUIContextDispatch } from "../../../../context/ui";
import { useState } from "react";
import useClickOutsideRef from "../../../../hooks/useClickOutsideRef";
import OptionDialog from "./option-dialog";

export default function ResultActions() {
	const ref = useClickOutsideRef(() => setOptionDialogOpen(false), false);
	const { setViews } = useUIContextDispatch();
	const goOrderList = () => {
		setViews(["order-list"]);
	};
	const [optionDialogOpen, setOptionDialogOpen] = useState(false);

	return (
		<div ref={ref} style={{ width: "100%" }}>
			<Container>
				<ActionButton onClick={goOrderList}>다시하기</ActionButton>
				<ActionButton $isPrimary onClick={() => setOptionDialogOpen(true)}>
					장바구니
				</ActionButton>
			</Container>
			{optionDialogOpen && <OptionDialog close={() => setOptionDialogOpen(false)} />}
		</div>
	);
}

const Container = styled.div`
	width: 100%;
    display: flex;
    gap: 8px;
`;

const ActionButton = styled(ResetButton)<{ $isPrimary?: boolean }>`
    display: flex;
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
