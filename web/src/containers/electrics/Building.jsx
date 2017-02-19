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



const { dataAction } = actions

let tmp_dreal = []


const data = [
      {name: 'Room 202', Energy: 7000, pv: 2400, amt: 2400},
      {name: 'Room 203', Energy: 3000, pv: 1398, amt: 2210},
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

const data01 = [{name: 'Room 202', value: 400}, {name: 'Room 203', value: 300}]

const data02 = [{name: 'Room 202', value: 400},
                    {name: 'Room 203', value: 300}]

class Building extends Component {

	state = {
		power_realtime: []
	}

	componentWillMount(){
		this.props.dataAction()
        const io = socket('http://localhost:9090')
		io.on('power_realtime', (response) => {
			this.setState({ power_realtime: response})
			// dispatch(requestSuccess(response))
		})
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

	shouldComponentUpdate(nextProps, nextState){
		return nextState.power_realtime != this.state.power_realtime
	}

	render(){
		let droom = [], dlight = [], dtem = [], dreal = []

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

		dreal = this.state.power_realtime.map((data) => {
			return ({
				name: data.timestemp,
				Power: data.power_value
			})
		})
		// const datatime2 = [
		//       {name: '7.00 am', Energy: 4000, pv: 2400, amt: 2400},
		//       {name: '8.00 am', Energy: 3000, pv: 1398, amt: 2210},
		//       {name: '9.00 am', Energy: 2000, pv: 9800, amt: 2290},
		//       {name: '10.00 am', Energy: 2780, pv: 3908, amt: 2000},
		//       {name: '11.00 am', Energy: 1890, pv: 4800, amt: 2181},
		//       {name: '12.00 pm', Energy: 2390, pv: 3800, amt: 2500},
		//       {name: '01.00 pm', Energy: 3490, pv: 4300, amt: 2100},
		// ]

		return (
			<div className='show_overview'>

				

			    	<h2>Overall Data</h2> 

						<p className="title_echarge">Electricity Charge (Baht)</p>
					<PieChart width={400} height={400} >
	        			<Pie data={data02} cx={200} cy={200} innerRadius={90} outerRadius={140} fill="#d9534f" label/>
	        			<Tooltip/>
	       			</PieChart>

	       		<div className="total_chart">
	       			<BarChart width={550} height={250} data={data}
				            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
				       <XAxis dataKey="name"/>
				       <YAxis/>
				       <CartesianGrid strokeDasharray="3 3"/>
				       <Tooltip/>
				       <Legend />
				       <Bar dataKey="Energy" fill="#5bc0de" />
				     </BarChart>

       			</div>

			
			      
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
			          <Area type='monotone' dataKey='Energy' stroke='#eea236' fill='#f0ad4e' activeDot={{r: 6}}/>
			        </AreaChart>
			        <p className="name_chart">Energy</p>

			        <LineChart width={600} height={200} data={dlight} syncId="anyId"
			              margin={{top: 10, right: 30, left: 0, bottom: 0}}>
			          <XAxis dataKey="name"/>
			          <YAxis/>
			          <CartesianGrid strokeDasharray="3 3"/>
			          <Tooltip/>
			          <Line type='monotone' dataKey='Light' stroke='#d9534f' activeDot={{r: 6}}/>
			        </LineChart>
			        <p className="name_chart">Light</p>

			        <LineChart width={600} height={200} data={dtem} syncId="anyId"
			              margin={{top: 10, right: 30, left: 0, bottom: 0}}>
			          <XAxis dataKey="name"/>
			          <YAxis/>
			          <CartesianGrid strokeDasharray="3 3"/>
			          <Tooltip/>
			          <Line type='monotone' dataKey='Temperature' stroke='#5bc0de' activeDot={{r: 6}}/>
			        </LineChart>
			        <p className="name_chart">Temperature</p>
			      </div>


			     
				<div className='consumption_data'>
					<br />
					<h3>Realtime Energy Consumption</h3>
					<br />
				</div>

				<div className="stat_demo">
					<LineChart width={600} height={300} data={dreal}
	            	margin={{top: 5, right: 30, left: 20, bottom: 5}}>
					    <XAxis dataKey="name"/>
						<YAxis/>
					    <CartesianGrid strokeDasharray="3 3"/>
					    <Tooltip/>
					    <Legend />
					    <Line type="monotone" dataKey="Power" stroke="#9c0" activeDot={{r: 6}}/>
					</LineChart>
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
		console.log(room, day)
		dispatch(dataAction(room, day))
	}
})

Building = connect(
	mapStateToProps,
	mapDispatchToProps
)(Building)

export default Building