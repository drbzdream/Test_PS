import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router' 
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



const { getUsers } = actions




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
	}

	componentWillMount(){
		this.props.getUsers()
	}

	eiei(){
		this.setState({x: this.state.x +1})
	}



	render(){

		return (
			<div className='show_overview'>

				

			    	<h2>Overall Data</h2> 

						<p className="title_echarge">Electricity Charge</p>
					<PieChart width={400} height={400} >
	        			<Pie data={data02} cx={200} cy={200} innerRadius={90} outerRadius={140} fill="#82ca9d" label/>
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
				       <Bar dataKey="Energy" fill="#8884d8" />
				     </BarChart>

       			</div>

			
			      
			      <h3>Resource Consumption</h3>

			      <div className="filter">
				    <ButtonToolbar>
				    <p className="p_button"> Filter By : </p>
				      

				      <FormGroup controlId="formControlsSelect">
				      
				      <FormControl componentClass="select" placeholder="select">
				        <option value="select">Room</option>
				        <option value="other">Room 202</option>
				        <option value="other">Room 203</option>
				      </FormControl>
				    </FormGroup>

				      <p className="p_button"> Mouth</p>
				     <FormGroup controlId="formControlsSelect">
				      
				      <FormControl componentClass="select" placeholder="select">
				        <option value="select">Mouth</option>
				        <option value="other">January</option>
				        <option value="other">Febuary</option>
				      </FormControl>
				    </FormGroup>
				    <p className="p_button"> Day</p>
				      <FormGroup controlId="formControlsSelect">
				      
				      <FormControl componentClass="select" placeholder="select">
				        <option value="select">Day</option>
				        <option value="other">1</option>
				        <option value="other">2</option>
				        <option value="other">3</option>
				        <option value="other">4</option>
				      </FormControl>
				    </FormGroup>
				    

				    <Button bsStyle="danger">Submit</Button>
				    </ButtonToolbar>
			    </div>


			      	<div className="conp_chart">
			        <AreaChart width={600} height={200} data={datatime2} syncId="anyId"
			              margin={{top: 10, right: 30, left: 0, bottom: 0}}>
			          <XAxis dataKey="name"/>
			          <YAxis/>
			          <CartesianGrid strokeDasharray="3 3"/>
			          <Tooltip/>
			          <Area type='monotone' dataKey='Energy' stroke='#8884d8' fill='#8884d8' />
			        </AreaChart>
			        <p className="name_chart">Energy</p>

			        <LineChart width={600} height={200} data={datatime2} syncId="anyId"
			              margin={{top: 10, right: 30, left: 0, bottom: 0}}>
			          <XAxis dataKey="name"/>
			          <YAxis/>
			          <CartesianGrid strokeDasharray="3 3"/>
			          <Tooltip/>
			          <Line type='monotone' dataKey='pv' stroke='#82ca9d' fill='#82ca9d' />
			        </LineChart>
			        <p className="name_chart">Light</p>

			        <LineChart width={600} height={200} data={datatime2} syncId="anyId"
			              margin={{top: 10, right: 30, left: 0, bottom: 0}}>
			          <XAxis dataKey="name"/>
			          <YAxis/>
			          <CartesianGrid strokeDasharray="3 3"/>
			          <Tooltip/>
			          <Line type='monotone' dataKey='pv' stroke='#031' fill='#031' />
			        </LineChart>
			        <p className="name_chart">Temperature</p>
			      </div>


			     
				<div className='consumption_data'>
					<br />
					<h3>Realtime Energy Consumption</h3>
					<br />
				</div>

				<div className="stat_demo">
					<LineChart width={600} height={300} data={datatime}
	            	margin={{top: 5, right: 30, left: 20, bottom: 5}}>
					    <XAxis dataKey="name"/>
						<YAxis/>
					    <CartesianGrid strokeDasharray="3 3"/>
					    <Tooltip/>
					    <Legend />
					    <Line type="monotone" dataKey="Floor2" stroke="#031" activeDot={{r: 8}}/>
					</LineChart>
				</div>
				


			      

			</div>
		)
	}
}

const mapStateToProps = (state) => ({ //เอา state จาก store มาใส่ product
	users: state.users.get.data
})

const mapDispatchToProps = (dispatch) => ({ // เพื่อให้ส่งค่าให้ reducer แล้วจะได้เก็บค่าลงใน store 
	getUsers() { 
	    dispatch(getUsers())
	}
})

Building = connect(
	mapStateToProps,
	mapDispatchToProps
)(Building)

export default Building