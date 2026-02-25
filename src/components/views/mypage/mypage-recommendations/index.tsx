import { useCallback, useEffect, useId, useState } from "react";
import { API_URL, TOKEN_NAME } from "../../../../const";
import { ResetButton } from "../../../../styled-ui/reset-components";
import { LoadingDots, LoadingSpinner, TrashIcon } from "../../../../svgs";
import { theme } from "../../../../styles/theme";
import styled from "styled-components";
import {
	useRecommendationContextDispatch,
	useRecommendationContextState,
} from "../../../../context/recommendation";
import type { DeleteRecommendationRequest } from "../../../../types/recommendation";
import RecommendationItem from "./recommendation-item";

export default function MyPageRecommendations() {
	const { recommendations, loading } = useRecommendationContextState();
	const { fetchRecommendations, refetchRecommendations } = useRecommendationContextDispatch();
	const [checkedRecommendationIds, setCheckedRecommendationIds] = useState<number[]>([]);
	const [deleteLoading, setDeleteLoading] = useState(false);
	const allCheckInputId = useId();

	const handleCheckRecommendation = useCallback((recommendationId: number) => {
		setCheckedRecommendationIds((prev) => {
			if (prev.includes(recommendationId)) {
				return prev.filter((id) => id !== recommendationId);
			}
			return [...prev, recommendationId];
		});
	}, []);

	const handleCheckAll = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			if (e.target.checked) {
				setCheckedRecommendationIds(recommendations.map((recommendation) => recommendation.id));
			} else {
				setCheckedRecommendationIds([]);
			}
		},
		[recommendations],
	);

	const handleClickDelete = useCallback(async () => {
		try {
			setDeleteLoading(true);
			const token = localStorage.getItem(TOKEN_NAME);

			const payload: DeleteRecommendationRequest = {
				recommendationIds: checkedRecommendationIds,
			};

			const response = await fetch(`${API_URL}/api/widget/recommendations`, {
				method: "DELETE",
				body: JSON.stringify(payload),
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
					"ngrok-skip-browser-warning": "true",
				},
			});

			if (response.ok) {
				refetchRecommendations();
			}
		} catch (error) {
			console.error(error);
		} finally {
			setDeleteLoading(false);
		}
	}, [checkedRecommendationIds, refetchRecommendations]);

	useEffect(() => {
		fetchRecommendations();
	}, [fetchRecommendations]);

	return (
		<Container>
			{recommendations?.length > 0 && (
				<AllCheck>
					<AllCheckInputContainer>
						<AllCheckInput
							type="checkbox"
							id={allCheckInputId}
							checked={checkedRecommendationIds.length === recommendations.length}
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
			<HistoryList>
				{loading ? (
					<LoadingContainer>
						<LoadingDots style={{ width: 32, height: 32 }} />
					</LoadingContainer>
				) : recommendations.length === 0 ? (
					<NoOrders>추천 히스토리가 없습니다.</NoOrders>
				) : (
					recommendations.map((recommendation) => {
						return (
							<RecommendationItem
								key={recommendation.id}
								checked={checkedRecommendationIds.includes(recommendation.id)}
								recommendation={recommendation}
								handleCheckItem={handleCheckRecommendation}
							/>
						);
					})
				)}
			</HistoryList>
		</Container>
	);
}

const Container = styled.div`
	box-sizing: border-box;
    padding-top: 16px;
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

const HistoryList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const NoOrders = styled.div`
	height: 100px !important;
	color: ${(props) => props.theme.color.primary[60]};
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
    text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const LoadingContainer = styled.div`
	height: 150px;
	display: flex;
	justify-content: center;
	align-items: center;
`;
