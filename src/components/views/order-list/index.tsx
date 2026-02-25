import SlidingUpContainer from "../../../styled-ui/sliding-up-container";
import ViewHeader from "../../../styled-ui/view-header";
import ViewMain from "../../../styled-ui/view-main";
import OrderListTabs from "./order-list-tabs";
import OrderListTitle from "./order-list-title";
import OrderListActions from "./order-list-actions";
import styled from "styled-components";
import CloseButton from "../../../styled-ui/close-button";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import ContactButton from "../../../styled-ui/contact-button";
import MyPageButton from "../../../styled-ui/mypage-button";
import { useIsMobile } from "../../../hooks/useIsMobile";

export const ORDER_LIST_TABS_DATA = [
	{
		label: "구매내역",
		value: "histories",
	},
	{
		label: "URL 입력",
		value: "url",
	},
	{
		label: "수동입력",
		value: "direct",
	},
];

export type TabType = (typeof ORDER_LIST_TABS_DATA)[number]["value"];

const TITLES: Record<TabType, ReactNode> = {
	histories: <div>최근에 구매하신 옷들을 찾았어요!</div>,
	url: <div>다른데서 구매한 옷도 추가해보세요!</div>,
	direct: (
		<div>
			구매하셨던 옷을
			<br />
			알려주세요!
		</div>
	),
};

export default function OrderList() {
	const isMobile = useIsMobile();
	const [currentTab, setCurrentTab] = useState<TabType>("histories");
	const [title, setTitle] = useState<ReactNode>(TITLES.histories);

	const titleToDirect = useCallback(() => {
		setTitle(TITLES.direct);
	}, []);

	useEffect(() => {
		setTitle(TITLES[currentTab]);
	}, [currentTab]);

	return (
		<SlidingUpContainer>
			<ViewHeader marginBottom={40} backViewPath="result-summary" pageTitle="착용감 입력">
				<Actions>
					<ContactButton />
					<MyPageButton />
					{!isMobile && <CloseButton />}
				</Actions>
			</ViewHeader>
			<ViewMain paddingHorizontal={0}>
				<FlexArea>
					<OrderListTitle title={title} />
					<OrderListTabs
						currentTab={currentTab}
						setCurrentTab={setCurrentTab}
						titleToDirect={titleToDirect}
					/>
				</FlexArea>
			</ViewMain>
			<OrderListActions />
		</SlidingUpContainer>
	);
}

const FlexArea = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
`;

const Actions = styled.div`
	display: flex;
	align-items: center;
	gap: 24px;
`;
