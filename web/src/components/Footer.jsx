import React from 'react'
import {
	Nav,
	Navbar,
	NavItem
} from 'react-bootstrap'
import 'components/Footer.css'
import {
	logoReact,
	logoRedux,
	logoReactBoot,
	logoWebpack
} from 'assets/images'

const listLogo = [logoReact, logoRedux, logoReactBoot, logoWebpack]

const Footer = () => {
	return (
		<div className='footer'>
			<strong>Development By</strong>
			<br />
			{	
				listLogo.map(logo => <img className="logoDev" src={logo} key={logo} />)				
			}
		</div>
	)
}

export default Footer