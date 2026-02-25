import type { MEMBER_CONCERN, MEMBER_GENDERS } from "../const";

export type Member = {
	id: number;
	loginPhone: string | null; // null => guest
	onboarding: boolean;
	height: number | null;
	weight: number | null;
	gender: (typeof MEMBER_GENDERS)[number]["value"] | null;
	concern: (typeof MEMBER_CONCERN)[number]["value"] | null;
	createdAt: string;
	agreementMarketing: boolean;
	agreementData: boolean;
};

export type VerifyMemberResponseData = {
	member: Member | null;
};

export type SignInMemberResponseData = {
	token: string;
	member: Member;
};

export type UpdateMemberRequest = {
	onboarding?: boolean;
	height?: number;
	weight?: number;
	gender?: (typeof MEMBER_GENDERS)[number]["value"];
	agreementData?: boolean;
};

export type RequestLoginCodeRequest = {
	phone: string;
};

export type SignInRequest = {
	phone: string;
	code: string;
};

export type SignInResponseData = SignInMemberResponseData;

export type SignUpRequest = {
	phone: string;
	code: string;
	agreements: string[];
};

export type SignUpResponseData = SignInResponseData;
