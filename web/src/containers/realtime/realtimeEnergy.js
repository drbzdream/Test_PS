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
	Brush,
	Sector,
	ResponsiveContainer,
	Cell,
	linearGradient,
	defs
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

const elec_cost = 3.9639 

const COLORS = ['#EF597B', '#FFCB18', '#29A2C6', '#FF6D31', '#73B66B'];
				// pink       yello 	blue       orange     green


const datatime2 = [
      {name: '07.00', Room202: 4000, Room203: 2400, amt: 2400},
      {name: '08.00', Room202: 3000, Room203: 1398, amt: 2210},
      {name: '09.00', Room202: 2000, Room203: 9800, amt: 2290},
      {name: '10.00', Room202: 2780, Room203: 3908, amt: 2000},
      {name: '11.00', Room202: 1890, Room203: 4800, amt: 2181},
      {name: '12.00', Room202: 2390, Room203: 3800, amt: 2500},
      {name: '13.00', Room202: 3490, Room203: 4300, amt: 2100},
      {name: '14.00', Room202: 4000, Room203: 2400, amt: 2400},
      {name: '15.00', Room202: 3000, Room203: 1398, amt: 2210},
      {name: '16.00', Room202: 2000, Room203: 9800, amt: 2290},
      {name: '17.00', Room202: 2780, Room203: 3908, amt: 2000},
      {name: '18.00', Room202: 1890, Room203: 4800, amt: 2181},
      {name: '19.00', Room202: 2390, Room203: 3800, amt: 2500},
      {name: '20.00', Room202: 3490, Room203: 4300, amt: 2100},
]

const data01 = [{name: 'Room 202', value: 18411.403803}, {name: 'Room 203', value: 18503.049171}]




class realtimeEnergy extends Component {

	state = {
		energy1: [],
		energy2: []
	}

	componentWillMount(){

		// const io = socket('http://localhost:9090')
		// io.on('energy_room202', (response) => {
		// 	console.log('res202' + response)
		// 	this.setState({ energy1: response})
		// })

	}


  componentDidMount(){
  	axios.get('http://localhost:9090/realtimedata1').then((res) => {
		// console.log('showenergy')
		// console.log(res.data)
		this.setState({energy1: res.data})
	}).catch(function (error) {
  		console.log('error');
  		console.log(error);
	})
    
    axios.get('http://localhost:9090/realtimedata2').then((res) => {
		// console.log('showenergy')
		// console.log(res.data)
		this.setState({energy2: res.data})
	}).catch(function (error) {
  		console.log('error');
  		console.log(error);
	})
  }

	render(){


		let dreal1 = [], dreal2 = []


		dreal1 = this.state.energy1.map((data) => {
			return ({
				name: moment(data.created_at).format("hh:mm:ss"),
				energy: data.data_value
			})
		})

		dreal2 = this.state.energy2.map((data) => {
			return ({
				name: moment(data.name).format("hh:mm:ss"),
				Room202: data.Room202,
				Room203: data.Room203
			})
		})


		return (
			<div className='show_overview'>
				<h1>Realtime Energy Consumption</h1>
				<br /> 

				<div className='realtimeconsumpt'>
					<br />
					<h2>Realtime Energy/Power</h2>
						<AreaChart width={730} height={290} data={datatime2}
						  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
						  <defs>
						    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
						      <stop offset="5%" stopColor="#EF597B" stopOpacity={0.8}/>
						      <stop offset="95%" stopColor="#EF597B" stopOpacity={0}/>
						    </linearGradient>
						    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
						      <stop offset="5%" stopColor="#FFCB18" stopOpacity={0.8}/>
						      <stop offset="95%" stopColor="#FFCB18" stopOpacity={0}/>
						    </linearGradient>
						  </defs>
						  <XAxis dataKey="name" />
						  <YAxis />
						  <CartesianGrid strokeDasharray="2 2" />
						  <Legend verticalAlign="top" height={36} align='right'/>
						  <Tooltip />
						  <Area type="monotone" dataKey="Room202" stroke="#EF597B" fillOpacity={1} fill="url(#colorUv)" />
						  <Area type="monotone" dataKey="Room203" stroke="#FFCB18" fillOpacity={1} fill="url(#colorPv)" />
						</AreaChart>
						<p className="name_chart">Energy Consumption (Wh)</p>

						<LineChart width={730} height={290} data={datatime2}
						  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
						  <XAxis dataKey="name" />
						  <YAxis />
						  <CartesianGrid strokeDasharray="2 2" />
						  <Legend verticalAlign="top" height={36} align='right'/>
						  <Tooltip />
						  <Line type="monotone" dataKey="Room202" stroke="#EF597B" />
						  <Line type="monotone" dataKey="Room203" stroke="#FFCB18" />
						</LineChart>
						<p className="name_chart">Energy Consumption (Wh)</p>

						<LineChart width={730} height={290} data={dreal1}
						  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
						  <XAxis dataKey="name" />
						  <YAxis />
						  <CartesianGrid strokeDasharray="2 2" />
						  <Legend verticalAlign="top" height={36} align='right'/>
						  <Tooltip />
						  <Line type="monotone" dataKey="energy" stroke="#EF597B" />
						</LineChart>

						<LineChart width={730} height={290} data={dreal2}
						  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
						  <XAxis dataKey="name" />
						  <YAxis />
						  <CartesianGrid strokeDasharray="2 2" />
						  <Legend verticalAlign="top" height={36} align='right'/>
						  <Tooltip />
						  <Line type="monotone" dataKey="Room202" stroke="#EF597B" />
						  <Line type="monotone" dataKey="Room203" stroke="#FFCB18" />
						</LineChart>
						<p className="name_chart">TEST</p>

				</div>
				


			   
			</div>
		)
	}
}

// const mapStateToProps = (state) => ({ //เอา state จาก store มาใส่ product
// 	power_resources: state.power_resources
// })

// const mapDispatchToProps = (dispatch) => ({ // เพื่อให้ส่งค่าให้ reducer แล้วจะได้เก็บค่าลงใน store 
// 	dataAction(room, day){
// 		console.log(room, day)
// 		dispatch(dataAction(room, day))
// 	}
// })

realtimeEnergy = connect(
	null,
	null
)(realtimeEnergy)

export default realtimeEnergy