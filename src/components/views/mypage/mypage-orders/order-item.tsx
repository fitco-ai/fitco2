import styled from "styled-components";
import type { OrderHistory, Review, UpdateReviewRequest } from "../../../../types";
import { API_URL, CDN_URL, TOKEN_NAME } from "../../../../const";
import { PrimaryButtonSmall } from "../../../../styled-ui/fitco-button";
import { FitcoInput } from "../../../../styled-ui/fitco-input";
import { useCallback, useRef, useState } from "react";
import { useOrderContextDispatch } from "../../../../context/order";
import { LoadingDots } from "../../../../svgs";
import { theme } from "../../../../styles/theme";
import { useSizeResultContextDispatch } from "../../../../context/size-result";

export default function OrderItem({
	order,
	categoryLabel,
	checked,
	handleCheckReview,
	productSpecificationId,
}: {
	order: OrderHistory;
	categoryLabel: string;
	checked: boolean;
	handleCheckReview: (reviewId: number) => void;
	productSpecificationId: number;
}) {
	const { refetchSizeResult } = useSizeResultContextDispatch();
	const { refetchHistories } = useOrderContextDispatch();
	const { modifyReview } = useOrderContextDispatch();
	const [value, setValue] = useState(order.review?.content ?? "");
	const [loading, setLoading] = useState(false);
	const [isActive, setIsActive] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleClickEdit = useCallback(() => {
		setIsActive(true);
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	const handleChangeValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	}, []);

	const handleClickSubmit = useCallback(async () => {
		try {
			setLoading(true);
			const token = localStorage.getItem(TOKEN_NAME);

			const payload: UpdateReviewRequest = {
				productSpecificationId,
				content: value,
			};

			const response = await fetch(`${API_URL}/api/widget/reviews`, {
				method: "POST",
				body: JSON.stringify(payload),
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
					"ngrok-skip-browser-warning": "true",
				},
			});

			if (response.ok) {
				modifyReview((order.review as Review).id, value);
				refetchSizeResult();
				refetchHistories();
			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}, [
		modifyReview,
		order.review,
		productSpecificationId,
		refetchSizeResult,
		refetchHistories,
		value,
	]);

	const isEditing = value !== (order.review as Review).content;

	return (
		<Container>
			<ItemProduct htmlFor={`product-check-input-${order.product.id}`}>
				<ItemProductInput
					type="checkbox"
					id={`product-check-input-${order.product.id}`}
					checked={checked}
					onChange={() => handleCheckReview((order.review as Review).id)}
				/>
				<ItemProductImage
					src={order.product.productImage ?? `${CDN_URL}/empty_image_330x330.png`}
					alt=""
				/>
				<div>
					<ItemProductName>{order.product.productName}</ItemProductName>
					<ItemProductOption>
						{order.spec.size} / {categoryLabel}
					</ItemProductOption>
				</div>
			</ItemProduct>
			<FitcoInput
				ref={inputRef}
				$marginBottom={12}
				$disabled={!isActive}
				value={value}
				onChange={handleChangeValue}
				onBlur={() => setIsActive(false)}
			/>
			<ItemActions>
				<PrimaryButtonSmall onClick={handleClickEdit}>수정하기</PrimaryButtonSmall>
				<PrimaryButtonSmall
					$isActive
					onClick={handleClickSubmit}
					disabled={!(isEditing && !loading)}
				>
					{loading ? (
						<LoadingDots style={{ width: 24, height: 24, fill: theme.color.primary[140] }} />
					) : (
						"저장하기"
					)}
				</PrimaryButtonSmall>
			</ItemActions>
		</Container>
	);
}

const Container = styled.div``;

const ItemProduct = styled.label`
    padding: 12px 0px;
    display: flex;
    align-items: start;
    gap: 8px;
`;

const ItemProductInput = styled.input`
    margin: 0;
`;

const ItemProductImage = styled.img`
    width: 44px;
    height: 44px;
    object-fit: cover;
    border-radius: 8px;
	border: 1px solid ${(props) => props.theme.color.primary[20]};
`;

const ItemProductName = styled.div`
    text-overflow: ellipsis;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 21px */
    letter-spacing: -0.28px;
`;

const ItemProductOption = styled.div`
    color: ${(props) => props.theme.color.primary[60]};
    font-size: 14px;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: -0.42px;
`;

const ItemActions = styled.div`
    display: flex;
    gap: 12px;
`;
