import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Navigation from '../components/globally-applied/my-navbar';
import CarouselComponent from '../components/globally-applied/my-carousel';
import Infolink from '../components/globally-applied/contact-display';
import Footer from '../components/globally-applied/footer';
import Layout from '../components/layout/layout';
// import dynamic from 'next/dynamic';
import HomePage from './Home';
import QuotesEstimates from './Quotes';
import Services from './Services';
import Projects from './Projects';

// Mainsection content dynamic routing - ie lazy
// const HomePage = dynamic(() => import("./Home"));
// const QuoteEstimates = dynamic(() => import("./Quotes"));
// const Services = dynamic(() => import("./Services"));
// const Projects = dynamic(() => import("./Projects"));

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
				<Infolink />
				<Footer />
			</Layout>
		</>
	);
}