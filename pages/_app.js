import '../styles/globals.css'
import App from 'next/app'
// import Layout from '../components/layout'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


function MyApp({ Component, pageProps }) {
  return(
	  
			<div suppressHydrationWarning>
				{ 
					typeof window === 'undefined' ? null : 
					<Router>
						<Component {...pageProps} />
					</Router>
				}
			</div>
	)
}
MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps }
}

export default MyApp
