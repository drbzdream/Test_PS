import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
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


const elec_cost = 4.4217


class AddEnergy extends Component {
	state = {
		result: { },
		room: '',
		description: '',
		maxenergy: ''
	}

	handleForm(e){
		e.preventDefault()
		// console.log(this.refs.eiei1.value)

		// console.log("room: "+e.target.room.value);
		// console.log("description: "+e.target.description.value);
		// console.log("max energy: "+e.target.maxenergy.value/elec_cost);
		
		// console.log(e.target.input1.value)


		axios.post('http://localhost:9090/energyrule', {
			room: e.target.room.value,
			description: e.target.description.value,
			init_energy: 0,
			maxenergy: e.target.maxenergy.value,
			percent_use: 0
		  })
		  .then((res) => {
		    console.log(res);
		    this.props.dispatch(push(`/schedule`))
		  })
		  .catch((error) => {
		    console.log(error);
		  });

		  
	}

	componentDidMount(){
	}

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
					 		<ControlLabel>Maximum Electric Unit</ControlLabel> 
					 		<FormControl name='maxenergy' ref='refmaxenergy' placeholder="ex. 500"/>
					 		<br />
					 		<Button bsStyle="primary" type='submit'>Submit</Button>
				 		</Form>
		 		}
		 		</div>
			</div>
		)
	}
}

export default connect(null, null)(AddEnergy)
