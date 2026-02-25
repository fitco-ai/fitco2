import styled from "styled-components";

export const ViewTitle = styled.div<{ $marginBottom?: string }>`
    color: ${(props) => props.theme.color.primary[140]};
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
    line-height: 44px; /* 137.5% */
    letter-spacing: -0.32px;
    margin-bottom: ${(props) => props.$marginBottom || "0"};
`;

export const ViewSubTitle = styled.div<{ $marginBottom?: string }>`
    color: ${(props) => props.theme.color.primary[60]};
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: ${(props) => props.$marginBottom || "0"};
`;
