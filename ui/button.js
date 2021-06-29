import Link from 'next/link'
import ButtonStyle from './button.module.css'


function Button(props) {
	if (props.link) {
		return (
			<Link href={props.link}>
				<a className={ButtonStyle.btn}>{props.children}</a>
			</Link>
		);
	}
	return (
		<button className={ButtonStyle.btn} onClick={props.onClick}>
			{props.children}
		</button>
	);
}

export default Button