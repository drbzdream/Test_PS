import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router' 
import _ from 'lodash'
import {
	LineChart, 
	Line, 
	XAxis, 
	YAxis, 
	CartesianGrid, 
	Tooltip, 
	Legend,
	PieChart,
	Pie,
	AreaChart, 
	Area,
	BarChart, 
	Bar,
	Brush
} from 'recharts'
import socket from 'socket.io-client'
import actions from 'actions'
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
	Table
} from 'react-bootstrap'
import 'components/Building.css'
import {
	testpic
} from 'assets/images'
import moment from 'moment'
import axios from 'axios'



const { dataAction } = actions

let tmp_dreal = []


class Room extends Component {

	state = {
		energy_realtime: [],
		power_realtime: [],
		summary: []
	}

	componentWillMount(){
		this.props.dataAction()
        const io = socket('http://localhost:9090')
		io.on('energy_realtime', (response) => {
			// console.log('aaaaaaaaaaaa', response)
			this.setState({ energy_realtime: response})
			// dispatch(requestSuccess(response))
		})

		io.on('power_realtime', (response) => {
			// console.log('bbbbbbbbbb', response)

			this.setState({ power_realtime: response})
			// dispatch(requestSuccess(response))
		})

		axios.get(`http://localhost:9090/summaryroom?day=2015-02-28&room=202`).then((res) => {
			// console.log('showenergy')
			this.setState({summary: res.data})
			console.log(this.state.summary)

		}).catch(function (error) {
	  		console.log('error');
	  		console.log(error);
		})


	}


	componentDidMount(){
	    
	  }

	eiei(){
		this.setState({x: this.state.x +1})
	}

	eiei2(e){
		let { mouth, day, room } = this.refs.form_filter
		e.preventDefault()
		console.log(this.refs.form_filter.mouth.value)
		let x = `2015-${mouth.value}-${day.value}`
		this.props.dataAction(room.value, x)
		console.log('date: ' + x)
		console.log('room: ' + room.value)

		axios.get(`http://localhost:9090/summaryroom?day=${x}&room=${room.value}`).then((res) => {
			// console.log('showenergy')
			// console.log(res.data)
				this.setState({summary: res.data})
				console.log(this.state.summary)
			}).catch(function (error) {
		  		console.log('error');
		  		console.log(error);
			})

	}

