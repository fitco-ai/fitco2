import type { Order, Product, Review, Spec } from ".";

export type OrderHistory = {
	order: Order;
	product: Product;
	spec: Spec;
	review: Review | null;
};

export type GetOrderHistoryRequest = {
	cafe24MemberId: string | null;
};

export type GetOrderHistoryResponseData = {
	orders: OrderHistory[];
};
