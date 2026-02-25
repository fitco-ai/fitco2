import styled from "styled-components";
import { ResetButton } from "../../../../styled-ui/reset-components";
import { useState } from "react";
import type { SizeResult } from "../../../../types/size-result";
import {
	resolveCompareSummaryKey,
	useSizeResultContextDispatch,
	useSizeResultContextState,
} from "../../../../context/size-result";
import { LoadingDots } from "../../../../svgs";
import _ from "lodash";

export default function ResultSizeCompare() {
	const { compareSummaries, compareLoading, sizeResults } = useSizeResultContextState();
	const { fetchCompareSummaries } = useSizeResultContextDispatch();
	const [selected, setSelected] = useState<SizeResult[]>([]);

	const handleSelect = (value: SizeResult) => {
		let newSelected = [];

		if (selected.some((s) => s.size === value.size)) {
			newSelected = selected.filter((s) => s.size !== value.size);
		} else if (selected.length >= 2) {
			newSelected = [selected[1], value];
		} else {
			newSelected = [...selected, value];
		}

		setSelected(newSelected);
		if (newSelected.length >= 2) {
			fetchCompareSummaries(newSelected[0], newSelected[1]);
		}
	};

	const selectedKey =
		selected.length >= 2 ? resolveCompareSummaryKey(selected[0].size, selected[1].size) : null;
	const compareSummary = selectedKey ? compareSummaries[selectedKey] : null;

	return (
		<Container>
			<Title>아직 사이즈가 고민이신가요?</Title>
			<SubTitle>(고민되는 사이즈 두개를 선택하면 비교해드릴게요)</SubTitle>
			<SizeButtonGroup>
				{sizeResults?.map((sr) => (
					<SizeButton
						key={sr.size}
						$isSelected={selected.some((s) => s.size === sr.size)}
						onClick={() => handleSelect(sr)}
					>
						{sr.size}
					</SizeButton>
				))}
			</SizeButtonGroup>
			{compareLoading && (
				<FlexCenter>
					<LoadingDots width={20} height={20} />
				</FlexCenter>
			)}
			{!compareLoading && !!compareSummary && (
				<Compare>
					{_.sortBy(compareSummary, "size").map((s) => (
						<CompareItem key={s.size}>{s.content}</CompareItem>
					))}
				</Compare>
			)}
			{!compareLoading && !compareSummary && (
				<CompareRequired>사이즈를 선택해 주세요.</CompareRequired>
			)}
		</Container>
	);
}

const Container = styled.section`
	margin-bottom: 30px;
`;

const Title = styled.div`
	text-align: center;
	color: ${(props) => props.theme.color.primary[100]};
	font-size: 16px;
	font-style: normal;
	font-weight: 600;
	line-height: 150%;
	letter-spacing: -0.32px;
`;

const SubTitle = styled.div`
	margin-bottom: 20px;
	text-align: center;
	color: ${(props) => props.theme.color.primary[60]};
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: 150%;
	letter-spacing: -0.42px;
`;

const SizeButtonGroup = styled.div`
	margin-bottom: 20px;
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
`;

const SizeButton = styled(ResetButton)<{ $isSelected: boolean }>`
	min-width: fit-content;
	display: flex;
	padding: 16px 32px;
	justify-content: center;
	align-items: center;
	color: ${(props) => (props.$isSelected ? props.theme.color.primary[0] : props.theme.color.primary[60])};
	background-color: ${(props) => (props.$isSelected ? props.theme.color.primary[140] : props.theme.color.primary[10])};
	text-align: center;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: 150%; /* 24px */
	letter-spacing: -0.48px;
	border-radius: 16px;
	transition: all 0.3s ease;
	box-shadow: ${(props) => (props.$isSelected ? "4px 4px 20px 0px hsla(0, 0%, 0%, 0.08)" : "none")};
`;

const CompareRequired = styled.div`
	text-align: center;
	font-size: 12px;
	color: ${(props) => props.theme.color.primary[60]};
`;

const Compare = styled.ul`
	padding-left: 20px;
`;

const CompareItem = styled.li`
	color: ${(props) => props.theme.color.primary[80]};
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: 150%;
	letter-spacing: -0.48px;
	list-style: disc !important;
`;

const FlexCenter = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;
