import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Navigation from '../components/globally-applied/my-navbar';
import CarouselComponent from '../components/globally-applied/my-carousel';
import Infolink from '../components/globally-applied/contact-display';
import Footer from '../components/globally-applied/footer';
import Layout from '../components/layout/layout';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

// Mainsection content for routing in
import HomePage from './Home';
import QuoteEstimates from './Quotes';
import Services from './Services';
import Projects from './Projects';

export default function App(props) {
	return (
		<>
			<GoogleReCaptchaProvider reCaptchaKey='6LedbD0eAAAAALJBXE96TQcxHc3tWlnYaxcBPv8D'>
			<Layout>
				<Navigation />
				<CarouselComponent />
				<div style={{backgroundColor: 'rgb(255, 255, 255)'}}>
					<Switch>
						<Route path="/quotes-estimates" component={QuoteEstimates}/>
						<Route path="/services" component={Services}/>
						<Route path="/projects" component={Projects}/>
						<Route path="/" component={HomePage}/>
					</Switch>
				</div>
				<Infolink />
				<Footer />
			</Layout>
			</GoogleReCaptchaProvider>
		</>
	);
}