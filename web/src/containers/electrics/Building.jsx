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

const COLORS = ['#EF597B', '#FFCB18'];

const data = [
		{name: 'Room202', value: 12503.04, avr: 5555}, {name: 'Room203', value: 8503.04, avr: 4444}
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

const data02 = [{name: 'Room 202', value: 18411.403803}, {name: 'Room 203', value: 18503.049171}]

// var timefromserver


const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';
  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${value} Baht`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  )
}


class Building extends Component {

	state = {
		energy1: [],
		energy2: [],
		activeIndex: 0,
		test2: [],
		notis: [],
		notie: [],
		showenergy: [],
		summary: []
		// time_server: 0,
		// count: 0
	}

	componentWillMount(){
		this.props.dataAction()
        const io = socket('http://localhost:9090')
		io.on('energy_room1', (response) => {
			this.setState({ energy1: response})
			// dispatch(requestSuccess(response))
		})

		io.on('energy_room2', (response) => {
			this.setState({ energy2: response})
			// dispatch(requestSuccess(response))
		})


	}


  componentDidMount(){
	axios.get('http://localhost:9090/notischedulelog').then((response) => {
      // console.log(response.data);
      this.setState({ notis: response.data})
      //console.log(test);
    }).catch(function (error) {
      console.log('error');
      console.log(error);
    });


    axios.get('http://localhost:9090/notienergylog').then((response) => {
      // console.log(response);
      this.setState({ notie: response.data})
      //console.log(test);
    }).catch(function (error) {
      console.log('error');
      console.log(error);
    });

    axios.get('http://localhost:9090/energyrule').then((response) => {
  		// console.log(response);
  		this.setState({ test2: response.data})
  		//console.log(test);
	}).catch(function (error) {
  		console.log('error');
  		console.log(error);
	});

	axios.get('http://localhost:9090/energyshow').then((res) => {
		// console.log('showenergy')
		// console.log(res.data)
		this.setState({showenergy: res.data})
	}).catch(function (error) {
  		console.log('error');
  		console.log(error);
	})

	axios.get('http://localhost:9090/summary').then((res) => {
		// console.log('showenergy')
		// console.log(res.data)
		this.setState({summary: res.data})
	}).catch(function (error) {
  		console.log('error');
  		console.log(error);
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
		return nextState.enegy_realtime != this.state.energy_realtime

	}


	// Pie 
	getInitialState() {
    	return {activeIndex: 0}
  	}

  	onPieEnter(data, index) {
    	this.setState({activeIndex: index});
    }

	render(){


		let dreal = [], drealpower = [], derealroom = [] 


		dreal = this.state.energy1.map((data) => {
			return ({
				name: moment(data.timestemp).format("hh:mm:ss"),
				energy1: data.energy_value
			})
		})

		drealpower = this.state.energy2.map((data) => {
			return ({
				energy2: data.energy_value
			})
		})


		return (
			<div className='show_overview'>
				<h1>Overall Data</h1>
				<h2>Energy Consumption</h2>
				<br /> 

				<div className='energyconsumpt'>

					<div className='energyconsump-barchart'>

							<BarChart width={950} height={340} data={this.state.showenergy}
						  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
							   <XAxis dataKey="name"/>
							   <YAxis />
							   <CartesianGrid strokeDasharray="2 2"/>
							   <Tooltip />
							   <Legend verticalAlign="top" height={36} align='right'/>
							   <Bar dataKey="Room202" stackId="a" fill="#EF597B" />
							   <Bar dataKey="Room203" stackId="a" fill="#FFCB18" />
							   <Brush dataKey='name' height={30} stroke="#003311"/>
							</BarChart>
							<p className="name_chart">Energy Consumption (Wh)</p>
					</div>

					<div className='energyconsump-piechart'>

						<PieChart width={400} height={400} onMouseEnter={this.onPieEnter.bind(this)}
						margin={{top: 0, right: 30, left: 0, bottom: 0}}>
				        <Pie 
				        	activeIndex={this.state.activeIndex}
				         	activeShape={renderActiveShape} 
				          	data={data}
				          	cx={200} 
				          	cy={200} 
				          	innerRadius={60}
				          	outerRadius={100} 
				          	fill="#EF597B">
				          	{
          						data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
          					}</Pie>
				       </PieChart>


				       	<div  className='detail'>
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
			              this.state.summary.map((user3, index) => {
			                let { name, value, avr } = user3
			                // console.log('summary: ' + this.state.summary)
			                return (
			                  <tr key={index}>
			                    <td>{name}</td>
			                    <td>{(value*elec_cost).toFixed(2)} Baht</td>
			                    <td>{avr.toFixed(2)} Wh</td>
			                    <td>{value.toFixed(2)} Wh</td>
			                  </tr>
			                )
			              })
			            }
			          </tbody>
			        </Table>
					  	</div>

					</div>


				</div>

				<div className='realtimeconsumpt'>
					<br />
					<h2>Realtime Energy Consumption</h2>
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

				</div>

				<div className='noti-histories'>
					<h2>Notification History</h2>
					<br />
					<Table striped condensed hover>
			          <thead>
			            <tr>
			              <th>Room</th>
			              <th>Description</th>
			              <th>Type</th>
			              <th>Notification at</th>
			            </tr>
			          </thead>
			          <tbody>
			            {
			              this.state.notie.map((user1, index) => {
			                let { id, room, type, description, updated_at } = user1
			                console.log('notie: ' + this.state.notie)
			                return (
			                  <tr key={index}>
			                    <td>{room}</td>
			                    <td>{description}</td>
			                    <td>{type}</td>
			                    <td>{moment(updated_at).format('MMMM Do YYYY, h:mm:ss a')}</td>
			                  </tr>
			                )
			              })
			            }
			            {
			              this.state.notis.map((user2, index) => {
			                let { id, room, type, description, updated_at } = user2
			                console.log('notis: ' + this.state.notis)
			                return (
			                  <tr key={index}>
			                    <td>{room}</td>
			                    <td>{description}</td>
			                    <td>{type}</td>
			                    <td>{moment(updated_at).format('MMMM Do YYYY, h:mm:ss a')}</td>
			                  </tr>
			                )
			              })
			            }
			          </tbody>
			        </Table>


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


// <h2>Overall Data</h2> 
// 			    	<h4>Latest Mouth</h4> 
// 						<p className="title_echarge">Electricity Charge (Baht)</p>
// 					<PieChart width={400} height={400} >
// 	        			<Pie data={data02} cx={200} cy={200} innerRadius={90} outerRadius={140} fill="#d9534f" label/>
// 	        			<Tooltip/>
// 	       			</PieChart>

// 	       		<div className="total_chart">
// 	       		<p><b>Total Energy(kWh)</b></p>
// 	       			<BarChart width={550} height={250} data={data}
// 				            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
// 				       <XAxis dataKey="name"/>
// 				       <YAxis/>
// 				       <CartesianGrid strokeDasharray="3 3"/>
// 				       <Tooltip/>
// 				       <Legend />
// 				       <Bar dataKey="Energy" fill="#5bc0de" />
// 				     </BarChart>

//        			</div>

			     
// 				<div className='consumption_data'>
// 					<br />
// 					<h3>Realtime Energy Consumption</h3>
// 					<br />
// 				</div>

// 				<div className="stat_demo">
// 					<LineChart width={800} height={300} data={dreal}
// 	            	margin={{top: 5, right: 30, left: 20, bottom: 5}}>
// 					    <XAxis dataKey="name"/>
// 						<YAxis/>
// 					    <CartesianGrid strokeDasharray="3 3"/>
// 					    <Tooltip/>
// 					    <Legend />
// 					    <Line isAnimationActive={false} type="monotone" dataKey="power" stroke="#9c0" activeDot={{r: 6}}/>
// 					</LineChart>
// 