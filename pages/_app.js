import '../styles/globals.css';
import App from 'next/app';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';


function MyApp({ Component, pageProps }) {
  return(
		<div suppressHydrationWarning>
			<Head>
				<title>H&W Stair and Rail</title>
				<link rel="icon" href="/android-chrome-512x512.png" />
				<meta name="description" content="H&W Stair and Rail llc, lincoln nebraska" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta name="theme-color" />
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
