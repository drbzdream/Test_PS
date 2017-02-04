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
      {name: 'Floor 1', Energy: 4000, pv: 2400, amt: 2400},
      {name: 'Floor 2', Energy: 3000, pv: 1398, amt: 2210},
      {name: 'Floor 3', Energy: 2000, pv: 9800, amt: 2290},
      {name: 'Floor 4', Energy: 2780, pv: 3908, amt: 2000},
      {name: 'Floor 5', Energy: 1890, pv: 4800, amt: 2181},
      {name: 'Floor 6', Energy: 2390, pv: 3800, amt: 2500},
      {name: 'Floor 7', Energy: 3490, pv: 4300, amt: 2100},
]

const datatime = [
      {name: '7.00 am', Floor1: 4000, Floor2: 2400, amt: 2400},
      {name: '8.00 am', Floor1: 3000, Floor2: 1398, amt: 2210},
      {name: '9.00 am', Floor1: 2000, Floor2: 9800, amt: 2290},
      {name: '10.00 am', Floor1: 2780, Floor2: 3908, amt: 2000},
      {name: '11.00 am', Floor1: 1890, Floor2: 4800, amt: 2181},
      {name: '12.00 pm', Floor1: 2390, Floor2: 3800, amt: 2500},
      {name: '01.00 pm', Floor1: 3490, Floor2: 4300, amt: 2100},
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

const data01 = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
                  {name: 'Group C', value: 300}, {name: 'Group D', value: 200}]

const data02 = [{name: 'A1', value: 100},
                    {name: 'A2', value: 300},
                   {name: 'B1', value: 100},
                   {name: 'B2', value: 80},
                   {name: 'B3', value: 40},
                   {name: 'B4', value: 30},
                   {name: 'B5', value: 50},
                  {name: 'C1', value: 100},
                  {name: 'C2', value: 200},
                   {name: 'D1', value: 150},
                   {name: 'D2', value: 50}]


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
				<h3>OVERALL DATA</h3> 
				

				<div className="filter">
				    <ButtonToolbar>
				    <p className="p_button"> Filter By : </p>
				      <FormGroup controlId="formControlsSelect">
				      
				      <FormControl componentClass="select" placeholder="select">
				        <option value="select">Building</option>
				        <option value="other">Building1</option>
				        <option value="other">Building2</option>
				        <option value="other">Building3</option>
				      </FormControl>
				    </FormGroup>

				      <FormGroup controlId="formControlsSelect">
				      
				      <FormControl componentClass="select" placeholder="select">
				        <option value="select">Floor</option>
				        <option value="other">Floor1</option>
				        <option value="other">Floor2</option>
				        <option value="other">Floor3</option>
				      </FormControl>
				    </FormGroup>

				      <FormGroup controlId="formControlsSelect">
				      
				      <FormControl componentClass="select" placeholder="select">
				        <option value="select">Room</option>
				        <option value="other">Room1</option>
				        <option value="other">Room2</option>
				        <option value="other">Room3</option>
				      </FormControl>
				    </FormGroup>

				      <FormGroup controlId="formControlsSelect">
				     
				      <FormControl componentClass="select" placeholder="select">
				        <option value="select">Stutas</option>
				        <option value="other">Avaliable</option>
				        <option value="other">Busy</option>
				      </FormControl>
				    </FormGroup>

				      <FormGroup controlId="formControlsSelect">
				      
				      <FormControl componentClass="select" placeholder="select">
				        <option value="select">Sort by</option>
				        <option value="other">Descending Order</option>
				        <option value="other">Ascending Order</option>
				      </FormControl>
				    </FormGroup>

				    <Button bsStyle="danger">Submit</Button>
				    </ButtonToolbar>
			    </div>


			    	<h3>TOTAL ENERGY</h3> 

				
					<PieChart width={400} height={400} >
	        			<Pie data={data01} cx={200} cy={200} outerRadius={110} fill="#8884d8"/>
	        			<Pie data={data02} cx={200} cy={200} innerRadius={120} outerRadius={140} fill="#82ca9d" label/>
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
				
				
				<div className='consumption_data'>
					<br />
					<h3>ENERGY USAGE</h3>
				</div>

				<div className="stat_demo">
					<LineChart width={600} height={300} data={datatime}
	            	margin={{top: 5, right: 30, left: 20, bottom: 5}}>
					    <XAxis dataKey="name"/>
						<YAxis/>
					    <CartesianGrid strokeDasharray="3 3"/>
					    <Tooltip/>
					    <Legend />
					    <Line type="monotone" dataKey="Floor1" stroke="#8884d8" activeDot={{r: 8}}/>
					    <Line type="monotone" dataKey="Floor2" stroke="#82ca9d" />
					</LineChart>
				</div>

			

				<div className="conp_chart">
				<h3>CONSUMPTION ENERGY</h3>
				<AreaChart width={600} height={400} data={datatime2}
			            margin={{top: 10, right: 30, left: 0, bottom: 0}}>
			        <XAxis dataKey="name"/>
			        <YAxis/>
			        <CartesianGrid strokeDasharray="3 3"/>
			        <Tooltip/>
			        <Area type='monotone' dataKey='Energy' stroke='#8884d8' fill='#8884d8' />
			      </AreaChart>

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