import { theme } from "./styles/theme";
import UIProvider from "./context/ui";
import ViewNavigator from "./components/view-navigator";
import { ThemeProvider } from "styled-components";
import MemberProvider from "./context/member";
import Cafe24DataProvider from "./context/cafe24-data";
import SizeResultProvider from "./context/size-result";
import OrderProvider from "./context/order";
import RecommendationHistoryProvider from "./context/recommendation";
import AnalyticsProvider from "./context/analytics";

export default function App() {
	return (
		<ThemeProvider theme={theme}>
			<Cafe24DataProvider>
				<AnalyticsProvider>
					<MemberProvider>
						<OrderProvider>
							<RecommendationHistoryProvider>
								<SizeResultProvider>
									<UIProvider>
										<ViewNavigator />
									</UIProvider>
								</SizeResultProvider>
							</RecommendationHistoryProvider>
						</OrderProvider>
					</MemberProvider>
				</AnalyticsProvider>
			</Cafe24DataProvider>
		</ThemeProvider>
	);
}
