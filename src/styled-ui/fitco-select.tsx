import Select from "react-dropdown-select";
import { theme } from "../styles/theme";

export default function FitcoSelect({
	options,
	onChange,
	disabled = false,
	value,
}: {
	options: { label: string; value: string }[];
	onChange: (value: string) => void;
	disabled?: boolean;
	value?: { label: string; value: string };
}) {
	return (
		<Select
			values={value ? [value] : []}
			options={options}
			onChange={(values) => {
				const value = values?.[0]?.value;
				if (value) {
					onChange(value);
				}
			}}
			placeholder="선택"
			searchable={false}
			disabled={disabled}
			style={{
				width: "100%",
				padding: "0px 16px",
				marginLeft: 2,
				border: "none",
				height: "56px",
				color: theme.color.primary[140],
				borderRadius: "16px",
				boxShadow: "none",
				fontSize: "16px",
				background: theme.color.primary[5],
				outline: "none",
				WebkitTapHighlightColor: "transparent",
			}}
		/>
	);
}
