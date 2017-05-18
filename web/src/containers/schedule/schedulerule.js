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



class AddSchedule extends Component {
	state = {
		result: { },
		room: '',
		description: '',
		starttime: '',
		endtime: '',
		day: ''
	}

	handleForm(e){
		e.preventDefault()
		console.log("room: "+e.target.room.value);
		console.log("description: "+e.target.description.value);
		console.log("start time: "+e.target.starttime.value);
		console.log("end time: "+e.target.endtime.value);
		console.log("day: "+ e.target.day.value);
		// console.log(e.target.input1.value)


		axios.post('http://localhost:9090/schedule', {
			room: e.target.room.value,
			description: e.target.description.value,
			day: e.target.day.value,
			starttime: e.target.starttime.value,
			endtime: e.target.endtime.value
		  })
		  .then((res) => {
		    console.log(res)
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
				<h2>Add Schedule</h2>
				<div className='scheduleForm'>
				{
			 		<Form onSubmit={this.handleForm.bind(this)}>
					 		<ControlLabel>Room </ControlLabel> 
					 		<FormControl name='room' ref='refroom' placeholder="ex. 202"/>
					 		<br />
					 		<ControlLabel>Description </ControlLabel> 
					 		<FormControl name='description' ref='refdescription' placeholder="ex. closed"/>
					 		<br />
					 		<ControlLabel>Day </ControlLabel> 
					 		<FormControl name='day' ref='refday' placeholder="ex. Mon"/>
					 		<br />
					 		<ControlLabel>Start Time (24-hours)</ControlLabel> 
					 		<FormControl name='starttime' ref='refstarttime' placeholder="ex. 13.00"/>
					 		<br />
					 		<ControlLabel>End Time (24-hours)</ControlLabel> 
					 		<FormControl name='endtime' ref='refendtime' placeholder="ex. 16.00"/>
					 		<br />
					 		<Button bsStyle="primary" type='submit'>Submit</Button>
				 		</Form>
		 		}
		 		</div>
			</div>
		)
	}
}

export default connect(null, null)(AddSchedule)
