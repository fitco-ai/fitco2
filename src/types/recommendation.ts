import type { SizeResult } from "./size-result";

export type Recommendation = {
	id: number;
	productName: string | null;
	productImage: string | null;
	size: string | null;
	brand: string | null;
	cafe24MallId: string | null;
	sizeResults: SizeResult[];
};

export type GetMemberRecommendationResponseData = {
	recommendations: Recommendation[];
};

export type DeleteRecommendationRequest = {
	recommendationIds: number[];
};
