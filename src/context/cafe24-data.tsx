import { createContext, type ReactNode, useContext, useEffect, useState } from "react";

type Cafe24DataContextType = {
	cafe24MallId: string | undefined;
	shopNo: number | undefined;
	iProductNo: string | null;
	productName: string | null;
	productImage: string | null;
	cafe24MemberId: string | null;
};

const Cafe24DataContext = createContext<Cafe24DataContextType | null>(null);

export default function Cafe24DataProvider({ children }: { children: ReactNode }) {
	const [cafe24MallId, setCafe24MallId] = useState<string>();
	const [shopNo, setShopNo] = useState<number>();
	const [iProductNo, setIProductNo] = useState<string | null>(null);
	const [productName, setProductName] = useState<string | null>(null);
	const [productImage, setProductImage] = useState<string | null>(null);
	const [cafe24MemberId, setCafe24MemberId] = useState<string | null>(null);

	useEffect(() => {
		if (import.meta.env.MODE === "development") {
			setCafe24MallId("apcdesign");
			setShopNo(2);
			setIProductNo("24");
			setProductName("Butter Top shirts");
			setProductImage(
				"https://ecimg.cafe24img.com/pg1411b84835126084/apcdesign/web/product/big/20241106/ab0676d3813bd297ce732863612e8fd3.png",
			);
			setCafe24MemberId("jaewooojung");
			return;
		}
		const mallId = (window as any).CAFE24.SHOP.getMallID();
		const shopNo = (window as any).CAFE24API?.SHOP_NO ?? (window as any).EC_SDE_SHOP_NUM;
		const iProductNo = (window as any).iProductNo;
		const productName = (window as any).product_name;

		let productImage = (window as any)?.ImagePreview?.eBigImgSrc ?? null;

		if (productImage) {
			productImage = productImage.startsWith("https") ? productImage : `https:${productImage}`;
		} else {
			productImage = `${origin}/web/product/tiny/${(window as any).product_image_tiny}`;
		}

		const memberId =
			(window as any).CAPP_ASYNC_METHODS.AppCommon?.getMemberID?.() ??
			(window as any).CAPP_ASYNC_METHODS.member?.getData?.().member_id ??
			null;
		setCafe24MallId(mallId);
		setShopNo(shopNo);
		setIProductNo(iProductNo);
		setProductName(productName.replace(/<[^>]+>/g, ""));
		setProductImage(productImage);
		setCafe24MemberId(memberId);
	}, []);

	return (
		<Cafe24DataContext.Provider
			value={{ cafe24MallId, shopNo, iProductNo, productName, productImage, cafe24MemberId }}
		>
			{children}
		</Cafe24DataContext.Provider>
	);
}

export function useCafe24DataContext() {
	const context = useContext(Cafe24DataContext);
	if (!context) {
		throw new Error("useCafe24DataContext must be used within a Cafe24DataProvider");
	}
	return context;
}
