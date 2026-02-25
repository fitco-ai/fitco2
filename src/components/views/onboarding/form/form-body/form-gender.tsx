import { useEffect, useState } from "react";
import { API_URL, MEMBER_GENDERS, TOKEN_NAME } from "../../../../../const";
import type { UpdateMemberRequest } from "../../../../../types";
import { useMemberContextDispatch, useMemberContextState } from "../../../../../context/member";
import styled from "styled-components";
import { ResetButton } from "../../../../../styled-ui/reset-components";

export default function FormGender() {
	const { member } = useMemberContextState();
	const { setMember } = useMemberContextDispatch();
	const [gender, setGender] = useState<(typeof MEMBER_GENDERS)[number]["value"]>();
	const [loading, setLoading] = useState(false);

	const handleClick = async (gender: (typeof MEMBER_GENDERS)[number]["value"]) => {
		setLoading(true);
		const token = localStorage.getItem(TOKEN_NAME);

		if (!token) {
			return;
		}

		try {
			const payload: UpdateMemberRequest = {
				gender,
			};

			const response = await fetch(`${API_URL}/api/widget/members/update`, {
				method: "POST",
				body: JSON.stringify(payload),
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
					"ngrok-skip-browser-warning": "true",
				},
			});

			if (!response.ok) {
				throw new Error("Failed to update member");
			}

			setMember((prev) => {
				if (!prev) {
					return null;
				}

				return {
					...prev,
					gender: payload.gender ?? null,
				};
			});
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (member?.gender) {
			setGender(member.gender);
		}
	}, [member?.gender]);

	return (
		<FormItem>
			<FormItemLabel>1. 성별을 선택해 주세요.</FormItemLabel>
			<ButtonGroup>
				{MEMBER_GENDERS.map((g) => (
					<FormItemButton
						key={g.value}
						type="button"
						$isSelected={g.value === gender}
						disabled={loading}
						onClick={() => handleClick(g.value)}
					>
						{g.label}
					</FormItemButton>
				))}
			</ButtonGroup>
		</FormItem>
	);
}

const FormItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const FormItemLabel = styled.label`
    color: ${(props) => props.theme.color.primary[140]};
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: -0.48px;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
`;

const FormItemButton = styled(ResetButton)<{ $isSelected?: boolean }>`
    padding: 10px 14px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    border: 1px solid ${(props) => (props.$isSelected ? props.theme.color.primary[140] : props.theme.color.primary[20])};
    background: ${(props) => (props.$isSelected ? props.theme.color.primary[140] : props.theme.color.primary[0])};
    color: ${(props) => (props.$isSelected ? props.theme.color.primary[0] : props.theme.color.primary[140])};
    font-size: 14px;

	&:disabled {
		opacity: 0.7;
	}
`;
