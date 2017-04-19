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

// var timefromserver


class Building extends Component {

	state = {
		energy_realtime: [],
		power_realtime: [],
		// time_server: 0,
		// count: 0
	}

	componentWillMount(){
		this.props.dataAction()
        const io = socket('http://localhost:9090')
		io.on('energy_realtime', (response) => {
			this.setState({ energy_realtime: response})
			// dispatch(requestSuccess(response))
		})

		io.on('power_realtime', (response) => {
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

	shouldComponentUpdate(nextProps, nextState){
		return nextState.enegy_realtime != this.state.energy_realtime
	}

	render(){
		//time
		// var web_time = moment()
		// var web_time_tmp = new Date()
		// console.log("time_web: " + web_time)
		// // console.log('time_server(no moment): ' + web_time_tmp)

		// let timeDiff_web_server = moment.duration(web_time - timefromserver, 'milliseconds')
		// console.log('Different: ' + timeDiff_web_server)


		let dreal = [], drealpower = [] 


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

				

			    	<h2>Overall Data</h2> 
			    	<h4>Latest Mouth</h4> 
						<p className="title_echarge">Electricity Charge (Baht)</p>
					<PieChart width={400} height={400} >
	        			<Pie data={data02} cx={200} cy={200} innerRadius={90} outerRadius={140} fill="#d9534f" label/>
	        			<Tooltip/>
	       			</PieChart>

	       		<div className="total_chart">
	       		<p><b>Total Energy(kWh)</b></p>
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

			
			      
			 

			     
				<div className='consumption_data'>
					<br />
					<h3>Realtime Energy Consumption</h3>
					<br />
				</div>

				<div className="stat_demo">
					<LineChart width={800} height={300} data={dreal}
	            	margin={{top: 5, right: 30, left: 20, bottom: 5}}>
					    <XAxis dataKey="name"/>
						<YAxis/>
					    <CartesianGrid strokeDasharray="3 3"/>
					    <Tooltip/>
					    <Legend />
					    <Line isAnimationActive={false} type="monotone" dataKey="power" stroke="#9c0" activeDot={{r: 6}}/>
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