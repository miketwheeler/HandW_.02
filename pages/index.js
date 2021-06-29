import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Navigation from '../components/consistent_components/navbar'
import CarouselComponent from '../components/consistent_components/carouselcomponent'
// import Mainsection from '../components/mainsection'
import Infolink from '../components/consistent_components/infolink'
import Footer from '../components/consistent_components/footer'
import Layout from '../components/layout'
import MainsectionStyles from '../components/mainsection.module.css'

// Mainsection content for routing in
import HomePage from '../components/mainsections/home-main'
import QuoteEstimates from '../components/mainsections/quotes-estimates'
import Services from '../components/mainsections/services'
import OurTeam from '../components/mainsections/our-team'

export default function App(props) {
  return (
    // <Router>
	<>
		<Layout>
			<Navigation />
			<CarouselComponent />
			<div className={MainsectionStyles.objparams}>
				<Switch>
					<Route path="/quotes-estimates" component={QuoteEstimates}/>
					<Route path="/services" component={Services}/>
					<Route path="/our-team" component={OurTeam}/>
					<Route path="" component={HomePage}/>
				</Switch>
			</div>
			{/* <Mainsection /> */}
			<Infolink />
			<Footer />
		</Layout>
	</>
    // </Router>
  );
}
// this content was between Router component above
	//   <div>
    //     <ul>
    //       <li>
    //         <Link to="/">Home</Link>
    //       </li>
    //       <li>
    //         <Link to="/about">About</Link>
    //       </li>
    //     </ul>

    //     <Switch>
    //       <Route path="/about">
    //         <h2>About</h2>
    //       </Route>
    //       <Route path="/">
    //         <h2>Home</h2>
    //       </Route>
    //     </Switch>
    //   </div>