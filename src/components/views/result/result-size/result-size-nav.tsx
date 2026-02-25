import styled from "styled-components";
import { ResetButton, ResetUl } from "../../../../styled-ui/reset-components";
import {
	useSizeResultContextDispatch,
	useSizeResultContextState,
} from "../../../../context/size-result";

export default function ResultSizeNav() {
	const { sizeResults, selectedSizeResult } = useSizeResultContextState();
	const { handleSelectSize } = useSizeResultContextDispatch();
	return (
		<Container>
			{sizeResults?.map((sr) => (
				<li key={sr.size}>
					<TabItem
						$isActive={selectedSizeResult?.size === sr.size}
						onClick={() => handleSelectSize(sr.size)}
					>
						{sr.size}
					</TabItem>
				</li>
			))}
		</Container>
	);
}

const Container = styled(ResetUl)`
    overflow-x: auto;
    height: 56px;
    display: grid;
    grid-auto-flow: column;  
    grid-auto-columns: 56px;
    grid-template-rows: 56px;
	border-bottom: 1px solid ${(props) => props.theme.color.primary[10]};
`;

const TabItem = styled(ResetButton)<{ $isActive?: boolean }>`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${(props) => (props.$isActive ? props.theme.color.primary[140] : props.theme.color.primary[60])};
    font-size: 16px;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: -0.48px;

    &::after {
        content: "";
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%) scaleX(${(props) => (props.$isActive ? 1 : 0)});
        transform-origin: center;
        width: 100%;
        height: 1px;
        background: ${(props) => props.theme.color.primary[140]};
        transition: ${(props) => (props.$isActive ? "transform 0.3s cubic-bezier(0.4,0,0.2,1)" : "none")};
    }
`;
