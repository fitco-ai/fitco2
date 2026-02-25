import { useCallback, useState } from "react";
import SlidingUpContainer from "../../../styled-ui/sliding-up-container";
import { useUIContextDispatch } from "../../../context/ui";
import {
	useSizeResultContextDispatch,
	useSizeResultContextState,
} from "../../../context/size-result";
import { ViewSubTitle, ViewTitle } from "../../../styled-ui/view-title";
import { PrimaryButton } from "../../../styled-ui/fitco-button";
import ViewHeader from "../../../styled-ui/view-header";
import ContactButton from "../../../styled-ui/contact-button";
import MyPageButton from "../../../styled-ui/mypage-button";
import ViewMain from "../../../styled-ui/view-main";
import ResultActions from "./result-actions";
import styled from "styled-components";
import { BottomFloatingContainer } from "../../../styled-ui/bottom-floating-container";
import ResultSizeNav from "./result-size/result-size-nav";
import ResultProduct from "./result-product";
import ResultSizeContent from "./result-size/result-size-content";
import ResultSizeCompare from "./result-size/result-size-compare";
import RefreshButton from "./refresh-button";

export default function ResultMobile({ type }: { type: "detail" | "summary" }) {
	const { pushView, setViews } = useUIContextDispatch();
	const { bestSize, canAnalyze, sizeResults, selectedSizeResult, detailLoading } =
		useSizeResultContextState();
	const { handleSelectSize } = useSizeResultContextDispatch();
	const [expanded, setExpanded] = useState(type === "detail");
	const [forceUp, setForceUp] = useState(false);

	const onDragEnd = useCallback(
		(expanded: boolean) => {
			setExpanded(expanded);
			setForceUp(false);
			if (expanded) {
				setViews(["result-detail"]);
			}
		},
		[setViews],
	);

	const expand = useCallback(() => {
		setExpanded(true);
		setViews(["result-detail"]);
		setForceUp(true);
		if (selectedSizeResult) {
			handleSelectSize(selectedSizeResult.size);
		}
	}, [setViews, selectedSizeResult, handleSelectSize]);

	return (
		<SlidingUpContainer onDragEnd={onDragEnd} initialExpanded={type === "detail"} forceUp={forceUp}>
			{!canAnalyze ? (
				<Container>
					<Box>
						<BoxTop>
							<ViewTitle>구매기록이 없어요.</ViewTitle>
							<ViewSubTitle>정보를 입력하고 사이즈추천을 받아보세요!</ViewSubTitle>
						</BoxTop>
						<PrimaryButton $isActive onClick={() => pushView("order-list")}>
							정보 입력하러 가기
						</PrimaryButton>
					</Box>
				</Container>
			) : expanded && selectedSizeResult ? (
				<>
					<ViewHeader marginBottom={24} backViewPath="none" pageTitle="분석 결과">
						<Actions>
							<ContactButton />
							<MyPageButton />
						</Actions>
					</ViewHeader>
					<RefreshButton />
					<ResultSizeNav />
					<ViewMain paddingHorizontal={16}>
						{expanded && <ResultProduct />}
						<ResultSizeContent expanded={expanded} />
						{expanded && sizeResults && sizeResults.length >= 2 && !detailLoading && (
							<ResultSizeCompare />
						)}
					</ViewMain>
					{expanded && (
						<BottomFloatingContainer>
							<ResultActions />
						</BottomFloatingContainer>
					)}
				</>
			) : (
				<Box>
					<ViewTitle>Best 추천 사이즈: {bestSize}</ViewTitle>
					<ViewSubTitle>
						자세한 핏감 또는 다른 사이즈와 비교가 궁금하다면 “자세히보기"를 눌러주세요!
					</ViewSubTitle>
					<PrimaryButton $isActive onClick={expand}>
						자세히보기
					</PrimaryButton>
				</Box>
			)}
		</SlidingUpContainer>
	);
}

const Actions = styled.div`
	display: flex;
	align-items: center;
	gap: 24px;
`;

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Box = styled.div`
    box-sizing: border-box;
    display: flex;
    width: 100%;
    padding: 20px 24px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    flex-shrink: 0;
    box-sizing: border-box;
    border-radius: 12px 12px 0px 0px;
    background: #ffffff;
    color: ${(props) => props.theme.color.default.black};

    @media (min-width: 600px) {
        width: 400px;
        border-radius: 12px;
    }
`;

const BoxTop = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
`;
