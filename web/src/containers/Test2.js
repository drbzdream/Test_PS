import React, { Component } from 'react'
import firebase from 'firebase'

class Test2 extends Component {

	state = {
		x: {}
	}

	componentWillMount(){
		firebase.database().ref('test')
			.orderByChild("timestamp")
			.once('value')
			.then((snapshots) => {
				let result = []
				snapshots.forEach((snapshot) => {
					result.push(snapshot.val())
				})
				console.log(result)
				this.setState({ x: result })
			})
		// firebase.database().ref('test')
		// .on('value', (snapshots) => {
		// 	console.log(snapshots.val())
		// 	this.setState({x: snapshots.val()})
		// })
	}

	render(){
		return (
			<div>
				Hello
				<br />
				{JSON.stringify(this.state.x)}
			</div>
		)
	}
}

export default Test2