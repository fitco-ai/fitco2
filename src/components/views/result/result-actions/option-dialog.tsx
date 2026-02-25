import styled from "styled-components";
import { ResetButton } from "../../../../styled-ui/reset-components";
import { LoadingDots, MinusIcon, PlusIcon, XIcon } from "../../../../svgs";
import { useCallback, useEffect, useState } from "react";
import { useCafe24DataContext } from "../../../../context/cafe24-data";
import type { Cafe24ProductOption, Cafe24Variant } from "../../../../types/cafe24";

import _ from "lodash";
import { useUpdateAnalytics } from "../../../../hooks/useUpdateAnalytics";
import { Dialog } from "../../../../styled-ui/dialog";

export default function OptionDialog({ close }: { close: () => void }) {
	const updateAnalytics = useUpdateAnalytics();
	const { iProductNo, shopNo } = useCafe24DataContext();
	const [options, setOptions] = useState<Cafe24ProductOption>();
	const [variants, setVariants] = useState<Cafe24Variant[]>();
	const [loading, setLoading] = useState(false);
	const [selectedOptions, setSelectedOptions] = useState<
		{ optionName: string; optionText: string }[]
	>([]);
	const [selectedVariants, setSelectedVariants] = useState<
		{
			variantCode: string;
			quantity: number;
			options: { option_code: string; value_no: number | null }[] | null;
		}[]
	>([]);
	const [dialogProps, setDialogProps] = useState<{
		title: string;
		subtitle: string;
		onConfirm: () => void;
		onClose?: () => void;
	} | null>(null);
	const cartUrl = `${window.location.origin}/shop${shopNo}/order/basket.html`;

	const handleChangeOption = useCallback((optionName: string, optionText: string) => {
		setSelectedOptions((prev) => {
			if (prev.find((o) => o.optionName === optionName)) {
				if (optionText === "none") {
					return prev.filter((o) => o.optionName !== optionName);
				} else {
					return prev.map((o) => (o.optionName === optionName ? { ...o, optionText } : o));
				}
			}
			return [...prev, { optionName, optionText }];
		});
	}, []);

	const handleSubmit = () => {
		const payload = {
			shop_no: shopNo,
			request: {
				duplicated_item_check: "F",
				product_no: Number(iProductNo),
				basket_type: "A0000",
				prepaid_shipping_fee: "P",
				variants: selectedVariants.map((v) => ({
					quantity: v.quantity,
					variants_code: v.variantCode,
				})),
			},
		};

		(window as any).CAFE24API.post(`/shop${shopNo}/api/v2/carts`, payload, (err: any, res: any) => {
			if (err) {
				console.error("err", err);
			} else if (res) {
				console.log("Cart response", res);
				setDialogProps({
					title: "장바구니",
					subtitle: `장바구니에 상품이 추가되었습니다.\n장바구니로 이동하시겠습니까?`,
					onConfirm: () => {
						window.location.href = cartUrl;
					},
					onClose: () => {
						setDialogProps(null);
					},
				});
				// if (window.confirm("장바구니에 상품이 추가되었습니다. 장바구니로 이동하시겠습니까?")) {
				// 	window.location.href = `${window.location.origin}/shop${shopNo}/order/basket.html`;
				// }
				updateAnalytics({
					cart: true,
				});
			}
		});
	};

	useEffect(() => {
		const get = async () => {
			setLoading(true);
			try {
				await new Promise((resolve) => {
					(window as any).CAFE24API.get(
						`/api/v2/products/${iProductNo}?embed=variants&shop_no=${shopNo}`,
						(
							err: any,
							res: {
								product: {
									variants: Cafe24Variant[];
								};
							},
						) => {
							if (err) {
								console.error(err);
								window.alert("구매하기를 진행할 수 없습니다. 관리자에게 문의해 주세요.");
								close();
							} else if (res) {
								const variants = res.product.variants;
								setVariants(
									variants.map((v) => ({
										display: v.display,
										shop_no: v.shop_no,
										variant_code: v.variant_code,
										options: v.options,
									})),
								);
								if (variants.length === 1 && variants[0].options === null) {
									setSelectedVariants([
										{
											variantCode: variants[0].variant_code,
											quantity: 1,
											options: null,
										},
									]);
								}
								resolve("ok");
							}
						},
					);
				});

				await new Promise((resolve) => {
					(window as any).CAFE24API.get(
						`/api/v2/products/${iProductNo}/options?shop_no=${shopNo}`,
						(err: any, res: { options: Cafe24ProductOption }) => {
							if (err) {
								console.error(err);
								window.alert(
									"장바구니에 담을 수 없습니다. 상세페이지에서 수동 입력을 이용해 주세요.",
								);
								close();
							} else if (res) {
								setOptions(res.options);
								resolve("ok");
							}
						},
					);
				});
			} catch (error) {
				console.error(error);
				window.alert("장바구니에 담을 수 없습니다. 상세페이지에서 수동 입력을 이용해 주세요.");
				close();
			} finally {
				setLoading(false);
			}
		};
		get();
	}, [close, iProductNo, shopNo]);

	useEffect(() => {
		if (!variants || !options) {
			return;
		}
		const targetVariant = variants.find((v) => {
			return isSameArray(
				v.options ?? [],
				selectedOptions.map((o) => ({
					name: o.optionName,
					value: o.optionText,
				})),
			);
		});

		if (!targetVariant) {
			return;
		}

		setSelectedVariants((prev) => {
			if (prev.find((v) => v.variantCode === targetVariant.variant_code)) {
				return prev;
			}
			return [
				...prev,
				{
					variantCode: targetVariant.variant_code,
					quantity: 1,
					options: selectedOptions.map((o) => {
						const targetOption = options.options.find(
							(option) => option.option_name === o.optionName,
						);
						const targetOptionValue = targetOption?.option_value.find(
							(v) => v.option_text === o.optionText,
						);
						const optionCode = targetOption?.option_code ?? "";
						const valueNo = targetOptionValue?.value_no ?? null;
						return {
							option_code: optionCode,
							value_no: valueNo,
						};
					}),
				},
			];
		});
	}, [selectedOptions, variants, options]);

	if (!options || !variants) {
		return null;
	}

	if (variants.length === 1 && variants[0].options === null) {
		const selected = selectedVariants[0];

		if (!selected) {
			return null;
		}

		const variant = variants.find((v) => v.variant_code === selected.variantCode);
		if (!variant) {
			return null;
		}
		return (
			<>
				<Container>
					<Box>
						{loading ? (
							<LoadingContainer>
								<LoadingDots style={{ width: 24, height: 24 }} />
							</LoadingContainer>
						) : (
							<Content>
								<FlexEnd>
									<ResetButton onClick={close}>
										<XIcon style={{ width: 24, height: 24 }} />
									</ResetButton>
								</FlexEnd>
								<Title>장바구니</Title>
								<Variants>
									<VariantItem>
										<VariantText>단일상품</VariantText>
										<VariantActions>
											<VariantCount>
												<VariantCountIconButton
													$position="left"
													onClick={() => {
														if (selected.quantity > 1) {
															setSelectedVariants((prev) =>
																prev.map((prevV) =>
																	prevV.variantCode === variant.variant_code
																		? { ...prevV, quantity: prevV.quantity - 1 }
																		: prevV,
																),
															);
														}
													}}
												>
													<MinusIcon style={{ width: 16, height: 16 }} />
												</VariantCountIconButton>
												<VariantCountText>{selected.quantity}</VariantCountText>
												<VariantCountIconButton
													$position="right"
													onClick={() => {
														setSelectedVariants((prev) =>
															prev.map((prevV) =>
																prevV.variantCode === variant.variant_code
																	? { ...prevV, quantity: prevV.quantity + 1 }
																	: prevV,
															),
														);
													}}
												>
													<PlusIcon style={{ width: 16, height: 16 }} />
												</VariantCountIconButton>
											</VariantCount>
											<VariantDeleteButton
												onClick={() => {
													setSelectedVariants((prev) =>
														prev.filter((prevV) => prevV.variantCode !== variant.variant_code),
													);
												}}
											>
												<XIcon style={{ width: 16, height: 16 }} />
											</VariantDeleteButton>
										</VariantActions>
									</VariantItem>
								</Variants>
								<ActionButton $isPrimary onClick={handleSubmit}>
									장바구니에 담기
								</ActionButton>
							</Content>
						)}
					</Box>
				</Container>
				<Dialog
					open={!!dialogProps}
					title={dialogProps?.title ?? ""}
					subtitle={dialogProps?.subtitle ?? ""}
					onConfirm={dialogProps?.onConfirm ?? (() => {})}
					onClose={dialogProps?.onClose}
				/>
			</>
		);
	}

	return (
		<>
			<Container>
				<Box>
					{loading ? (
						<LoadingContainer>
							<LoadingDots style={{ width: 24, height: 24 }} />
						</LoadingContainer>
					) : (
						<Content>
							<FlexEnd>
								<ResetButton onClick={close}>
									<XIcon style={{ width: 24, height: 24 }} />
								</ResetButton>
							</FlexEnd>
							<Title>장바구니</Title>
							{options.has_option === "T" && options.options.length > 0 && (
								<Options>
									{options.options.map((option) => {
										const isRequired = option.required_option === "T";
										const convertedOptions = option.option_value.map((v) => ({
											label: v.option_text,
											value: v.option_text,
										}));
										const selectOptions = isRequired
											? convertedOptions
											: [...convertedOptions, { label: "선택안함", value: "none" }];
										return (
											<OptionsItem key={option.option_code}>
												<OptionLabel>{option.option_name}</OptionLabel>
												<RadioGroup>
													{selectOptions.map((optionItem) => {
														const isSelected = selectedOptions.find(
															(so) =>
																so.optionName === option.option_name &&
																so.optionText === optionItem.value,
														);
														return (
															<RadioItem key={optionItem.value}>
																<RadioInput
																	type="radio"
																	id={`${option.option_code}-${optionItem.value}`}
																	name={option.option_name}
																	value={optionItem.value}
																	checked={!!isSelected}
																	onChange={() => {
																		handleChangeOption(option.option_name, optionItem.value);
																	}}
																/>
																<RadioLabel htmlFor={`${option.option_code}-${optionItem.value}`}>
																	{optionItem.label}
																</RadioLabel>
															</RadioItem>
														);
													})}
												</RadioGroup>
											</OptionsItem>
										);
									})}
								</Options>
							)}
							<Variants>
								{selectedVariants.map((sv) => {
									const variant = variants.find((v) => v.variant_code === sv.variantCode);
									if (!variant) {
										return null;
									}
									return (
										<VariantItem key={variant.variant_code}>
											<VariantText>
												{variant.options?.map((o) => `${o.name}: ${o.value}`).join(" ")}
											</VariantText>
											<VariantActions>
												<VariantCount>
													<VariantCountIconButton
														$position="left"
														onClick={() => {
															if (sv.quantity > 1) {
																setSelectedVariants((prev) =>
																	prev.map((prevV) =>
																		prevV.variantCode === variant.variant_code
																			? { ...prevV, quantity: prevV.quantity - 1 }
																			: prevV,
																	),
																);
															}
														}}
													>
														<MinusIcon style={{ width: 16, height: 16 }} />
													</VariantCountIconButton>
													<VariantCountText>{sv.quantity}</VariantCountText>
													<VariantCountIconButton
														$position="right"
														onClick={() => {
															setSelectedVariants((prev) =>
																prev.map((prevV) =>
																	prevV.variantCode === variant.variant_code
																		? { ...prevV, quantity: prevV.quantity + 1 }
																		: prevV,
																),
															);
														}}
													>
														<PlusIcon style={{ width: 16, height: 16 }} />
													</VariantCountIconButton>
												</VariantCount>
												<VariantDeleteButton
													onClick={() => {
														setSelectedVariants((prev) =>
															prev.filter((prevV) => prevV.variantCode !== variant.variant_code),
														);
													}}
												>
													<XIcon style={{ width: 16, height: 16 }} />
												</VariantDeleteButton>
											</VariantActions>
										</VariantItem>
									);
								})}
							</Variants>
							<ActionButton
								$isPrimary
								onClick={handleSubmit}
								disabled={selectedVariants.length < 1}
							>
								장바구니에 담기
							</ActionButton>
						</Content>
					)}
				</Box>
			</Container>
			<Dialog
				open={!!dialogProps}
				title={dialogProps?.title ?? ""}
				subtitle={dialogProps?.subtitle ?? ""}
				onConfirm={dialogProps?.onConfirm ?? (() => {})}
				onClose={dialogProps?.onClose}
			/>
		</>
	);
}