	render(){

		let droom = [], dlight = [], dtem = []

		let { room, light, temperature } = this.props.power_resources.data

		delete room.id
		delete room.room
		delete room.day
		delete room.created_at
		delete room.updated_at

		delete light.id
		delete light.room
		delete light.day
		delete light.created_at
		delete light.updated_at

		delete temperature.id
		delete temperature.room
		delete temperature.day
		delete temperature.created_at
		delete temperature.updated_at


		droom = _.map(room, (data, key) => {
			return ({
				name: key,
				Energy: data
			})
		})

		dlight = _.map(light, (data, key) => {
			return {
				name: key,
				Light: data
			}
		})

		dtem = _.map(temperature, (data, key) => {
			return {
				name: key,
				Temperature: data
			}
		})

		return (
			<div className='show_overview'>		      
			      <h1>Resource Consumption</h1>

			      <form onSubmit={this.eiei2.bind(this)} className="filter" ref='form_filter'>
				    <ButtonToolbar>
				    <p className="p_button"> Filter By : </p>
				      

				      <FormGroup controlId="formControlsSelect">
				      
				      <FormControl name='room' componentClass="select" placeholder="select" ref='room'>
				        <option value="select">Room</option>
				        <option value="202">Room 202</option>
				        <option value="203">Room 203</option>
				      </FormControl>
				    </FormGroup>

				      <p className="p_button"> Mouth</p>
				     <FormGroup name='mouth' controlId="formControlsSelect">
				      
				      <FormControl name='mouth' componentClass="select" placeholder="select" ref='mouth'>
				        <option value="select">Mouth</option>
				        <option value="01">January</option>
				        <option value="02">Febuary</option>
				      </FormControl>
				    </FormGroup>
				    <p className="p_button"> Day</p>
				      <FormGroup controlId="formControlsSelect">
				      
				      <FormControl name='day' componentClass="select" placeholder="select" ref='day'>
				        <option value="select">Day</option>
				        <option value="01">1</option>
				        <option value="02">2</option>
				        <option value="03">3</option>
				        <option value="04">4</option>
				        <option value="05">5</option>
				        <option value="06">6</option>
				        <option value="07">7</option>
				        <option value="08">8</option>
				        <option value="09">9</option>
				        <option value="10">10</option>
				        <option value="11">11</option>
				        <option value="12">12</option>
				        <option value="13">13</option>
				        <option value="14">14</option>
				        <option value="15">15</option>
				        <option value="16">16</option>
				        <option value="17">17</option>
				        <option value="18">18</option>
				        <option value="19">17</option>
				        <option value="20">20</option>
				        <option value="21">21</option>
				        <option value="22">22</option>
				        <option value="23">23</option>
				        <option value="24">24</option>
				        <option value="25">25</option>
				        <option value="26">26</option>
				        <option value="27">27</option>
				        <option value="28">28</option>
				      </FormControl>
				    </FormGroup>
				    

				    <Button bsStyle="danger" type='submit'>Submit</Button>
				    </ButtonToolbar>
			    </form>


			    <div className="conp_chart">

			    	<div  className='detailsummary'>
			       		<h3>Summary</h3>
			       		<Table striped condensed hover>
				          <thead>
				            <tr>
				              <th>Room</th>
				              <th>Electricity Cost</th>
				              <th>Average</th>
				              <th>Total</th>
				            </tr>
				          </thead>
				          <tbody>
				            {
			                  <tr>
			                    <td>{this.state.summary.name}</td>
			                    <td>{this.state.summary.value} Baht</td>
			                    <td>{this.state.summary.avr} kWh</td>
			                    <td>{this.state.summary.total} kWh</td>
			                  </tr>
				            }
				          </tbody>
				        </Table>
				 	</div>
				 	<h3>Energy (kWh)</h3>
			        <BarChart width={600} height={270} data={droom} syncId="anyId"
			              margin={{top: 10, right: 30, left: 0, bottom: 0}}>
			          <XAxis dataKey="name"/>
			          <YAxis/>
			          <CartesianGrid strokeDasharray="2 2"/>
			          <Legend verticalAlign="top" height={36} align='right'/>
			          <Tooltip/>
			          <Bar isAnimationActive={false} type='monotone' dataKey='Energy' stroke=' #FFCB18' fill=' #FFCB18' activeDot={{r: 6}}/>
			        </BarChart>
			        <p className="name_chart">Time (hours)</p>
			        <br />
			        <br />

			        <h3>Light (Lux)</h3>
			        <LineChart width={600} height={240} data={dlight} syncId="anyId"
			              margin={{top: 10, right: 30, left: 0, bottom: 0}}>
			          <XAxis dataKey="name"/>
			          <YAxis/>
			          <CartesianGrid strokeDasharray="2 2"/>
			          <Legend verticalAlign="top" height={36} align='right'/>
			          <Tooltip/>
			          <Line isAnimationActive={false} type='monotone' dataKey='Light' stroke=' #29A2C6' activeDot={{r: 6}}/>
			        </LineChart>
			        <p className="name_chart">Time (hours)</p>
			        <br />
			        <br />

			        <h3>Temperature (C)</h3>
			        <LineChart width={600} height={240} data={dtem} syncId="anyId"
			              margin={{top: 10, right: 30, left: 0, bottom: 0}}>
			          <XAxis dataKey="name"/>
			          <YAxis/>
			          <CartesianGrid strokeDasharray="2 2"/>
			          <Legend verticalAlign="top" height={36} align='right'/>
			          <Tooltip/>
			          <Line isAnimationActive={false} type='monotone' dataKey='Temperature' stroke='#EF597B' activeDot={{r: 6}}/>
			        </LineChart>
			        <p className="name_chart">Time (hours)</p>

			    </div>


			    
			</div>
		)
	}
}

const mapStateToProps = (state) => ({ //เอา state จาก store มาใส่ product
	power_resources: state.power_resources
})

const mapDispatchToProps = (dispatch) => ({ // เพื่อให้ส่งค่าให้ reducer แล้วจะได้เก็บค่าลงใน store 
	dataAction(room, day){
		// console.log(room, day)
		dispatch(dataAction(room, day))
	}
})

Room = connect(
	mapStateToProps,
	mapDispatchToProps
)(Room)

export default Room




