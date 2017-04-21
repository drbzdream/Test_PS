// import React, {Component} from 'react'
// import { Link } from 'react-router'
// import {
// 	Button,
// 	Image,
// 	Glyphicon,
// 	DropdownButton,
// 	MenuItem,
// 	ButtonToolbar,
// 	FormGroup,
// 	ControlLabel,
// 	FormControl,
// 	option
// } from 'react-bootstrap'
// import {
// 	testpic
// } from 'assets/images'
// import 'components/EachBuilding.css'
// import 'components/Room.css'

// class Room extends Component {
// 	render(){
// 		return(
// 			<div className='show_room'>
// 			<br />
				
// 				<div className='each_room-detail'>

				
// 				<br />
// 				<br />
// 				</div>

// 				<div className='room_status'>
// 					<div>
// 						<h3>OVERALL DEVICE</h3>
// 					</div>
// 					<div>
// 						<h3>AMOUNT : <span>1 Device</span></h3>
// 					</div>
					
// 				</div>

// 				<div className='device_status'>
// 					<div>
// 						<h3>My Computer</h3>
// 					</div>
// 					<div>
// 						<h3>Status : Normal</h3>
// 					</div>
					
// 				</div>
// 				<div className='detail_floor'>
// 					<p>NAME Titivorada's macbook</p>
// 					<div className='chart_overview'>
// 						<Image src={testpic} />
// 					</div>
// 					<div className='detail_overview'>
// 						<br />
// 						<h4>DATE : <span>10 Feb 2017</span></h4>
// 						<h4>PERFORMANCE : 99% </h4>
// 						<h4>BUILDING : <span>15</span> , FLOOR : <span>7</span> , ROOM : <span>710</span></h4> 
// 						<h4>DESCRIPTION : -</h4>
// 						<Link to=''>
// 							<Button bsStyle="info">Edit</Button>
// 						</Link>
// 					</div>
				
					
// 				</div>


				
// 			</div>
// 			)
// 	}
// }

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
	Bar
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
	option
} from 'react-bootstrap'
import 'components/Building.css'
import {
	testpic
} from 'assets/images'
import moment from 'moment'



const { dataAction } = actions

let tmp_dreal = []


const data = [
      {name: 'Room 202', Energy: 4644.77, pv: 2400, amt: 2400},
      {name: 'Room 203', Energy: 4667.89, pv: 1398, amt: 2210},
]

const datatime = [
      {name: '7.00 am', Floor1: 4000, Floor2: 2400, Floor3: 7000, amt: 2400},
      {name: '8.00 am', Floor1: 3000, Floor2: 1398, Floor3: 6400, amt: 2210},
      {name: '9.00 am', Floor1: 2000, Floor2: 9800, Floor3: 5300, amt: 2290},
      {name: '10.00 am', Floor1: 2780, Floor2: 3908, Floor3: 4500, amt: 2000},
      {name: '11.00 am', Floor1: 1890, Floor2: 4800, Floor3: 5700, amt: 2181},
      {name: '12.00 pm', Floor1: 2390, Floor2: 3800, Floor3: 6100, amt: 2500},
      {name: '01.00 pm', Floor1: 3490, Floor2: 4300, Floor3: 7000, amt: 2100},
]

const datatime2 = [
      {name: '7.00 am', Energy: 4000, pv: 2400, amt: 2400},
      {name: '8.00 am', Energy: 3000, pv: 1398, amt: 2210},
      {name: '9.00 am', Energy: 2000, pv: 9800, amt: 2290},
      {name: '10.00 am', Energy: 2780, pv: 3908, amt: 2000},
      {name: '11.00 am', Energy: 1890, pv: 4800, amt: 2181},
      {name: '12.00 pm', Energy: 2390, pv: 3800, amt: 2500},
      {name: '01.00 pm', Energy: 3490, pv: 4300, amt: 2100},
]

const data01 = [{name: 'Room 202', value: 18411.403803}, {name: 'Room 203', value: 18503.049171}]

const data02 = [{name: 'Room 202', value: 18411.403803}, {name: 'Room 203', value: 18503.049171}]

var timefromserver


class Room extends Component {

	state = {
		energy_realtime: [],
		power_realtime: [],
		time_server: 0,
		count: 0
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

		// io.on('time_server', (response) => {
		// 	this.setState({ time_server: response})
		// 	timefromserver = moment(response)
		// 	// console.log('time_server(no moment): ' + response)
		// 	console.log("time_server: " + timefromserver)
		// 	// dispatch(requestSuccess(response))
		// })

		// io.on('count', (response) => {
		// 	this.setState({ count: response})
		// 	// console.log('time_server(no moment): ' + response)
		// 	console.log("count: " + response)
		// 	// dispatch(requestSuccess(response))
		// })
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
	}

	// shouldComponentUpdate(nextProps, nextState){
	// 	return nextState.enegy_realtime != this.state.energy_realtime
	// }

	render(){
		//time
		// var web_time = moment()
		// var web_time_tmp = new Date()
		// console.log("time_web: " + web_time)
		// console.log('time_server(no moment): ' + web_time_tmp)

		// let timeDiff_web_server = moment.duration(web_time - timefromserver, 'milliseconds')
		// console.log('Different: ' + timeDiff_web_server)


		let droom = [], dlight = [], dtem = [], dreal = [], drealpower = [] 

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


		dreal = this.state.energy_realtime.map((data) => {
			return ({
				name: moment(data.timestemp).format("hh:mm:ss"),
				power: data.energy_value
			})
		})

		drealpower = this.state.power_realtime.map((data) => {
			return ({
				name: data.timestemp,
				current: data.power_value
			})
		})

		return (
			<div className='show_overview'>

				

			
			      
			      <h3>Resource Consumption</h3>

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
				        <option value="29">29</option>
				        <option value="30">30</option>
				        <option value="31">31</option>

				      </FormControl>
				    </FormGroup>
				    

				    <Button bsStyle="danger" type='submit'>Submit</Button>
				    </ButtonToolbar>
			    </form>


			      	<div className="conp_chart">
			        <AreaChart width={600} height={200} data={droom} syncId="anyId"
			              margin={{top: 10, right: 30, left: 0, bottom: 0}}>
			          <XAxis dataKey="name"/>
			          <YAxis/>
			          <CartesianGrid strokeDasharray="3 3"/>
			          <Tooltip/>
			          <Area isAnimationActive={false} type='monotone' dataKey='Energy' stroke='#eea236' fill='#f0ad4e' activeDot={{r: 6}}/>
			        </AreaChart>
			        <p className="name_chart">Energy(kWh)</p>

			        <LineChart width={600} height={200} data={dlight} syncId="anyId"
			              margin={{top: 10, right: 30, left: 0, bottom: 0}}>
			          <XAxis dataKey="name"/>
			          <YAxis/>
			          <CartesianGrid strokeDasharray="3 3"/>
			          <Tooltip/>
			          <Line isAnimationActive={false} type='monotone' dataKey='Light' stroke='#d9534f' activeDot={{r: 6}}/>
			        </LineChart>
			        <p className="name_chart">Light(Lux)</p>

			        <LineChart width={600} height={200} data={dtem} syncId="anyId"
			              margin={{top: 10, right: 30, left: 0, bottom: 0}}>
			          <XAxis dataKey="name"/>
			          <YAxis/>
			          <CartesianGrid strokeDasharray="3 3"/>
			          <Tooltip/>
			          <Line isAnimationActive={false} type='monotone' dataKey='Temperature' stroke='#5bc0de' activeDot={{r: 6}}/>
			        </LineChart>
			        <p className="name_chart">Temperature(C)</p>
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



// export default Room