const Container = styled.div`
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Title = styled.div`
	margin-bottom: 12px;
	font-size: 18px;
	font-weight: 700;
	text-align: center;
`;

const Box = styled.div`
    width: 80%;
    max-width: 500px;
    max-height: 80vh;
    overflow-y: auto;
    background-color: #fff;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 20px;
`;

const FlexEnd = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const LoadingContainer = styled.div`
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Options = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const OptionsItem = styled.div``;

const OptionLabel = styled.div`
    font-size: 14px;
    font-weight: 500;
`;

const Variants = styled.div`
    margin-top: 16px;
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const VariantItem = styled.div`
    border-radius: 16px;
    padding: 8px 0px;
    display: flex;
    gap: 4px;
    justify-content: space-between;
    align-items: center;
`;

const VariantText = styled.div`
	font-size: 18px;
	word-wrap: break-word;
`;

const VariantActions = styled.div`
    display: flex;
	align-items: center;
    gap: 8px;
`;

const VariantCount = styled.div`
    display: flex;
    align-items: center;
`;

const VariantCountText = styled.div`
    box-sizing: border-box;
    width: 40px;
    height: 40px;
    border-top: 1px solid ${(props) => props.theme.color.primary[60]};
	border-bottom: 1px solid ${(props) => props.theme.color.primary[60]};
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.color.primary[0]};
`;

const VariantCountIconButton = styled(ResetButton)<{ $position: "left" | "right" }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border: 1px solid ${(props) => props.theme.color.primary[60]};
    ${(props) => (props.$position === "left" ? "border-right: none; border-top-left-radius: 8px; border-bottom-left-radius: 8px;" : "border-left: none; border-top-right-radius: 8px; border-bottom-right-radius: 8px;")}
    background-color: ${(props) => props.theme.color.primary[0]};
`;

