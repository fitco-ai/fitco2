import { useCallback, useState } from "react";
import { range } from "lodash-es";
import UrlBlock from "./url-block";
import styled from "styled-components";
import { ResetButton } from "../../../../../../styled-ui/reset-components";
import { PlusIcon } from "../../../../../../svgs";

export default function UrlReview({ titleToDirect }: { titleToDirect: () => void }) {
	const [count, setCount] = useState(1);

	const addBlock = useCallback(() => {
		setCount((prev) => prev + 1);
	}, []);

	return (
		<div>
			<BlockList>
				{range(0, count).map((num) => (
					<UrlBlock key={num} titleToDirect={titleToDirect} />
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
	display: flex;
	flex-direction: column;
	border-bottom: 1px solid ${(props) => props.theme.color.primary[10]};
`;

const AddButton = styled(ResetButton)`
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
