import '../styles/globals.css';
import App from 'next/app';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


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

export default MyApp;
