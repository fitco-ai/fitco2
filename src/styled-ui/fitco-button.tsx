import styled from "styled-components";
import { ResetButton } from "./reset-components";

export const PrimaryButton = styled(ResetButton)<{ $isActive?: boolean }>`
	box-sizing: border-box;
	width: 100%;
	height: 56px;
    padding: 0 24px;
	font-size: 16px;
	border-radius: 16px;
	background: ${(props) => (props.$isActive ? props.theme.color.primary[140] : props.theme.color.primary[10])};
	color: ${(props) => (props.$isActive ? props.theme.color.primary[0] : props.theme.color.primary[60])};
	box-shadow: ${(props) => (props.$isActive ? "4px 4px 20px 0px hsla(0, 0%, 0%, 0.08)" : "none")};

	&:disabled {
		background-color: ${(props) => props.theme.color.primary[10]};
		color: ${(props) => props.theme.color.primary[60]};
	}
`;

export const PrimaryButtonSmall = styled(ResetButton)<{ $isActive?: boolean }>`
	box-sizing: border-box;
	width: 100%;
	height: 33px;
    padding: 0 10px;
	font-size: 14px;
	border-radius: 7px;
	background: ${(props) => (props.$isActive ? props.theme.color.primary[140] : props.theme.color.primary[5])};
	color: ${(props) => (props.$isActive ? props.theme.color.primary[0] : props.theme.color.primary[100])};
	border: ${(props) => (props.$isActive ? "none" : `1px solid ${props.theme.color.primary[100]}`)};
	@media (min-width: 768px) {
		height: 36px;
	}
	&:disabled {
		background-color: ${(props) => props.theme.color.primary[10]};
		color: ${(props) => props.theme.color.primary[60]};
	}
`;
