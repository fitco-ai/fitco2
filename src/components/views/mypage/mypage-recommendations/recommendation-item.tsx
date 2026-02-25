import styled from "styled-components";
import { CDN_URL } from "../../../../const";
import type { Recommendation } from "../../../../types/recommendation";
import { Accordion } from "../accordion";
import { renderStars } from "../../../../utils/ common";

export default function RecommendationItem({
	recommendation,
	checked,
	handleCheckItem,
}: {
	recommendation: Recommendation;
	checked: boolean;
	handleCheckItem: (reviewId: number) => void;
}) {
	const bestSizeResult = recommendation.sizeResults.find((sizeResult) => sizeResult.best);

	if (!bestSizeResult) {
		return null;
	}

	return (
		<Container>
			<Accordion
				innerAccordion
				title={
					<ItemProduct>
						<ItemProductInput
							type="checkbox"
							checked={checked}
							onChange={() => handleCheckItem(recommendation.id)}
						/>
						<ItemProductImage
							src={recommendation.productImage ?? `${CDN_URL}/empty_image_330x330.png`}
							alt=""
						/>
						<div>
							<ItemProductName>
								<SemiBold>
									{(!!recommendation.cafe24MallId || !!recommendation.brand) &&
										`[${recommendation.cafe24MallId ?? recommendation.brand}]`}
								</SemiBold>
								{recommendation.productName}
							</ItemProductName>
							<ItemProductSize>Best 추천사이즈: {recommendation.size ?? "Free"}</ItemProductSize>
						</div>
					</ItemProduct>
				}
			>
				<SizeResult>
					<SizeResultSize>Size {bestSizeResult.size}</SizeResultSize>
					<SizeResultSubtitle>{bestSizeResult.subTitle}</SizeResultSubtitle>
					<SizeResultScore>
						<SizeResultScoreTitle>예상 만족도</SizeResultScoreTitle>
						<SizeResultScoreRating>{renderStars(bestSizeResult.avgScore)}</SizeResultScoreRating>
					</SizeResultScore>
					<SizeResultContent>
						<SizeResultContentTop>{bestSizeResult.subTitle}</SizeResultContentTop>
						<SizeResultContentBottomList>
							{bestSizeResult?.descriptions?.map((description) => (
								<DiskLi key={description}>{description}</DiskLi>
							))}
						</SizeResultContentBottomList>
					</SizeResultContent>
				</SizeResult>
			</Accordion>
		</Container>
	);
}

const Container = styled.div`
	border-bottom: 1px solid ${(props) => props.theme.color.primary[10]};

	&:last-child {
		border-bottom: none;
	}
`;

const ItemProduct = styled.div`
    padding: 12px 0px;
    display: flex;
    align-items: start;
    gap: 8px;
`;

const ItemProductInput = styled.input`
	flex-shrink: 0;
    margin: 0;
`;

const ItemProductImage = styled.img`
	flex-shrink: 0;
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
    font-weight: 400;
    line-height: 150%; /* 21px */
    letter-spacing: -0.28px;
`;

const ItemProductSize = styled.div`
    font-size: 14px;
    font-weight: 600;
    line-height: 150%;
    letter-spacing: -0.42px;
`;

const SemiBold = styled.span`
	font-weight: 600;
`;

const SizeResult = styled.div``;

const SizeResultSize = styled.div`
	margin-bottom: 2px;
	color: ${(props) => props.theme.color.primary[140]};
	font-size: 18px;
	font-style: normal;
	font-weight: 400;
	line-height: 150%;
	letter-spacing: -2%;
`;

const SizeResultSubtitle = styled.div`
	margin-bottom: 16px;
	color: ${(props) => props.theme.color.golbat[60]};
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: 100%;
	letter-spacing: 0%;
`;

const SizeResultScore = styled.div`
	margin-bottom: 8px;
	display: flex;
	gap: 6px;
	align-items: center;
`;

const SizeResultScoreTitle = styled.div`
	color: ${(props) => props.theme.color.primary[140]};
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: 150%;
	letter-spacing: -3%;
`;

const SizeResultScoreRating = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    color: ${(props) => props.theme.color.primary[140]};
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 21px */
    letter-spacing: -0.42px;
`;

const SizeResultContent = styled.div`
	padding: 16px;
	border-radius: 16px;
	background: ${(props) => props.theme.color.primary[5]};
`;

const SizeResultContentTop = styled.div`
	padding: 0 32px;
	color: ${(props) => props.theme.color.primary[140]};
	font-size: 16px;
	font-style: normal;
	font-weight: 600;
	line-height: 150%;
	letter-spacing: -2%;
	text-align: center;
`;

const SizeResultContentBottomList = styled.ul`
	color: ${(props) => props.theme.color.primary[80]};
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: -3%;
	padding-left: 20px;
`;

const DiskLi = styled.li`
	list-style: disc !important;
`;
