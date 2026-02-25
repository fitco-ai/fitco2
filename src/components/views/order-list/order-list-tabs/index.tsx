import styled from "styled-components";
import OrderListTabsHistories from "./tab-items/histories";
import UrlReview from "./tab-items/url";
import DirectReview from "./tab-items/direct";
import type { TabType } from "..";
import OrderListTabsNav from "./order-list-tabs-nav";
import type { Dispatch, SetStateAction } from "react";

export default function OrderListTabs({
	currentTab,
	setCurrentTab,
	titleToDirect,
}: {
	currentTab: TabType;
	setCurrentTab: Dispatch<SetStateAction<TabType>>;
	titleToDirect: () => void;
}) {
	return (
		<Container>
			<OrderListTabsNav currentTab={currentTab} setCurrentTab={setCurrentTab} />
			<TabMain>
				<ScrollingArea>
					{currentTab === "histories" && <OrderListTabsHistories />}
					{currentTab === "url" && <UrlReview titleToDirect={titleToDirect} />}
					{currentTab === "direct" && <DirectReview />}
				</ScrollingArea>
			</TabMain>
		</Container>
	);
}

const Container = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
`;

const TabMain = styled.div`
	flex: 1;
`;

const ScrollingArea = styled.div`
	height: 100%;
	overflow-y: auto;
	overflow-x: hidden
`;
