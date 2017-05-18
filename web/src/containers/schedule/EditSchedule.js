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



class EditSchedule extends Component {
	state = {
		result: { },
		room: '',
		description: '',
		starttime: '',
		endtime: '',
		day: '',
		dataschedule: []
	}

	handleForm(e){
		e.preventDefault()

		// console.log("room: "+e.target.room.value);
		// console.log("description: "+e.target.description.value);
		// console.log("start time: "+e.target.starttime.value);
		// console.log("end time: "+e.target.endtime.value);
		// console.log("day: "+ e.target.day.value);
		// console.log(e.target.input1.value)

		console.log("patchID: " + this.props.params.id)
		axios.patch(`http://localhost:9090/schedule/${this.props.params.id}`, {
			room: e.target.room.value ,
			description: e.target.description.value,
			day: e.target.day.value,
			starttime: e.target.starttime.value,
			endtime: e.target.endtime.value
		  })
		  .then((res) => {
		    // console.log(res);
		    this.props.dispatch(push(`/schedule`))
		  })
		  .catch((error) => {
		    console.log(error);
		  });
	}

	componentDidMount(){

		axios.get(`http://localhost:9090/schedule/${this.props.params.id}`).then((response) => {
		      // console.log(response);
		      this.setState({ dataschedule: response.data})
		      //console.log(test);
		    })
		    .catch(function (error) {
		      console.log('error');
		      console.log(error);
		    });		
	}

	render(){
		return(
			<div style={{ "margin": "20px 100px"}}>
				<h2>Edit Schedule</h2>
				<div className='scheduleForm'>
				{
					(Object.keys(this.state.dataschedule).length != 0 ) && 
			 		<Form onSubmit={this.handleForm.bind(this)}>
					 		<ControlLabel>Room </ControlLabel> 
					 		<FormControl name='room' ref='refroom' defaultValue={this.state.dataschedule.room}/>
					 		<br />
					 		<ControlLabel>Description </ControlLabel> 
					 		<FormControl name='description' ref='refdescription' defaultValue={this.state.dataschedule.description}/>
					 		<br />
					 		<ControlLabel>Day </ControlLabel> 
					 		<FormControl name='day' ref='refday' defaultValue={this.state.dataschedule.day}/>
					 		<br />
					 		<ControlLabel>Start Time (24-hours)</ControlLabel> 
					 		<FormControl name='starttime' ref='refstarttime' defaultValue={this.state.dataschedule.starttime}/>
					 		<br />
					 		<ControlLabel>End Time (24-hours)</ControlLabel> 
					 		<FormControl name='endtime' ref='refendtime' defaultValue={this.state.dataschedule.endtime}/>
					 		<br />
					 		<Button bsStyle="primary" type='submit'>Submit</Button>
				 		</Form>
		 		}
		 		</div>
			</div>
		)
	}
}

export default connect(null, null)(EditSchedule)
