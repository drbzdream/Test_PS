import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { Link } from 'react-router'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import {
  Nav,
  Button,
  Glyphicon,
  Image,
  Table, 
} from 'react-bootstrap'
import socket from 'socket.io-client'
import axios from 'axios'
import actions from 'actions'
import 'components/Building.css'
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
  defs,
  ComposedChart
} from 'recharts'


window.React = React;
const elec_cost = 4.4217

const data = [{name: 'Page A', uv: 590, max: 1800, pv: 590},
              {name: 'Page B', uv: 868, max: 1800, pv: 868},
              {name: 'Page C', uv: 1397, max: 1800, pv: 1397},
              {name: 'Page D', uv: 1480, max: 1800, pv: 1480},
              {name: 'Page E', uv: 1520, max: 1800, pv: 1520},
              {name: 'Page F', uv: 1400, max: 1800, pv: 1400},
              {name: 'Page G', uv: 100, max: 1800, pv: 1420},
              {name: 'Page H', uv: 0, max: 1800, pv: 1470},
              {name: 'Page I', uv: 0, max: 1800, pv: 1500},
              {name: 'Page J', uv: 0, max: 1800, pv: 1570},
              {name: 'Page K', uv: 0, max: 1800, pv: 1650},
              {name: 'Page L', uv: 0, max: 1800, pv: 1700}];

class Notification extends Component {

  state = {
    test: [],
    test2: [],
    scheduleID: '',
    energyID: '',
    notis: [],
    notie: [],
    infoproj: []
  }

