import styled from "styled-components";
import { useOrderContextDispatch, useOrderContextState } from "../../../../context/order";
import { useState, useCallback, useEffect, useId } from "react";
import { LoadingDots, LoadingSpinner, TrashIcon } from "../../../../svgs";
import { theme } from "../../../../styles/theme";
import { API_URL, PRODUCT_CATEGORIES, TOKEN_NAME } from "../../../../const";
import OrderItem from "./order-item";
import type { DeleteReviewRequest, Review } from "../../../../types";
import { ResetButton } from "../../../../styled-ui/reset-components";
import { PrimaryButton } from "../../../../styled-ui/fitco-button";
import { useUIContextDispatch } from "../../../../context/ui";

export default function MyPageOrders() {
	const { pushView } = useUIContextDispatch();
	const { histories, loading } = useOrderContextState();
	const orderHistories = histories?.filter((order) => !!order.review) ?? [];
	const { fetchHistories, removeReviews } = useOrderContextDispatch();
	const [deleteLoading, setDeleteLoading] = useState(false);
	const [checkedReviewIds, setCheckedReviewIds] = useState<number[]>([]);
	const allCheckInputId = useId();

	const handleCheckReview = useCallback((reviewId: number) => {
		setCheckedReviewIds((prev) => {
			if (prev.includes(reviewId)) {
				return prev.filter((id) => id !== reviewId);
			}
			return [...prev, reviewId];
		});
	}, []);

	const handleCheckAll = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			if (e.target.checked) {
				setCheckedReviewIds(orderHistories.map((order) => (order.review as Review).id));
			} else {
				setCheckedReviewIds([]);
			}
		},
		[orderHistories],
	);

	const handleClickDelete = useCallback(async () => {
		try {
			setDeleteLoading(true);
			const token = localStorage.getItem(TOKEN_NAME);

			const payload: DeleteReviewRequest = {
				reviewIds: checkedReviewIds,
			};

			const response = await fetch(`${API_URL}/api/widget/reviews`, {
				method: "DELETE",
				body: JSON.stringify(payload),
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
					"ngrok-skip-browser-warning": "true",
				},
			});

			if (response.ok) {
				removeReviews(checkedReviewIds);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setDeleteLoading(false);
		}
	}, [checkedReviewIds, removeReviews]);

	const groupedByCategory = orderHistories.reduce(
		(acc, Order) => {
			const category = Order.product.category as string;
			if (!acc[category]) {
				acc[category] = [];
			}
			acc[category].push(Order);
			return acc;
		},
		{} as Record<string, typeof orderHistories>,
	);

	useEffect(() => {
		fetchHistories();
	}, [fetchHistories]);

	return (
		<Container>
			{orderHistories.length > 0 && (
				<AllCheck>
					<AllCheckInputContainer>
						<AllCheckInput
							type="checkbox"
							id={allCheckInputId}
							checked={checkedReviewIds.length === orderHistories.length}
							onChange={handleCheckAll}
						/>
						<AllCheckLabel htmlFor={allCheckInputId}>전체</AllCheckLabel>
					</AllCheckInputContainer>
					<ResetButton onClick={handleClickDelete} disabled={deleteLoading}>
						{deleteLoading ? (
							<LoadingSpinner style={{ width: 24, height: 24 }} />
						) : (
							<TrashIcon style={{ fill: theme.color.primary[140] }} />
						)}
					</ResetButton>
				</AllCheck>
			)}
			<OrderGroups>
				{loading ? (
					<LoadingContainer>
						<LoadingDots style={{ width: 32, height: 32 }} />
					</LoadingContainer>
				) : Object.entries(groupedByCategory).length === 0 ? (
					<NoOrders>구매&리뷰 내역이 없습니다.</NoOrders>
				) : (
					Object.entries(groupedByCategory).map(([category, orders]) => {
						const categoryLabel =
							PRODUCT_CATEGORIES.find((c) => c.value === category)?.label ?? "기타";
						return (
							<OrderGroupItem key={category}>
								<OrderGroupLabel>{categoryLabel}</OrderGroupLabel>
								<OrderGroupItems>
									{orders?.map((order, index) => (
										<OrderItem
											key={`${order.product.id}-${index}`}
											order={order}
											checked={checkedReviewIds.includes((order.review as Review).id)}
											categoryLabel={categoryLabel}
											handleCheckReview={handleCheckReview}
											productSpecificationId={(order.review as Review).productSpecificationId}
										/>
									))}
								</OrderGroupItems>
							</OrderGroupItem>
						);
					})
				)}
			</OrderGroups>
			<PrimaryButton $isActive onClick={() => pushView("order-list")}>
				구매내역 추가하기
			</PrimaryButton>
		</Container>
	);
}

const Container = styled.div`
    padding: 16px 0px;
	display: flex;
	flex-direction: column;
	gap: 16px;
    border-top: 1px solid ${(props) => props.theme.color.primary[10]};
`;

const AllCheck = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const AllCheckInputContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const AllCheckInput = styled.input`
    margin: 0;
`;

const AllCheckLabel = styled.label`
    color: ${(props) => props.theme.color.primary[100]};
    font-size: 14px;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: -0.42px;
`;

const OrderGroups = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const OrderGroupItem = styled.div`
	padding-bottom: 20px;
	border-bottom: 1px solid ${(props) => props.theme.color.primary[10]};

	&:last-child {
		border-bottom: none;
		padding-bottom: 0px;
	}
`;

const OrderGroupLabel = styled.div`
    color: ${(props) => props.theme.color.primary[140]};
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 21px */
    letter-spacing: -0.28px;
`;

const OrderGroupItems = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const NoOrders = styled.div`
	color: ${(props) => props.theme.color.primary[60]};
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
    text-align: center;
`;

const LoadingContainer = styled.div`
	height: 150px;
	display: flex;
	justify-content: center;
	align-items: center;
`;
