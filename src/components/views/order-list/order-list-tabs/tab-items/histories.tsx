import styled from "styled-components";
import { CDN_URL, PRODUCT_CATEGORIES } from "../../../../../const";
import { LoadingDots } from "../../../../../svgs";
import { ResetUl } from "../../../../../styled-ui/reset-components";
import StatefulReviewInput from "../../../../../styled-ui/stateful-review-input";
import { useOrderContextDispatch, useOrderContextState } from "../../../../../context/order";
import { useCallback, useEffect } from "react";
import { useSizeResultContextDispatch } from "../../../../../context/size-result";

export default function OrderListTabsHistories() {
	const { histories, loading } = useOrderContextState();
	const { fetchHistories, refetchHistories } = useOrderContextDispatch();
	const { refetchSizeResult } = useSizeResultContextDispatch();

	const handleCompleteReviewUpdate = useCallback(() => {
		refetchHistories();
		refetchSizeResult();
	}, [refetchHistories, refetchSizeResult]);

	useEffect(() => {
		fetchHistories();
	}, [fetchHistories]);

	return (
		<Container>
			{loading ? (
				<LoadingContainer>
					<LoadingDots style={{ width: 32, height: 32 }} />
				</LoadingContainer>
			) : histories?.length === 0 ? (
				<NoHistory>
					구매내역이 없습니다.
					<br />
					URL로 입력 또는 수동 입력을 이용해 주세요.
				</NoHistory>
			) : (
				<List>
					{histories?.map((history) => {
						return (
							<ListItem key={history.order.id}>
								<ListItemBox>
									{history.product?.productImage ? (
										<ListItemImage
											src={history.product.productImage}
											alt={history.product.productName ?? "상품"}
										/>
									) : (
										<ListItemImage src={`${CDN_URL}/empty_image_330x330.png`} />
									)}
									<ListItemInfo>
										<ListItemProduct>
											<SemiBold>{history.product?.productName}</SemiBold>
										</ListItemProduct>
										<ListItemOption>
											{history.spec.size} /{" "}
											{PRODUCT_CATEGORIES.find((c) => c.value === history.product.category)
												?.label ?? "기타"}
										</ListItemOption>
									</ListItemInfo>
								</ListItemBox>
								<StatefulReviewInput
									productSpecificationId={history.spec.id}
									content={history.review?.content ?? ""}
									onComplete={handleCompleteReviewUpdate}
								/>
							</ListItem>
						);
					})}
				</List>
			)}
		</Container>
	);
}

const Container = styled.div`
	min-height: 165px;
`;

const LoadingContainer = styled.div`
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const List = styled(ResetUl)``;

const ListItem = styled.li`
	padding: 20px 24px;
	border-bottom: 1px solid ${(props) => props.theme.color.primary[10]};
`;

const ListItemBox = styled.div`
	margin-bottom: 16px;
	display: flex;
	gap: 20px;
	align-items: center;
`;

const ListItemImage = styled.img`
	object-fit: cover;
	width: 44px;
	height: 44px;
	border-radius: 8px;
	border: 1px solid #dee2e6;
`;

const ListItemInfo = styled.div`
	font-size: 14px;
	font-weight: 400;
	line-height: 150%;
	letter-spacing: -0.42px;
`;

const ListItemProduct = styled.div`
	color: ${(props) => props.theme.color.primary[140]};

`;

const ListItemOption = styled.div`
	color: ${(props) => props.theme.color.primary[60]};
`;

const SemiBold = styled.span`
	font-weight: 600;
`;

const NoHistory = styled.div`
	height: 165px;
	color: ${(props) => props.theme.color.primary[60]};
	text-align: center;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	display: flex;
	justify-content: center;
	align-items: center;
`;
