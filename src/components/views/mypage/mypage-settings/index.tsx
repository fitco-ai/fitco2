import styled from "styled-components";
import ToggleSwitch from "../../../../styled-ui/toggle-switch";
import type { UpdateMemberRequest } from "../../../../types";
import { API_URL, TOKEN_NAME } from "../../../../const";
import { useMemberContextDispatch, useMemberContextState } from "../../../../context/member";

export default function MyPageSettings() {
	const { member } = useMemberContextState();
	const { setMember } = useMemberContextDispatch();

	const handleCheckedChange = async (checked: boolean) => {
		const token = localStorage.getItem(TOKEN_NAME);

		if (!token) {
			return;
		}

		try {
			const payload: UpdateMemberRequest = {
				agreementData: checked,
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
					agreementData: checked,
				};
			});
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Container>
			<Label>나만의 알림톡 받기</Label>
			<ToggleSwitch
				defaultChecked={!!member?.agreementData}
				handleCheckedChange={handleCheckedChange}
			/>
		</Container>
	);
}

const Container = styled.div`
	padding-bottom: 32px;
	box-sizing: border-box;
    padding: 16px 0px;
	display: flex;
	justify-content: space-between;
	align-items: center;
    border-top: 1px solid ${(props) => props.theme.color.primary[10]};
`;

const Label = styled.div`
    color: ${(props) => props.theme.color.primary[140]};
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 24px */
    letter-spacing: -0.48px;
`;
