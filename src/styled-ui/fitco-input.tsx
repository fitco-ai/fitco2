import styled from "styled-components";

// [todo] input 이걸로 모두 변경
export const FitcoInput = styled.input<{ $marginBottom?: number; $disabled?: boolean }>`
    margin-bottom: ${(props) => props.$marginBottom ?? 0}px;
    outline: none;
	box-sizing: border-box;
	font-size: 16px;
	font-weight: 400;
	line-height: 150%;
	letter-spacing: -0.48px;
	padding: 16px;
	width: 100%;
	height: 56px !important;
    border: none !important;
    border-radius: 16px !important;
	background-color: ${(props) => props.theme.color.primary[5]};
    color: ${(props) => props.theme.color.primary[140]};
    pointer-events: ${(props) => (props.$disabled ? "none" : "auto")};

	&::placeholder {
		color: ${(props) => props.theme.color.primary[60]};
	}

    &:focus {
        outline: none;
		border: 1px solid ${(props) => props.theme.color.primary[100]};
        /* border-color: ${(props) => props.theme.color.primary[100]}; */
		/* border-width: 1px; */
        /* background-color: ${(props) => props.theme.color.primary[0]}; */
    }
`;