  componentDidMount(){

    const io = socket('http://localhost:9090')
    io.on('noti', (response) => {
      axios.get('http://localhost:9090/notischedulelog').then((response) => {
        // console.log(response.data);
        this.setState({ notis: response.data})
        // console.log('aaaaaaaaaaaaaaaa')
      }).catch(function (error) {
        console.log('error');
        console.log(error);
      });
    })

    io.on('noti2', (response) => {
      axios.get('http://localhost:9090/notienergylog').then((response) => {
        // console.log(response);
        this.setState({ notie: response.data})
        //console.log(test);
      }).catch(function (error) {
        console.log('error');
        console.log(error);
      });
    })

    axios.get('http://localhost:9090/schedule')
    .then((response) => {
      console.log(response);
      this.setState({ test: response.data})
      //console.log(test);
    })
    .catch(function (error) {
      console.log('error');
      console.log(error);
    })


    axios.get('http://localhost:9090/energyrule')
    .then((response) => {
      console.log(response);
      this.setState({ test2: response.data})
      //console.log(test);
    })
    .catch(function (error) {
      console.log('error');
      console.log(error);
    })

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
      // console.log('notie '+ this.state.notie);
    }).catch(function (error) {
      console.log('error');
      console.log(error);
    });

    // axios.get('http://localhost:9090/infoenergyuse').then((response) => {
    //   // console.log(response);
    //   this.setState({ infoproj: response.data})
    //   console.log(response.data);
    // }).catch(function (error) {
    //   console.log('error');
    //   console.log(error);
    // });
  }


  deleteUserSchedule(id, index) {
    let x = [...this.state.test]
    x.splice(index, 1)
    this.setState({ test: x })
    axios.delete(`http://localhost:9090/schedule/${id}`)
    .then((response) => {
      //console.log(test);
      console.log('delete')
    })
    .catch(function (error) {
      console.log('error');
      console.log(error);
    });
  }

  deleteUserEnergy(id, index) {
    // console.log('http://localhost:9090/energyrule/${id}')
    // this.setState({ energyID: id})
    let y = [...this.state.test2]
    y.splice(index, 1)
    this.setState({ test2: y })
    axios.delete(`http://localhost:9090/energyrule/${id}`)
    .then((response) => {
      //console.log(test);
      console.log('delete')
    })
    .catch(function (error) {
      console.log('error');
      console.log(error);
    });
  }

  getinfoProjection(id, index) {
    console.log(`http://localhost:9090/energyrule/${id}`)
    axios.get(`http://localhost:9090/infoenergyuse/${id}`) 
    .then((response) => {
      //console.log(test);
      this.setState({ infoproj: response.data})
    })
    .catch(function (error) {
      console.log('error');
      console.log(error);
    });
  }

	render(){

    let dataproj = []

   dataproj = this.state.infoproj.map((data) => {
      return ({
        name: moment(data.name).format("D/MM/YY"),
        max: data.max,
        energy: data.energy,
        projection: data.projection
      })
    })

		return (
			<div>
        <div className='noti-histories'>
        <br />
          <h1>Notification</h1>
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
                      // console.log('notie: ' + this.state.notie)
                      return (
                        <tr key={index}>
                          <td>Room{room}</td>
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
                      // console.log('notis: ' + this.state.notis)
                      return (
                        <tr key={index}>
                          <td>Room{room}</td>
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
        <br />
        <br />
        <h2 style={{ "textAlign": "center"}}>Notification Rule</h2>
          <div className="schedule">
  				<h2>Schedule Rule <Link to='schedule/addschedule'><Button bsStyle="primary">Add </Button> </Link></h2> 
          <br />
          <Table striped condensed hover>
        <thead>
          <tr>
            <th>Room</th>
            <th>Description</th>
            <th>Day</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {
            this.state.test.map((user, index) => {
              let { id, room, description, day, starttime, endtime } = user
              return (
                <tr key={index}>
                  <td>{room}</td>
                  <td>{description}</td>
                  <td>{day}</td>
                  <td>{starttime} น.</td>
                  <td>{endtime} น.</td>
                  <td>
                    <Link to={`schedule/editschedule/${id}`}><Button bsStyle="info">Edit</Button></Link>
                    {' '} 
                    <Button bsStyle="danger" onClick={() => this.deleteUserSchedule(id, index)}>Delete</Button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
      </div>

      <div className="energy">
      <br />
      <br />
        <h2>Energy Rule <Link to='schedule/addenergy-rule'><Button bsStyle="primary">Add </Button> </Link></h2> 
        <br />
        <div className='info_graph' style={{ "textAlign": "center"}}>
          <ComposedChart width={950} height={400} data={dataproj}
                margin={{top: 20, right: 20, bottom: 20, left: -20}}>
              <XAxis dataKey="name"/>
              <YAxis />
              <Tooltip/>
              <Legend/>
              <CartesianGrid stroke='#f5f5f5'/>
              <Line type='monotone' dataKey='max' stroke='#ff7300'/>
              <Bar dataKey='energy' barSize={20} fill='#5cb85c'/>
              <Line type='monotone' dataKey='projection' stroke='#413ea0'/>
              
           </ComposedChart>
        </div>
        <br />

        <Table striped condensed hover>
          <thead>
            <tr>
              <th>Room</th>
              <th>Description</th>
              <th>Maximun Energy (Unit)</th>
              <th>Maximun Electricity Cost</th>
              <th>Updated At</th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.test2.map((user2, index) => {
                let { id, room, description, maxenergy, updated_at, percent_use } = user2
                return (
                  <tr key={index}>
                    <td>{room}</td>
                    <td>{description}</td>
                    <td>{maxenergy.toFixed(2)} kWh</td>
                    <td>{(maxenergy*elec_cost).toFixed(2)} Baht</td>
                    <td>{moment(updated_at).format('MMMM Do YYYY, h:mm a')}</td>
                    <td>
                      <Link to={`schedule/editenergy/${id}`}><Button bsStyle="info">Edit</Button></Link>
                      {' '}
                      <Button bsStyle="danger" onClick={() => this.deleteUserEnergy(id, index)}>Delete</Button>
                      <Button bsStyle="success" style={{ "marginLeft": "5px"}} onClick={() => this.getinfoProjection(id, index)}>Show Info</Button>
                    </td>
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


const selector = formValueSelector('test')

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
	onSubmit(values){
		// console.log(values)
	}
})

export default connect(
	mapStateToProps, 
	mapDispatchToProps
)(Notification)

// <Brush dataKey='name' height={30} stroke="#003311"/>
