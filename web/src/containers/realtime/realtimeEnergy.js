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

class realtimeEnergy extends Component {

	state = {
		energy1: [],
		energy2: [],
		data2d: []
	}

	componentWillMount(){

		const io = socket('http://localhost:9090')
		io.on('datap', (response) => {
			// console.log('test' + response)
			this.setState({ energy1: response})
			// console.log('ep' + this.state.energy1)
		})

		io.on('datae', (response) => {
			// console.log('test' + response)
			this.setState({ energy2: response})
			// console.log('ee' + this.state.energy1)
		})

		io.on('realtime2d', (response) => {
			this.setState({ data2d: response})
			console.log('2D' + this.state.data2d)
		})

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


		let dreal1 = [], dreal2 = [], d2real = []


		dreal1 = this.state.energy1.map((data) => {
			return ({
				name: moment(data.timestemp).format("hh:mm:ss"),
				power: data.power_value
			})
		})

		dreal2 = this.state.energy2.map((data) => {
			return ({
				name: moment(data.created_at).format("hh:mm:ss"),
				energy: data.data_value
			})
		})

		d2real = this.state.data2d.map((data) => {
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
					<h2>Compare Realtime Data (Wh)</h2>

						<LineChart width={730} height={290} data={d2real}
						  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
						  <XAxis dataKey="name" />
						  <YAxis />
						  <CartesianGrid strokeDasharray="2 2" />
						  <Legend verticalAlign="top" height={36} align='right'/>
						  <Tooltip />
						  <Line isAnimationActive={false} type="monotone" dataKey="Room202" stroke="#29A2C6" />
						  <Line isAnimationActive={false} type="monotone" dataKey="Room203" stroke="#FF6D31" />
						</LineChart>
						<p className="name_chart">Time (hh:mm:ss)</p>
						<br />
						<br />

					<h2>Power Realtime Data (W)</h2>

						<LineChart width={730} height={290} data={dreal1}
						  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
						  <XAxis dataKey="name" />
						  <YAxis />
						  <CartesianGrid strokeDasharray="2 2" />
						  <Legend verticalAlign="top" height={36} align='right'/>
						  <Tooltip />
						  <Line isAnimationActive={false} type="monotone" dataKey="power" stroke="#EF597B" />
						</LineChart>
						<p className="name_chart">Time (hh:mm:ss)</p>
						<br />
						<br />

					<h2>Energy Realtime Data (Wh)</h2>
						<LineChart width={730} height={290} data={dreal2}
						  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
						  <XAxis dataKey="name" />
						  <YAxis />
						  <CartesianGrid strokeDasharray="2 2" />
						  <Legend verticalAlign="top" height={36} align='right'/>
						  <Tooltip />
						  <Line isAnimationActive={false} type="monotone" dataKey="energy" stroke="#FFCB18" />
						</LineChart>
						<p className="name_chart">Time (hh:mm:ss)</p>

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




// <AreaChart width={730} height={290} data={datatime2}
						  // margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
						//   <defs>
						//     <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
						//       <stop offset="5%" stopColor="#EF597B" stopOpacity={0.8}/>
						//       <stop offset="95%" stopColor="#EF597B" stopOpacity={0}/>
						//     </linearGradient>
						//     <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
						//       <stop offset="5%" stopColor="#FFCB18" stopOpacity={0.8}/>
						//       <stop offset="95%" stopColor="#FFCB18" stopOpacity={0}/>
						//     </linearGradient>
						//   </defs>
						//   <XAxis dataKey="name" />
						//   <YAxis />
						//   <CartesianGrid strokeDasharray="2 2" />
						//   <Legend verticalAlign="top" height={36} align='right'/>
						//   <Tooltip />
						//   <Area type="monotone" dataKey="Room202" stroke="#EF597B" fillOpacity={1} fill="url(#colorUv)" />
						//   <Area type="monotone" dataKey="Room203" stroke="#FFCB18" fillOpacity={1} fill="url(#colorPv)" />
						// </AreaChart>
						// <p className="name_chart">Energy Consumption (Wh)</p>

						// <LineChart width={730} height={290} data={datatime2}
						//   margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
						//   <XAxis dataKey="name" />
						//   <YAxis />
						//   <CartesianGrid strokeDasharray="2 2" />
						//   <Legend verticalAlign="top" height={36} align='right'/>
						//   <Tooltip />
						//   <Line type="monotone" dataKey="Room202" stroke="#EF597B" />
						//   <Line type="monotone" dataKey="Room203" stroke="#FFCB18" />
						// </LineChart>
						// <p className="name_chart">Energy Consumption (Wh)</p>

						// <LineChart width={730} height={290} data={dreal1}
						//   margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
						//   <XAxis dataKey="name" />
						//   <YAxis />
						//   <CartesianGrid strokeDasharray="2 2" />
						//   <Legend verticalAlign="top" height={36} align='right'/>
						//   <Tooltip />
						//   <Line type="monotone" dataKey="energy" stroke="#EF597B" />
						// </LineChart>

						// <LineChart width={730} height={290} data={dreal2}
						//   margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
						//   <XAxis dataKey="name" />
						//   <YAxis />
						//   <CartesianGrid strokeDasharray="2 2" />
						//   <Legend verticalAlign="top" height={36} align='right'/>
						//   <Tooltip />
						//   <Line type="monotone" dataKey="Room202" stroke="#EF597B" />
						//   <Line type="monotone" dataKey="Room203" stroke="#FFCB18" />
						// </LineChart>
						// <p className="name_chart">TEST</p>
