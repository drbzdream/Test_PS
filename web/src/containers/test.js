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
import Notification  from '../../node_modules/react-web-notification/lib/components/Notification'
import axios from 'axios'
import actions from 'actions'
import { ColTableListUser } from 'components/users'

window.React = React;

class Test extends Component {

  state = {
    test: [],
    test2: [],
    scheduleID: '',
    energyID: ''
  }
  // constructor(props) {
  //   super(props);
    
  // }

  

  // playSound(filename){
  //   document.getElementById('sound').play();
  // }


  componentDidMount(){
  axios.get('http://localhost:9090/schedule')
    .then((response) => {
      console.log(response);
      this.setState({ test: response.data})
      //console.log(test);
    })
    .catch(function (error) {
      console.log('error');
      console.log(error);
    });


    axios.get('http://localhost:9090/energyrule')
    .then((response) => {
      console.log(response);
      this.setState({ test2: response.data})
      //console.log(test);
    })
    .catch(function (error) {
      console.log('error');
      console.log(error);
    });
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

  

	render(){
		return (
			<div>
        <div className="schedule">
  				<h2>Schedule <Link to='schedule/addschedule'><Button bsStyle="primary">Add </Button> </Link></h2> 
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
              let { id, room, description, day, starttime, endtime, deleteUser } = user
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
          <Table striped condensed hover>
        <thead>
          <tr>
            <th>Room</th>
            <th>Description</th>
            <th>Maximun Energy</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {
            this.state.test2.map((user2, index) => {
              let { id, room, description, maxenergy, deleteUser } = user2
              return (
                <tr key={index}>
                  <td>{room}</td>
                  <td>{description}</td>
                  <td>{maxenergy.toFixed(2)} Wh</td>
                  <td>
                    <Link to={`schedule/editenergy/${id}`}><Button bsStyle="info">Edit</Button></Link>
                    {' '}
                    <Button bsStyle="danger" onClick={() => this.deleteUserEnergy(id, index)}>Delete</Button>
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
		console.log(values)
	}
})

export default connect(
	mapStateToProps, 
	mapDispatchToProps
)(Test)
