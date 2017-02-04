import React, { Component } from 'react'
import {
	Grid,
	Row,
	Col
} from 'react-bootstrap'
import Header from 'components/Header'
import Footer from 'components/Footer'


export default class App extends Component {
	render(){
		return (
			<div>
				<Header />
				<Grid>
				<Row className="show-grid">
					<Col md={1} />
					<Col md={10}>{this.props.children}</Col>
					<Col md={1} />
				</Row>
				</Grid>

			</div>
		)
	}
}