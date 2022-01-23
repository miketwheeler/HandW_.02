import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Navigation from '../components/globally-applied/my-navbar';
import CarouselComponent from '../components/globally-applied/my-carousel';
import Infolink from '../components/globally-applied/contact-display';
import Footer from '../components/globally-applied/footer';
import Layout from '../components/layout/layout';

// Mainsection content for routing in
import HomePage from '../components/body-section/home-page';
import QuoteEstimates from '../components/body-section/quotes-estimates-page';
import Services from '../components/body-section/services-page';
import Projects from '../components/body-section/projects-page';

export default function App(props) {
  return (
	<>
		<Layout>
			<Navigation />
			<CarouselComponent />
			<div style={{backgroundColor: 'rgb(255, 255, 255)'}}>
				<Switch>
					<Route path="/quotes-estimates" component={QuoteEstimates}/>
					<Route path="/services" component={Services}/>
					<Route path="/projects" component={Projects}/>
					<Route path="" component={HomePage}/>
				</Switch>
			</div>
			<Infolink />
			<Footer />
		</Layout>
	</>
  );
}