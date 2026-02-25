import styled from "styled-components";
import FormGender from "./form-gender";
import FormHeight from "./form-height";
import FormWeight from "./form-weight";
import { useEffect, useState } from "react";
import { type MEMBER_GENDERS, TOKEN_NAME, API_URL } from "../../../../const";
import FormActions from "./form-actions";
import type { UpdateMemberRequest } from "../../../../types";
import { useMemberContextDispatch, useMemberContextState } from "../../../../context/member";
import MemberPhone from "./member-phone";

export type Gender = (typeof MEMBER_GENDERS)[number]["value"] | undefined;
export type Height = number | undefined;
export type Weight = number | undefined;

export default function MyPageInfo() {
	const { member } = useMemberContextState();
	const { setMember } = useMemberContextDispatch();
	const [gender, setGender] = useState<Gender>();
	const [height, setHeight] = useState<Height>();
	const [weight, setWeight] = useState<Weight>();
	const [isActive, setIsActive] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		setLoading(true);
		const token = localStorage.getItem(TOKEN_NAME);

		if (!token) {
			return;
		}

		try {
			const payload: UpdateMemberRequest = {
				gender,
				height,
				weight,
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
					height: payload.height ?? null,
					weight: payload.weight ?? null,
				};
			});
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
			setIsActive(false);
		}
	};

	useEffect(() => {
		if (member?.weight) {
			setWeight(member.weight);
		}
		if (member?.height) {
			setHeight(member.height);
		}
		if (member?.gender) {
			setGender(member.gender);
		}
	}, [member?.gender, member?.height, member?.weight]);

	return (
		<Container>
			<MemberPhone loginPhone={member?.loginPhone ?? null} />
			<FormGender loading={loading} isActive={isActive} gender={gender} setGender={setGender} />
			<FormHeight loading={loading} isActive={isActive} height={height} setHeight={setHeight} />
			<FormWeight loading={loading} isActive={isActive} weight={weight} setWeight={setWeight} />
			<FormActions
				loading={loading}
				isActive={isActive}
				setIsActive={setIsActive}
				handleSubmit={handleSubmit}
			/>
		</Container>
	);
}

const Container = styled.div`
	margin-bottom: 40px;
	display: flex;
	flex-direction: column;
	gap: 16px;
`;
