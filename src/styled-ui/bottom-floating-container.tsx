import styled from "styled-components";

export const BottomFloatingContainerHeight = 120;

export const BottomFloatingContainer = styled.div`
    box-sizing: border-box;
    padding: 16px;
    height: ${BottomFloatingContainerHeight}px;
    background-color: white;
    display: flex;
    align-items: start;

    @media (min-width: 600px) {
        align-items: center;
    }
`;
