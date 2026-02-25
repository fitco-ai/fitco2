import type { PRODUCT_CATEGORIES } from "../const";

export type Review = {
	memberId: number;
	id: number;
	createdAt: Date;
	productSpecificationId: number;
	content: string | null;
};

export type UpdateReviewRequest = {
	productSpecificationId: number;
	content: string;
};

export type DeleteReviewRequest = {
	reviewIds: number[];
};

export type SetUrlReviewRequest = {
	productSpecificationId: number;
	content: string;
	category: (typeof PRODUCT_CATEGORIES)[number]["value"];
};

export type CreateDirectReviewRequest = {
	brand: string | null;
	productName: string | null;
	category: (typeof PRODUCT_CATEGORIES)[number]["value"];
	size: string;
	spec: Record<string, string>;
	review: string;
};
