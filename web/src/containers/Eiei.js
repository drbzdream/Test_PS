import React, { Component } from 'react'
import axios from 'axios'
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

let x = 0
let z = [1, 2, 3]

export default class Eiei extends Component {

	state = {
		y: 0,
		input1: '',
		user: { }
	}

	handleTest(){
		this.setState({ y: this.state.y + 1})
		// x += 1
		console.log(x)
	}

	handleForm(e){
		e.preventDefault()
		// console.log(this.refs.eiei1.value)
		this.setState({ input1: e.target.input1.value })
		// console.log(e.target.input1.value)
		axios.post('http://localhost:9090/schedule', {
			room: this.state.input1,
			description: this.state.input1,
			day: this.state.input1,
			starttime: this.state.input1,
			endtime: this.state.input1
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
		axios.get(`https://jsonplaceholder.typicode.com/users/${this.props.params.id}`).then((res) => {
			// console.log(res.data)
			this.setState({ user: res.data })
			console.log('user ' + this.state.user.name)
		})

		// axios.post('/user', {
		//     firstName: 'Fred',
		//     lastName: 'Flintstone'
		//   })
		//   .then(function (response) {
		//     console.log(response);
		//   })
		//   .catch(function (error) {
		//     console.log(error);
		//   });
	}

	render(){
		// console.log(Object.keys(this.state.user))
		 return (
		 	<div style={{ "margin": "0px 100px"}}>
		 		<br />
		 		{
			 		(Object.keys(this.state.user).length != 0 ) && 
			 		<Form onSubmit={this.handleForm.bind(this)}>
				 		<ControlLabel>Room :</ControlLabel> 
				 		<FormControl name='input1' ref='eiei1' defaultValue={this.state.user.name}/>
				 		<br />
				 		<ControlLabel>Description : </ControlLabel> 
				 		<FormControl name='input2' ref='eiei2' defaultValue={this.state.user.email}/>
				 		<br />
				 		<ControlLabel>Start Time : </ControlLabel> 
				 		<FormControl name='input3' ref='eiei3' defaultValue={this.state.user.username}/>
				 		<br />
				 		<ControlLabel>End Time : </ControlLabel> 
				 		<FormControl name='input4' ref='eiei4' defaultValue={this.state.user.phone}/>
				 		<br />
				 		<ControlLabel>Day : </ControlLabel> 
				 		<FormControl name='input5' ref='eiei5' defaultValue={this.state.user.website}/>
				 		<br />
				 		<ControlLabel>Maximun Energy : </ControlLabel> 
				 		<FormControl name='input6' ref='eiei6' defaultValue={this.state.user.id}/>
				 		<br />
				 		<Button bsStyle="primary" type='submit'>Submit</Button> <Button bsStyle="danger" type='reset'>Reset</Button>
			 		</Form>
		 		}
		 		<h1>input1 : {this.state.input1}</h1>
		 		<h1>x = {x}</h1> 
		 		<h1>y = {this.state.y}</h1>
		 		<ul>
		 		{
		 			z.map((a, index) => {
		 				return <li key={index}>{a}</li>
		 			})
		 		}
		 		</ul>
		 		<br />
		 		<button onClick={() => this.handleTest()}>Click</button>
		 	</div>
		 )
	}
}
