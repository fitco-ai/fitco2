// theme.ts
const color = {
	brand: {
		black: "#2c2c2c",
		orange: "#F29156",
	},
	default: {
		black: "#121212",
	},
	primary: {
		140: "#212529",
		120: "#343A40",
		100: "#495057",
		80: "#6C757D",
		60: "#ADB5BD",
		40: "#CED4DA",
		20: "#DEE2E6",
		10: "#E9ECEF",
		5: "#F8F9FA",
		0: "#FFFFFF",
	},
	accent: {
		140: "#565CE3",
		80: "#8E92EC",
		20: "#C7C9F6",
	},
	alarm: {
		140: "#EF6F6C",
		80: "#F49F9D",
		20: "#FACFCE",
	},
	success: {
		400: "#00C200",
	},
	golbat: {
		60: "#ADB5BD",
	},
};

const typography = {
	heading: {
		fontSize: 32,
		fontWeight: 300,
		lineHeight: 1.4,
		letterSpacing: "-0.01em",
	},
	body0: {
		fontSize: 18,
		fontWeight: 400,
		lineHeight: 1.5,
		letterSpacing: "-0.02em",
	},
	body1: {
		fontSize: 16,
		fontWeight: 400,
		lineHeight: 1.5,
		letterSpacing: "-0.03em",
	},
	body2: {
		fontSize: 14,
		fontWeight: 400,
		lineHeight: 1.5,
		letterSpacing: "-0.03em",
	},
	body3: {
		fontSize: 10,
		fontWeight: 400,
		lineHeight: 1.5,
		letterSpacing: 0,
	},
	title1: {
		fontSize: 20,
		fontWeight: 600,
		lineHeight: 1.4,
		letterSpacing: "-0.02em",
	},
	title2: {
		fontSize: 16,
		fontWeight: 600,
		lineHeight: 1.4,
		letterSpacing: "-0.02em",
	},
	title3: {
		fontSize: 14,
		fontWeight: 600,
		lineHeight: 1.4,
		letterSpacing: "-0.02em",
	},
};

export const theme = {
	color,
	typography,
};

export type Theme = typeof theme;

declare module "styled-components" {
	export interface DefaultTheme extends Theme {}
}
