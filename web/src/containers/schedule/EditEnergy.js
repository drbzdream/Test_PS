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



class EditEnergy extends Component {
	state = {
		result: { },
		result: { },
		room: '',
		description: '',
		maxenergy: '',
		dataenergy: []
	}

	handleForm(e){
		e.preventDefault()
		// console.log(this.refs.eiei1.value)
		// this.setState({ room: e.target.room.value })
		// this.setState({ description: e.target.description.value })
		// this.setState({ maxenergy: e.target.maxenergy.value })
		

		console.log("room: "+e.target.room.value);
		console.log("description: "+e.target.description.value);
		console.log("max energy: "+e.target.maxenergy.value);
		
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
		axios.get(`http://localhost:9090/energyrule/${this.props.params.id}`).then((response) => {
		      console.log(response);
		      this.setState({ dataenergy: response.data})
		      console.log(test);
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
					 		<ControlLabel>Maximum Energy</ControlLabel> 
					 		<FormControl name='maxenergy' ref='refmaxenergy' defaultValue={this.state.dataenergy.maxenergy}/>
					 		<br />
					 		<Button bsStyle="primary" type='submit'>Submit</Button> <Button bsStyle="danger" type='reset'>Reset</Button>
				 		</Form>
		 		}
		 		</div>
			</div>
		)
	}
}

export default connect(null, null)(EditEnergy)
