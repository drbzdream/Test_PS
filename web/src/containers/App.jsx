import React, { Component } from 'react'
import {
	Grid,
	Row,
	Col
} from 'react-bootstrap'
import socket from 'socket.io-client'
import {NotificationContainer, NotificationManager} from 'react-notifications'
import 'react-notifications/lib/notifications.css'

import Header from 'components/Header'
import Footer from 'components/Footer'
import 'components/Building.css'


export default class App extends Component {
	componentWillMount(){
        const io = socket('http://localhost:9090')
		io.on('noti', (response) => {
			// console.log('response S:' + response)
			NotificationManager.error(response.description, `Room: ${response.room}`)
		})

		io.on('noti2', (response) => {
			// console.log('response E:' + response)
			NotificationManager.warning(response.description, `Room: ${response.room}`)
		})
	}

	render(){
		return (
			<div className='app'>
				<Header />
				<Grid>
				<Row className="show-grid">
					<Col md={1} />
					<Col md={10}>{this.props.children}</Col>
					<Col md={1} />
				</Row>
				</Grid>
				<NotificationContainer/>
			</div>
		)
	}
}