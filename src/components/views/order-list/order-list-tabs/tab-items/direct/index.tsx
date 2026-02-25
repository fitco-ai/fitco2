import styled from "styled-components";
import { useCallback, useState } from "react";
import { ResetButton } from "../../../../../../styled-ui/reset-components";
import { range } from "lodash-es";
import DirectBlock from "./direct-block";
import { PlusIcon } from "../../../../../../svgs";

export default function DirectReview() {
	const [count, setCount] = useState(1);

	const addBlock = useCallback(() => {
		setCount((prev) => prev + 1);
	}, []);

	return (
		<div>
			<BlockList>
				{range(0, count).map((num) => (
					<DirectBlock key={num} />
				))}
			</BlockList>
			<AddButton onClick={addBlock}>
				추가하기
				<PlusIcon style={{ width: 16, height: 16 }} />
			</AddButton>
		</div>
	);
}

const BlockList = styled.div`
	padding: 16px 16px 20px 16px;
	display: flex;
	flex-direction: column;
	border-bottom: 1px solid ${(props) => props.theme.color.primary[10]};
`;

const AddButton = styled(ResetButton)`
	padding: 0 16px;
	width: 100%;
	height: 56px;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 4px;
	color: ${(props) => props.theme.color.primary[140]};
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: 150%;
	letter-spacing: -0.48px;
`;
