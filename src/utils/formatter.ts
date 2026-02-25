import { seoulDayjs } from "../lib/dayjs";

export const Formatters = {
	currency: (value: number) => {
		return `${new Intl.NumberFormat("ko-KR").format(value)}원`;
	},
	number: (value: number) => {
		return new Intl.NumberFormat("ko-KR").format(value);
	},
	date: {
		simple: (value: Date | string) => {
			return seoulDayjs(value).format("YYYYMMDD");
		},
		hypen: (value: Date | string) => {
			return seoulDayjs(value).format("YYYY-MM-DD");
		},
		slash: (value: Date | string) => {
			return seoulDayjs(value).format("YYYY/MM/DD");
		},
		dot: (value: Date | string) => {
			return seoulDayjs(value).format("YYYY.MM.DD");
		},
		korYmd: (value: Date | string) => {
			return seoulDayjs(value).format("YYYY년 MM월 DD일");
		},
		korMMDD: (value: Date | string) => {
			return seoulDayjs(value).format("MM월 DD일");
		},
		korYmdHms: (value: Date | string) => {
			return seoulDayjs(value).format("YYYY년 MM월 DD일 HH시 mm분 ss초");
		},
		korYmdHm: (value: Date | string) => {
			return seoulDayjs(value).format("YYYY년 MM월 DD일 HH시 mm분");
		},
		yyyyMMddHHmm: (value: Date | string) => {
			return seoulDayjs(value).format("YYYY/MM/DD HH:mm");
		},
		yyyyMMddHHmmDot: (value: Date | string) => {
			return seoulDayjs(value).format("YYYY.MM.DD HH:mm");
		},
		tossPaymentsParam: (value: Date) => {
			return seoulDayjs(value).format("YYYY-MM-DDTHH:mm:ss");
		},
	},
	phone: {
		simple: (phone: string) => {
			return formatPhoneNumber(phone);
		},
		removeSpaces: (phone: string) => {
			return phone.replace(/\s/g, "");
		},
	},
};

const formatPhoneNumber = (phone: string) => {
	if (!phone) {
		return "";
	}
	const digits = phone.replace(/\D/g, "").slice(0, 11); // 숫자만, 최대 11자리 제한

	if (digits.length < 4) {
		return digits;
	} else if (digits.length < 8) {
		return `${digits.slice(0, 3)} ${digits.slice(3)}`; // 010 1~4자리
	} else {
		return `${digits.slice(0, 3)} ${digits.slice(3, 7)} ${digits.slice(7)}`; // 010 1234 5678
	}
};
