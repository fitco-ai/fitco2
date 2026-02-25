export function isValidUrl(value: string): boolean {
	try {
		new URL(value);
		return true;
	} catch {
		return false;
	}
}

export function renderStars(rating: number) {
	const maxStars = 5;

	// 0~100 범위를 1~5 범위로 변환
	let starCount: number;
	if (rating < 20) starCount = 1;
	else if (rating < 40) starCount = 2;
	else if (rating < 60) starCount = 3;
	else if (rating < 80) starCount = 4;
	else starCount = 5;

	const filled = "★".repeat(starCount);
	const empty = "☆".repeat(maxStars - starCount);
	return filled + empty;
}

// export function resolveCategoryLabel(memberProductMap: Record<number, MemberProduct> | null, productId: number, productCategory: string | null) {
// 	const categoryValue = (memberProductMap?.[productId]?.category ?? productCategory ?? "etc") as (typeof PRODUCT_CATEGORIES)[number]["value"];

// 	return PRODUCT_CATEGORIES.find(c => c.value === categoryValue)?.label ?? "기타";

// }
