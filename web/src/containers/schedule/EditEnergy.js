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

class EditEnergy extends Component {
	state = {
		result: { },
		result: { },
		room: '',
		description: '',
		maxenergy: '',
		dataenergy: [],
		energycost: 0
	}

	handleForm(e){
		e.preventDefault()		

		console.log("room: "+e.target.room.value);
		console.log("description: "+e.target.description.value);
		console.log("max energy: "+ e.target.maxenergy.value);
		// console.log(e.target.input1.value)

		console.log("patchID: " + this.props.params.id)
		axios.patch(`http://localhost:9090/energyrule/${this.props.params.id}`, {
			// room: e.target.room.value,
			description: e.target.description.value,
			maxenergy: e.target.maxenergy.value
		  })
		  .then((res) => {
		  	this.props.dispatch(push(`/schedule`))
		    console.log(res);
		  })
		  .catch((error) => {
		    console.log(error);
		  });
	}

	componentDidMount(){
		axios.get(`http://localhost:9090/energyrule/${this.props.params.id}`).then((response) => {
		      // console.log(response);
		      this.setState({ dataenergy: response.data})
		      // console.log(this.state.dataenergy.maxenergy)
		      // console.log(this.state.dataenergy.maxenergy * elec_cost )
		    })
		    .catch(function (error) {
		      console.log('error');
		      console.log(error);
		    });		
	}

	render(){
		return(
			<div style={{ "margin": "20px 100px"}}>
				<h2>Edit Energy Rule</h2>
				<div className='scheduleForm'>
				{
					(Object.keys(this.state.dataenergy).length != 0 ) && 
			 		<Form onSubmit={this.handleForm.bind(this)}>
					 		<ControlLabel>Room </ControlLabel> 
					 		<FormControl readOnly name='room' ref='refroom' defaultValue={this.state.dataenergy.room}/>
					 		<br />
					 		<ControlLabel>Description </ControlLabel> 
					 		<FormControl name='description' ref='refdescription' defaultValue={this.state.dataenergy.description}/>
					 		<br />
					 		<ControlLabel>Maximum Electric Unit</ControlLabel> 
					 		<FormControl name='maxenergy' ref='refmaxenergy' defaultValue={this.state.dataenergy.maxenergy}/>
					 		<br />
					 		<Button bsStyle="primary" type='submit'>Submit</Button>
				 		</Form>
		 		}
		 		</div>
			</div>
		)
	}
}

export default connect(null, null)(EditEnergy)
