import type { Spec } from "./spec";

export type CrawlUrlRequest = {
	url: string;
};

export type CrawlUrlResponseData = {
	isValidUrl: boolean;
	data?: {
		specs: Spec[];
	};
};
