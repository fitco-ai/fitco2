import styled from "styled-components";
import _ from "lodash";
import type { Weight } from ".";
import type { Dispatch, SetStateAction } from "react";

export default function FormWeight({
	loading,
	isActive,
	weight,
	setWeight,
}: {
	loading: boolean;
	isActive: boolean;
	weight: Weight;
	setWeight: Dispatch<SetStateAction<Weight>>;
}) {
	// const update = useMemo(
	// 	() =>
	// 		_.debounce(async (value: string) => {
	// 			const token = localStorage.getItem(TOKEN_NAME);

	// 			if (!token) {
	// 				return;
	// 			}

	// 			try {
	// 				const payload: UpdateMemberRequest = {
	// 					weight: Number(value),
	// 				};

	// 				const response = await fetch(`${API_URL}/api/widget/members/update`, {
	// 					method: "POST",
	// 					body: JSON.stringify(payload),
	// 					headers: {
	// 						"Content-Type": "application/json",
	// 						Authorization: `Bearer ${token}`,
	// 						"ngrok-skip-browser-warning": "true",
	// 					},
	// 				});

	// 				if (!response.ok) {
	// 					throw new Error("Failed to update member");
	// 				}

	// 				setMember((prev) => {
	// 					if (!prev) {
	// 						return null;
	// 					}

	// 					return {
	// 						...prev,
	// 						weight: payload.weight ?? null,
	// 					};
	// 				});
	// 			} catch (error) {
	// 				console.error(error);
	// 			}
	// 		}, 1000),
	// 	[setMember],
	// );

	// const handleChange = useCallback(
	// 	(e: ChangeEvent<HTMLInputElement>) => {
	// 		const value = e.target.value;
	// 		update(value);
	// 	},
	// 	[update],
	// );

	// useEffect(() => {
	// 	if (member?.weight) {
	// 		setWeight(member.weight);
	// 	}
	// }, [member?.weight, setWeight]);

	return (
		<FormItem>
			<FormItemLabel>3. 몸무게를 입력해 주세요.</FormItemLabel>
			<FormItemInputWrapper>
				<FormItemInput
					type="number"
					placeholder="000"
					// value={height || ""}
					defaultValue={weight ?? ""}
					onChange={(e) => setWeight(Number(e.target.value))}
					disabled={!isActive || loading}
				/>
				<FormItemInputUnit>KG</FormItemInputUnit>
			</FormItemInputWrapper>
		</FormItem>
	);
}

const FormItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
	border-top: 1px solid ${(props) => props.theme.color.primary[10]};
	padding-top: 16px;
`;

const FormItemLabel = styled.label`
    color: ${(props) => props.theme.color.primary[140]};
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: -0.48px;
`;

const FormItemInputWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const FormItemInput = styled.input`
    padding: 16px !important;
    box-sizing: border-box !important;
    width: 85px !important;
	height: 56px !important;
    border-radius: 16px !important;
    background: ${(props) => props.theme.color.primary[5]};
    border: 1px solid ${(props) => props.theme.color.primary[20]};
    font-size: 16px !important;
    
    &:focus {
        outline: none;
        border-color: ${(props) => props.theme.color.primary[100]} !important;
    }
    
    &::placeholder {
        color: ${(props) => props.theme.color.primary[60]} !important;
    }

	&:disabled {
		opacity: 0.7;
	}
`;

const FormItemInputUnit = styled.span`
    color: ${(props) => props.theme.color.primary[140]};
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: -0.48px;
`;
