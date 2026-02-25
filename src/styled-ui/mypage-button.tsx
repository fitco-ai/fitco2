import { useUIContextDispatch } from "../context/ui";
import { UserIcon } from "../svgs";
import { ResetButton } from "./reset-components";
import { useMemberContextState } from "../context/member";

export default function MyPageButton() {
	const { pushView } = useUIContextDispatch();
	const { member } = useMemberContextState();

	const handleClick = () => {
		if (!member?.loginPhone) {
			pushView("sign-up");
		} else {
			pushView("mypage");
		}
	};

	return (
		<ResetButton onClick={handleClick}>
			<UserIcon style={{ width: 24, height: 24 }} />
		</ResetButton>
	);
}
