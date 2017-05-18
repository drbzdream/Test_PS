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


const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, total } = props;
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
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${total.toFixed(2)} Unit`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  )
}


class energyConsump extends Component {

	state = {
		energy1: [],
		energy2: [],
		activeIndex: 0,
		test2: [],
		summary: [],
		showenergy: []
	}

	componentWillMount(){
	}


  componentDidMount(){

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
		console.log(res.data)
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

	// Pie 
	getInitialState() {
    	return {activeIndex: 0}
  	}

  	onPieEnter(data, index) {
    	this.setState({activeIndex: index});
    }

	render(){


		return (
			<div className='show_overview'>
				<h1>Overall Data</h1>
				<h2>Energy Consumption (kWh)</h2>
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
							<p className="name_chart">Time (hours)</p>
					</div>

					<div className='energyconsump-piechart'>

						<PieChart width={500} height={500} onMouseEnter={this.onPieEnter.bind(this)}
						margin={{top: 0, right: 30, left: 0, bottom: 0}}>
				        <Pie 
				        	activeIndex={this.state.activeIndex}
				         	activeShape={renderActiveShape} 
				          	data={this.state.summary}
				          	cx={200} 
				          	cy={200} 
				          	innerRadius={60}
				          	outerRadius={100} 
				          	fill="#EF597B">
				          	{
          						this.state.summary.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
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
			                let { name, value, total, avr } = user3
			                // console.log('summary: ' + this.state.summary)
			                return (
			                  <tr key={index}>
			                    <td>{name}</td>
			                    <td>{value.toFixed(2)} Baht</td>
			                    <td>{avr.toFixed(2)} kWh</td>
			                    <td>{total.toFixed(2)} kWh(Unit)</td>
			                  </tr>
			                )
			              })
			            }
			          </tbody>
			        </Table>
					  	</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({ //เอา state จาก store มาใส่ product
	// power_resources: state.power_resources
})

const mapDispatchToProps = (dispatch) => ({ // เพื่อให้ส่งค่าให้ reducer แล้วจะได้เก็บค่าลงใน store 
	// dataAction(room, day){
	// 	console.log(room, day)
	// 	dispatch(dataAction(room, day))
	// }
})

energyConsump = connect(
	mapStateToProps,
	mapDispatchToProps
)(energyConsump)

export default energyConsump