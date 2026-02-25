import styled from "styled-components";
import { useSizeResultContextDispatch } from "../../../context/size-result";
import { ResetButton } from "../../../styled-ui/reset-components";

export default function RefreshButton() {
	const { refetchSizeResult } = useSizeResultContextDispatch();
	return <Button onClick={refetchSizeResult}>다시 추천받기</Button>;
}

const Button = styled(ResetButton)`
	width: fit-content;
	margin: 0 auto
`;