const VariantDeleteButton = styled(ResetButton)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
`;

const ActionButton = styled(ResetButton)<{ $isPrimary?: boolean }>`
    width: 100%;
    display: flex;
    padding: 16px 32px;
    justify-content: center;
	font-size: 16px;
    align-items: center;
    flex: 1 0 0;
    border-radius: 16px;
    color: ${(props) => (props.$isPrimary ? props.theme.color.primary[0] : props.theme.color.primary[140])};
    background-color: ${(props) => (props.$isPrimary ? props.theme.color.primary[140] : props.theme.color.primary[10])};
	box-shadow: ${(props) => (props.$isPrimary ? "4px 4px 20px 0px hsla(0, 0%, 0%, 0.08)" : "none")};
`;

const RadioGroup = styled.div`
    display: flex;
	flex-wrap: wrap;
    gap: 8px;
    margin-top: 8px;
`;

const RadioItem = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const RadioInput = styled.input`
    width: 16px;
    height: 16px;
    accent-color: ${(props) => props.theme.color.primary[140]};
`;

const RadioLabel = styled.label`
    font-size: 14px;
    cursor: pointer;
    user-select: none;
`;

function isSameArray(arr1: any[], arr2: any[]) {
	return _.isEqual(_.sortBy(arr1), _.sortBy(arr2));
}
