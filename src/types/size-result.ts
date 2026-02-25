export type GetSizeResultRequest = {
	cafe24MallId: string;
	shopNo: number;
	productNo: number;
};

export type SizeResult = {
	size: string;
	best: boolean;
	avgScore: number;
	title: string | null;
	subTitle: string | null;
	descriptions: string[] | null;
};

export type GetSizeResultResponseData = {
	canAnalyze: boolean;
	sizeResults: SizeResult[] | null;
};

export type GetCompareSizeResultRequest = {
	cafe24MallId: string;
	productNo: number;
	size1: SizeResult;
	size2: SizeResult;
	shopNo: number;
};

export type GetCompareSizeResultResponseData = {
	compareSummaries: { size: string; content: string }[];
};

export type GetSizeResultDetailRequest = GetSizeResultRequest & {
	size: string;
};

export type GetSizeResultDetailResponseData = {
	title: string;
	subTitle: string;
	descriptions: string[];
};
