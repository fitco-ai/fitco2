import styled from "styled-components";
import ViewMain from "../../../styled-ui/view-main";
import ViewHeader from "../../../styled-ui/view-header";
import CloseButton from "../../../styled-ui/close-button";
import ResultActions from "./result-actions";
import {
	useSizeResultContextDispatch,
	useSizeResultContextState,
} from "../../../context/size-result";
import { ViewSubTitle, ViewTitle } from "../../../styled-ui/view-title";
import { PrimaryButton } from "../../../styled-ui/fitco-button";
import { useUIContextDispatch } from "../../../context/ui";
import SlidingUpContainer from "../../../styled-ui/sliding-up-container";
import MyPageButton from "../../../styled-ui/mypage-button";
import ContactButton from "../../../styled-ui/contact-button";
import { BottomFloatingContainer } from "../../../styled-ui/bottom-floating-container";
import ResultSizeNav from "./result-size/result-size-nav";
import ResultProduct from "./result-product";
import ResultSizeContent from "./result-size/result-size-content";
import ResultSizeCompare from "./result-size/result-size-compare";
import { useCallback } from "react";
import RefreshButton from "./refresh-button";

export default function ResultDesktop({ type }: { type: "detail" | "summary" }) {
	const { canAnalyze, selectedSizeResult, sizeResults, bestSize, detailLoading } =
		useSizeResultContextState();
	const { handleSelectSize } = useSizeResultContextDispatch();
	const { pushView, setViews } = useUIContextDispatch();

	const handleClickDetail = useCallback(() => {
		setViews(["result-detail"]);
		if (selectedSizeResult) {
			handleSelectSize(selectedSizeResult.size);
		}
	}, [setViews, selectedSizeResult, handleSelectSize]);

	if (!canAnalyze) {
		return (
			<DesktopContainer>
				<Box>
					<BoxTop>
						<ViewTitle>구매기록이 없어요.</ViewTitle>
						<ViewSubTitle>정보를 입력하고 사이즈추천을 받아보세요!</ViewSubTitle>
					</BoxTop>
					<PrimaryButton $isActive onClick={() => pushView("order-list")}>
						정보 입력하러 가기
					</PrimaryButton>
				</Box>
			</DesktopContainer>
		);
	}

	if (type === "summary") {
		return (
			<DesktopContainer>
				<Box>
					<ViewTitle>Best 추천 사이즈: {bestSize}</ViewTitle>
					<ViewSubTitle>
						자세한 핏감 또는 다른 사이즈와 비교가 궁금하다면 “자세히보기"를 눌러주세요!
					</ViewSubTitle>
					<PrimaryButton $isActive onClick={handleClickDetail}>
						자세히보기
					</PrimaryButton>
				</Box>
			</DesktopContainer>
		);
	}

	return (
		<SlidingUpContainer>
			<ViewHeader marginBottom={24}>
				<Actions>
					<ContactButton />
					<MyPageButton />
					<CloseButton />
				</Actions>
			</ViewHeader>
			<RefreshButton />
			{selectedSizeResult && (
				<>
					<ResultSizeNav />
					<ViewMain>
						<ResultProduct />
						<ResultSizeContent expanded={true} />
						{sizeResults && sizeResults.length >= 2 && !detailLoading && <ResultSizeCompare />}
					</ViewMain>
				</>
			)}
			<BottomFloatingContainer>
				<ResultActions />
			</BottomFloatingContainer>
		</SlidingUpContainer>
	);
}

const Actions = styled.div`
	display: flex;
	align-items: center;
	gap: 24px;
`;

const DesktopContainer = styled.div`
	position: fixed;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.3);
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
