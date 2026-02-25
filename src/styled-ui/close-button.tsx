import { useMemberContextState } from "../context/member";
import { useUIContextDispatch } from "../context/ui";
import { useCloseWidget } from "../hooks/useCloseWidget";
import { XIcon } from "../svgs";
import { ResetButton } from "./reset-components";

export default function CloseButton() {
	const { setViews } = useUIContextDispatch();
	const closeWidget = useCloseWidget();
	const { member } = useMemberContextState();

	const isGuest = !member?.loginPhone;

	const handleClick = () => {
		if (isGuest) {
			setViews(["promote-member"]);
		} else {
			closeWidget();
		}
	};

	return (
		<ResetButton onClick={handleClick}>
			<XIcon style={{ width: 24, height: 24 }} />
		</ResetButton>
	);
}
