import HomePage from "./mainsections/home-main"
import QuotesEstimates from "./mainsetions/quotes-estimates"
import Services from "./mainsections/services"
import OurTeam from "./mainsections/our-team"

const routes = [
	{
		path: "/quotes-estimates",
		component: QuotesEstimates,
	},
	{
		path: "/services",
		component: Services,
	},
	{
		path: "/our-team",
		component: OurTeam,
	},
	{
		path: "/",
		component: HomePage,
	}
]

export default routes