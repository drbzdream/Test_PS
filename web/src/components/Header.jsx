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


// const eiei = (selectedKey) => {
// 	console.log(selectedKey)
// }

// const Header = () => {
//   return(
//   	<div>
// 		<Navbar className='navbar_title'>
// 			<Navbar.Header>
// 				<Navbar.Brand>
// 					<Link to='/'>
// 						<b> <Glyphicon glyph="leaf" /> APPLICATION</b>
// 					</Link>
// 				</Navbar.Brand>
// 			</Navbar.Header>
// 		    <Navbar.Collapse>
// 		      <Nav pullRight>
// 					<LinkContainer to='/about'>
// 						<NavItem eventKey={1}><b><Glyphicon glyph="bell" /></b></NavItem>
// 					</LinkContainer>
// 				<NavItem eventKey={2}><b><Glyphicon glyph="time" /></b></NavItem>
// 		        <NavItem eventKey={3}><b><Glyphicon glyph="cog" /></b></NavItem>
// 		      </Nav>
// 		    </Navbar.Collapse>
// 		</Navbar>

// 		<Nav className='navbar_navi' bsStyle="pills" justified activeKey={2} onSelect={eiei}>
//           <NavItem eventKey={1} href="/">Electric Energy</NavItem>
//           <NavItem eventKey={2} href="/infodevice">Electric Device</NavItem>
//           <NavItem eventKey={3} href="/schedule">Schedule</NavItem>
//         </Nav>
// 	</div>
//     )
// }

class Header extends Component {

	state = {
		a: 0
	}

	eiei = (selectedKey) => {
		this.setState({ a: selectedKey })
	}

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
							<LinkContainer to='/about'>
								<NavItem eventKey={1}><b><Glyphicon glyph="bell" /></b></NavItem>
							</LinkContainer>
						<NavItem eventKey={2}><b><Glyphicon glyph="time" /></b></NavItem>
				        <NavItem eventKey={3}><b><Glyphicon glyph="cog" /></b></NavItem>
				      </Nav>
				    </Navbar.Collapse>
				</Navbar>

				<Nav className='navbar_navi' bsStyle="pills" justified activeKey={this.state.a} onSelect={this.eiei.bind(this)}>
				<LinkContainer to='/'>
		          <NavItem eventKey={1}>Electric Energy</NavItem>
		        </LinkContainer>
				<LinkContainer to='/infodevice'>
		          <NavItem eventKey={2}>Electric Device</NavItem>
		        </LinkContainer>
				<LinkContainer to='/schedule'>
		          <NavItem eventKey={3}>Schedule</NavItem>
		        </LinkContainer>
		        </Nav>
			</div>
		)
	}
}



export default Header