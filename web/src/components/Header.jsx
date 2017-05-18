import React, { Component } from 'react'
import {
	Nav,
	Navbar,
	NavItem,
	Glyphicon,
} from 'react-bootstrap'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import 'components/Header.css'


class Header extends Component {

	state = {
		a: 0
	}

	eiei = (selectedKey) => {
		this.setState({ a: selectedKey })
	}

	// <NavItem eventKey={1}><b><Glyphicon glyph="bell" /></b></NavItem>
	// <NavItem eventKey={3}><b><Glyphicon glyph="cog" /></b></NavItem>

	render(){
		return (
		  	<div>
				<Navbar className='navbar_title'>
					<Navbar.Header>
						<Navbar.Brand>
							<Link to='/'>
								<b> <Glyphicon glyph="leaf" /> APPLICATION</b>
							</Link>
						</Navbar.Brand>
					</Navbar.Header>
				    <Navbar.Collapse>
				      <Nav pullRight>
						<NavItem eventKey={5}><b><Glyphicon glyph="cog" /></b></NavItem>
				      </Nav>
				    </Navbar.Collapse>
				</Navbar>

				<Nav className='navbar_navi' bsStyle="pills" justified activeKey={this.state.a} onSelect={this.eiei.bind(this)}>
				<LinkContainer to='/'>
		          <NavItem eventKey={1}>Energy Consumption</NavItem>
		        </LinkContainer>
		        <LinkContainer to='/infodevice'>
		          <NavItem eventKey={2}>Resource Consumption</NavItem>
		        </LinkContainer>
		        <LinkContainer to='/realtime-energy'>
		          <NavItem eventKey={3}>Realtime Energy Consumption</NavItem>
		        </LinkContainer>
				<LinkContainer to='/schedule'>
		          <NavItem eventKey={4}>Notification</NavItem>
		        </LinkContainer>
		        </Nav>
			</div>
		)
	}
}



export default Header