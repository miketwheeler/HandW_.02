import { Fragment } from "react"
import LayoutStyle from './layout.module.css'

function Layout(props){

	return (
		<Fragment>
			<div className={LayoutStyle.wrapper}>
				<main>
					{props.children}
				</main>
			</div>
		</Fragment>
	)
}
export default Layout;