export type InitializeAnalyticsRequest = {
	cafe24MallId: string;
	shopNo: number;
};

export type InitializeAnalyticsResponseData = {
	analyticsId: number;
};

export type UpdateAnalyticsRequest = {
	analyticsId: number;
	value: {
		click?: boolean;
		result?: boolean;
		cart?: boolean;
		exitView?: string;
	};
};
