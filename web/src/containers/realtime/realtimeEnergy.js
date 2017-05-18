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


const COLORS = ['#EF597B', '#FFCB18', '#29A2C6', '#FF6D31', '#73B66B'];
				// pink       yello 	blue       orange     green

class realtimeEnergy extends Component {

	state = {
		energy1: [],
		energy2: [],
		data2d: [],
		infopf: []
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
			// console.log('2D' + this.state.data2d)
		})

	}


  componentDidMount(){

  	axios.get('http://localhost:9090/powerfactor').then((res) => {
		// this.setState({ infopf: res})
		console.log(res.data)
		this.setState({infopf: res.data})
		console.log('info '+ this.state.infopf)

	}).catch(function (error) {
  		console.log('error');
  		console.log(error);
	})


	 //  	axios.get('http://localhost:9090/realtimepower1').then((res) => {
		// 	// console.log('showenergy')
		// 	// console.log(res.data)
		// 	this.setState({energy1: res.data})
		// }).catch(function (error) {
	 //  		console.log('error');
	 //  		console.log(error);
		// })
	    
	 //    axios.get('http://localhost:9090/realtimedata2').then((res) => {
		// 	// console.log('showenergy')
		// 	// console.log(res.data)
		// 	this.setState({energy2: res.data})
		// }).catch(function (error) {
	 //  		console.log('error');
	 //  		console.log(error);
		// })
  }

	render(){


		let dreal1 = [], dreal2 = [], d2real = []


		dreal1 = this.state.energy1.map((data) => {
			return ({
				name: moment(data.created_at).format("hh:mm:ss"),
				power: data.data_value
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
				power: data.Room202,
				Room203: data.Room203
			})
		})


		return (
			<div className='show_overview'>
				<h1>Realtime Energy Consumption</h1>
				<br /> 

				<div style={{ "textAlign": "center"}}>
			        <br />
			        <Table striped condensed hover>
			        <thead>
			          <tr>
			            <th>Room</th>
			            <th>Description</th>
			            <th>Power Factor</th>
			            <th>Updated at</th>
			          </tr>
			        </thead>
			        <tbody style={{ "textAlign": "left"}}>
			          {
			            this.state.infopf.map((user, index) => {
			              let { id, room, description, powerfactor_value, updated_at } = user
			              return (
			                <tr key={index}>
			                  <td>{room}</td>
			                  <td>{description}</td>
			                  <td>{powerfactor_value}</td>
			                  <td>{moment(updated_at).format('MMMM Do YYYY, h:mm:ss a')}</td>
			                </tr>
			              )
			            })
			          }

			        </tbody>
			      </Table>
			      </div>

				<div className='realtimeconsumpt'>
					<br />
					<h2>Power Realtime Data (W)</h2>

						<BarChart width={730} height={290} data={dreal1}
						  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
						  <XAxis dataKey="name" />
						  <YAxis />
						  <CartesianGrid strokeDasharray="2 2" />
						  <Legend verticalAlign="top" height={36} align='right'/>
						  <Tooltip />
						  <Bar isAnimationActive={false} type="monotone" dataKey="power" fill="#EF597B" stroke="#EF597B" />
						</BarChart>
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
						  <Line isAnimationActive={false} type="monotone" dataKey="energy" fill="#FFCB18" stroke="#FFCB18" />
						</LineChart>
						<p className="name_chart">Time (hh:mm:ss)</p>

				</div>
				


			   
			</div>
		)
	}
}

realtimeEnergy = connect(
	null,
	null
)(realtimeEnergy)

export default realtimeEnergy



