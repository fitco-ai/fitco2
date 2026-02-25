import styled from "styled-components";
import { renderStars } from "../../../../utils/ common";
import { useSizeResultContextState } from "../../../../context/size-result";
import { LoadingDots } from "../../../../svgs";

export default function ResultSizeContent({ expanded }: { expanded: boolean }) {
	const { selectedSizeResult, detailLoading } = useSizeResultContextState();

	if (detailLoading) {
		return (
			<LoadingBox>
				<LoadingDots style={{ width: 25, height: 25 }} />
			</LoadingBox>
		);
	}

	return (
		<Container>
			<Top>
				<TopTitle>
					{selectedSizeResult?.best && "[Best 추천!]"}
					Size {selectedSizeResult?.size}
				</TopTitle>
				<TopSubTitle>{selectedSizeResult?.subTitle}</TopSubTitle>
				{expanded && (
					<TopRating>예상 만족도 {renderStars(selectedSizeResult?.avgScore ?? 0)}</TopRating>
				)}
			</Top>
			{expanded && (
				<Bottom>
					<BottomTitle>
						{selectedSizeResult?.title}
						<br />
						{selectedSizeResult?.subTitle}
					</BottomTitle>
					{/* <BottomChart>
						<RadarChart outerRadius={90} width={320} height={250} data={sizeResult.scores}>
							<PolarGrid />
							<PolarAngleAxis dataKey="subject" />
							<PolarRadiusAxis domain={[0, 100]} tick={false} />
							<Radar dataKey="amount" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
						</RadarChart>
					</BottomChart> */}
					<BottomList>
						{selectedSizeResult?.descriptions?.map((description) => (
							<DiskLi key={description}>{description}</DiskLi>
						))}
					</BottomList>
				</Bottom>
			)}
		</Container>
	);
}

const Container = styled.section`
    margin-bottom: 30px;`;

const Top = styled.div`
    margin-bottom: 20px;
`;

const TopTitle = styled.div`
    color: ${(props) => props.theme.color.primary[140]};
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
    line-height: 44px;
    letter-spacing: -0.32px;
`;

const TopSubTitle = styled.div`
    margin-bottom: 16px;
    color: ${(props) => props.theme.color.primary[60]};
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;

const TopRating = styled.div`
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

const Bottom = styled.div`
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    border-radius: 14px;
    background: ${(props) => props.theme.color.primary[5]};
`;

const BottomTitle = styled.div`
    color: ${(props) => props.theme.color.primary[140]};
    text-align: center;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%; /* 28px */
    letter-spacing: -0.4px;
`;

// const BottomChart = styled.div``;

const BottomList = styled.ul`
    color: ${(props) => props.theme.color.primary[80]};
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: -0.48px;
    padding-left: 20px;
    list-style: disc !important;
`;

const DiskLi = styled.li`
	list-style: disc !important;
`;

const LoadingBox = styled.div`
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
