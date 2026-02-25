import styled from "styled-components";
import { useCafe24DataContext } from "../../../context/cafe24-data";

export default function ResultProduct() {
	const { cafe24MallId, productName, productImage } = useCafe24DataContext();

	if (!cafe24MallId || !productName || !productImage) {
		return null;
	}

	return (
		<Container>
			<Image src={productImage} />
			<Info>
				<InfoHeader>지금 쇼핑 중인 상품</InfoHeader>
				<FlexGap12>
					<InfoMallName>[{cafe24MallId}]</InfoMallName>
					<InfoProductName>{productName}</InfoProductName>
				</FlexGap12>
			</Info>
		</Container>
	);
}

const Container = styled.div`
    margin-top: 26px;
    margin-bottom: 20px;
    display: flex;
    padding: 10px 14px;
    gap: 12px;
    border-radius: 12px;
    background: ${(props) => props.theme.color.primary[5]};
`;

const Image = styled.img`
    width: 77px;
    height: 77px;
    object-fit: cover;
    border-radius: 16px;
    border: 1px solid ${(props) => props.theme.color.primary[20]};
`;

const Info = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const InfoHeader = styled.div`
    margin-bottom: 8px;
    color: ${(props) => props.theme.color.accent[140]};
    font-weight: 700;
    font-size: 14px;
    line-height: 150%;
    letter-spacing: -2%;
`;

const FlexGap12 = styled.div`
    display: flex;
    gap: 12px;
`;

const InfoMallName = styled.span`
    color: ${(props) => props.theme.color.primary[140]};
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: -0.42px;
`;

const InfoProductName = styled.span`
    color: ${(props) => props.theme.color.primary[140]};
    text-overflow: ellipsis;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    letter-spacing: -0.28px;
`;
