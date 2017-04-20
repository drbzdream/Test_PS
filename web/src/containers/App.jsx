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


export default class App extends Component {
	componentWillMount(){
        const io = socket('http://localhost:9090')
		io.on('noti', (response) => {
			console.log(response)
			NotificationManager.error(response.description, `Room: ${response.room}`)
			// NotificationManager.info('หวัดดี', `โจ๋ซ่า 555+`)
		})
	}

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
				<NotificationContainer/>
			</div>
		)
	}
}