import {
	createContext,
	type Dispatch,
	type ReactNode,
	type SetStateAction,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { API_URL, TOKEN_NAME } from "../const";
import type { Member, UpdateMemberRequest, VerifyMemberResponseData } from "../types";

type MemberContextStateType = {
	member: Member | null;
};

type MemberContextDispatchType = {
	setMember: Dispatch<SetStateAction<MemberContextStateType["member"]>>;
	updateMember: (payload: UpdateMemberRequest) => void;
};

const MemberContext = createContext<MemberContextStateType | null>(null);
const MemberContextDispatch = createContext<MemberContextDispatchType | null>(null);

export default function MemberProvider({ children }: { children: ReactNode }) {
	const [member, setMember] = useState<MemberContextStateType["member"]>(null);
	const [loading, setLoading] = useState(false);

	const updateMember = useCallback((payload: UpdateMemberRequest) => {
		setMember((prev) => {
			if (!prev) {
				return null;
			}
			return {
				...prev,
				...payload,
			};
		});
	}, []);

	useEffect(() => {
		// 로그인 여부 확인
		const fetchUser = async () => {
			try {
				const token = localStorage.getItem(TOKEN_NAME);

				if (!token) {
					return;
				}

				setLoading(true);

				const response = await fetch(`${API_URL}/api/widget/members/verify`, {
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`,
						"ngrok-skip-browser-warning": "true",
					},
				});

				if (response.status === 401) {
					localStorage.removeItem(TOKEN_NAME);
				}

				if (!response.ok) {
					return;
				}

				const responseData = (await response.json()) as VerifyMemberResponseData;
				const member = responseData.member;

				// 이전에 비회원으로 로그인한 경우. 로컬 스토리지에서 내역 삭제
				if (!member?.loginPhone) {
					localStorage.removeItem(TOKEN_NAME);
					return;
				}

				setMember(responseData.member);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};
		fetchUser();
	}, []);

	const memoizedDispatch = useMemo(() => ({ setMember, updateMember }), [updateMember]);

	if (loading) {
		return null;
	}

	return (
		<MemberContextDispatch.Provider value={memoizedDispatch}>
			<MemberContext.Provider value={{ member }}>{children}</MemberContext.Provider>
		</MemberContextDispatch.Provider>
	);
}

export function useMemberContextState() {
	const context = useContext(MemberContext);
	if (!context) {
		throw new Error("useMemberContext must be used within a MemberProvider");
	}
	return context;
}

export function useMemberContextDispatch() {
	const context = useContext(MemberContextDispatch);
	if (!context) {
		throw new Error("useMemberContextDispatch must be used within a MemberProvider");
	}
	return context;
}
