import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Navigation from '../components/MyNavbar';
import CarouselComponent from '../components/MyCarousel';
import Layout from '../styles/layout/layout';
import HomePage from './Home';
import QuotesEstimates from './Quotes';
import Services from './Services';
import Projects from './Projects';
import Footer from '../components/Footer';
import InfoLink from '../components/InfoLink';



export default function App() {
	return (
		<>
			<Layout>
				<Navigation />
				<CarouselComponent />
					<Switch>
						<Route path="/quotes-estimates" component={QuotesEstimates}/>
						<Route path="/services" component={Services}/>
						<Route path="/projects" component={Projects}/>
						<Route path="/" component={HomePage}/>
					</Switch>
				<InfoLink />
				<Footer />
			</Layout>
		</>
	);
}