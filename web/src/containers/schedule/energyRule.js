import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router' 
import {
	Nav,
	Button,
	Glyphicon,
	Image,
	DropdownButton,
	MenuItem,
	ButtonToolbar,
	FormGroup,
	ControlLabel,
	FormControl,
	option,
	Form
} from 'react-bootstrap'



export default class AddEnergy extends Component {
	state = {
		result: { },
		room: '',
		description: '',
		maxenergy: ''
	}

	handleForm(e){
		e.preventDefault()
		// console.log(this.refs.eiei1.value)
		this.setState({ room: e.target.room.value })
		this.setState({ description: e.target.description.value })
		this.setState({ maxenergy: e.target.maxenergy.value })
		

		console.log("room: "+e.target.room.value);
		console.log("description: "+e.target.description.value);
		console.log("max energy: "+e.target.maxenergy.value);
		
		// console.log(e.target.input1.value)


		axios.post('http://localhost:9090/energyrule', {
			room: this.state.room,
			description: this.state.description,
			maxenergy: this.state.maxenergy
		  })
		  .then((res) => {
		    console.log(response);
		  })
		  .catch((error) => {
		    console.log(error);
		  });

		  
	}

	componentDidMount(){
		// console.log(this.props.params.id)
		// axios.get('http://localhost:9090/test').then((res) => {
		// 	console.log(res.data)
		// 	this.setState({ result: res.data })
			// console.log('test' + this.state.result)
			// this.state.result.map((data, index) => {
			// 	return ({
			// 	roomtest: data.timestemp,
			// 	destest: data.power_value
			// })
			// }
		// })
		
	}

	// (Object.keys(this.state.result).length != 0 ) && 

	render(){
		return(
			<div style={{ "margin": "20px 100px"}}>
				<h2>Add Energy Rule </h2>
				<div className='energyForm'>
				{
			 		<Form onSubmit={this.handleForm.bind(this)}>
					 		<ControlLabel>Room </ControlLabel> 
					 		<FormControl name='room' ref='refroom' placeholder="ex. 202"/>
					 		<br />
					 		<ControlLabel>Description </ControlLabel> 
					 		<FormControl name='description' ref='refdescription' placeholder="ex. closed"/>
					 		<br />
					 		<ControlLabel>Maximum Energy</ControlLabel> 
					 		<FormControl name='maxenergy' ref='refmaxenergy' placeholder="ex. 500"/>
					 		<br />
					 		<Button bsStyle="primary" type='submit'>Submit</Button> <Button bsStyle="danger" type='reset'>Reset</Button>
				 		</Form>
		 		}
		 		</div>
			</div>
		)
	}
}
