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



export default class AddUser extends Component {
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
		// console.log(this.refs.eiei1.value)
		this.setState({ room: e.target.room.value })
		this.setState({ description: e.target.description.value })
		this.setState({ starttime: e.target.starttime.value })
		this.setState({ endtime: e.target.endtime.value })
		this.setState({ day: e.target.day.value })

		console.log("room: "+e.target.room.value);
		console.log("description: "+e.target.description.value);
		console.log("start time: "+e.target.starttime.value);
		console.log("end time: "+e.target.endtime.value);
		console.log("day: "+ e.target.day.value);
		// console.log(e.target.input1.value)


		axios.post('http://localhost:9090/schedule', {
			room: this.state.room,
			description: this.state.description,
			day: this.state.day,
			starttime: this.state.starttime,
			endtime: this.state.endtime
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
		// axios.get(`http://localhost:9090/schedule/${this.props.params.id}`).then((res) => {
		// 	console.log(res.data)
		// 	this.setState({ result: res.data })
		// 	console.log('test' + this.state.result)
		// 	this.state.result.map((data, index) => {
		// 		return ({
		// 		roomtest: data.timestemp,
		// 		destest: data.power_value
		// 	})
		// 	}
		// })
		axios.get(`http://localhost:9090/schedule/${this.props.params.id}`).then((response) => {
		      console.log(response);
		      this.setState({ dataschedule: response.data})
		      //console.log(test);
		    })
		    .catch(function (error) {
		      console.log('error');
		      console.log(error);
		    });	
		
	}

	// (Object.keys(this.state.result).length != 0 ) && 

	render(){
		return(
			<div style={{ "margin": "20px 100px"}}>
				<h2>Add Schedule</h2>
				<div className='scheduleForm'>
				{
					(Object.keys(this.state.user).length != 0 ) && 
			 		<Form onSubmit={this.handleForm.bind(this)}>
					 		<ControlLabel>Room </ControlLabel> 
					 		<FormControl name='room' ref='refroom' placeholder="ex. 202"/>
					 		<br />
					 		<ControlLabel>Description </ControlLabel> 
					 		<FormControl name='description' ref='refdescription' placeholder="ex. closed"/>
					 		<br />
					 		<ControlLabel>Day </ControlLabel> 
					 		<FormControl name='day' ref='refday' placeholder="ex. monday"/>
					 		<br />
					 		<ControlLabel>Start Time </ControlLabel> 
					 		<FormControl name='starttime' ref='refstarttime' placeholder="ex. 13.00"/>
					 		<br />
					 		<ControlLabel>End Time </ControlLabel> 
					 		<FormControl name='endtime' ref='refendtime' placeholder="ex. 16.00"/>
					 		<br />
					 		<Button bsStyle="primary" type='submit'>Submit</Button> <Button bsStyle="danger" type='reset'>Reset</Button>
				 		</Form>
		 		}
		 		</div>
			</div>
		)
	}
}
