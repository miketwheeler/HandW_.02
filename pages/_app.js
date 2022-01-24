import '../styles/globals.css';
import App from 'next/app';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';


function MyApp({ Component, pageProps }) {
  return(
		<div suppressHydrationWarning>
			<Head>
				<link rel="icon" href="/android-chrome-512x512.png" />
			</Head>
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
