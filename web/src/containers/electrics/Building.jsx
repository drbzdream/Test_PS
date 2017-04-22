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
	Sector
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
		{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
    	{name: 'Group C', value: 300}, {name: 'Group D', value: 200}
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
      {name: '7.00 am', uv: 4000, pv: 2400, amt: 2400},
      {name: '8.00 am', uv: 3000, pv: 1398, amt: 2210},
      {name: '9.00 am', uv: 2000, pv: 9800, amt: 2290},
      {name: '10.00 am', uv: 2780, pv: 3908, amt: 2000},
      {name: '11.00 am', uv: 1890, pv: 4800, amt: 2181},
      {name: '12.00 pm', uv: 2390, pv: 3800, amt: 2500},
      {name: '01.00 pm', uv: 3490, pv: 4300, amt: 2100},
      {name: '7.00 am', uv: 4000, pv: 2400, amt: 2400},
      {name: '8.00 am', uv: 3000, pv: 1398, amt: 2210},
      {name: '9.00 am', uv: 2000, pv: 9800, amt: 2290},
      {name: '10.00 am', uv: 2780, pv: 3908, amt: 2000},
      {name: '11.00 am', uv: 1890, pv: 4800, amt: 2181},
      {name: '12.00 pm', uv: 2390, pv: 3800, amt: 2500},
      {name: '01.00 pm', uv: 3490, pv: 4300, amt: 2100}
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
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  )
}

class Building extends Component {

	state = {
		energy_realtime: [],
		power_realtime: [],
		activeIndex: 0,
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
				<h2>Energy Consumption</h2> 

				<div className='energyconsump'>

					<div className='energyconsump-barchart'>

						<BarChart width={600} height={300} data={datatime2}
						margin={{top: 20, right: 30, left: 20, bottom: 5}}>
						   <XAxis dataKey="name"/>
						   <YAxis/>
						   <CartesianGrid strokeDasharray="1 1"/>
						   <Tooltip/>
						   <Legend />
						   <Bar dataKey="pv" stackId="a" fill="#EF597B" />
						   <Bar dataKey="uv" stackId="a" fill="#FFCB18" />
						   <Brush />
						</BarChart>


					  	<div  className='detail'>
					  	</div>

					</div>

					<div className='energyconsump-piechart'>

						<PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
				        <Pie 
				        	activeIndex={this.state.activeIndex}
				         	activeShape={renderActiveShape} 
				          	data={data} 
				          	cx={300} 
				          	cy={200} 
				          	innerRadius={60}
				          	outerRadius={80} 
				          	fill="#8884d8"/>
				       </PieChart>

					</div>
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
// 				</div>