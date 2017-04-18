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
    ignore: true,
    title: '',
    scheduleID: '',
    energyID: ''
  }
  // constructor(props) {
  //   super(props);
    
  // }

  handlePermissionGranted(){
    console.log('Permission Granted');
    this.setState({
      ignore: false
    });
  }
  handlePermissionDenied(){
    console.log('Permission Denied');
    this.setState({
      ignore: true
    });
  }
  handleNotSupported(){
    console.log('Web Notification not Supported');
    this.setState({
      ignore: true
    });
  }

  handleNotificationOnClick(e, tag){
    console.log(e, 'Notification clicked tag:' + tag);
  }

  handleNotificationOnError(e, tag){
    console.log(e, 'Notification error tag:' + tag);
  }

  handleNotificationOnClose(e, tag){
    console.log(e, 'Notification closed tag:' + tag);
  }

  handleNotificationOnShow(e, tag){
    //this.playSound();
    console.log(e, 'Notification shown tag:' + tag);
  }

  // playSound(filename){
  //   document.getElementById('sound').play();
  // }

  handleButtonClick() {

    if(this.state.ignore) {
      return;
    }

   // const now = 
    const now = moment();

    const title = 'TEST NOTIFICATION (' + now.format("MMM Do YY") + ')';
    const body = '\nInfo.. \n\n' + now.startOf('hour').fromNow();;
    const tag = '';
    const icon = 'http://georgeosddev.github.io/react-web-notification/example/Notifications_button_24.png';
    // const icon = 'http://localhost:3000/Notifications_button_24.png';





    // Available options
    // See https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification
    const options = {
      tag: tag,
      body: body,
      icon: icon,
      lang: 'en',
      dir: 'ltr',
      //sound: './sound.mp3'  // no browsers supported https://developer.mozilla.org/en/docs/Web/API/notification/sound#Browser_compatibility
    }
    this.setState({
      title: title,
      options: options
    });
  }


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


  deleteUserSchedule(id) {
    // console.log('http://localhost:9090/schedule/${id}')
    this.setState({ scheduleID: id})

    axios.delete(`http://localhost:9090/schedule/${this.state.scheduleID}`, {
      id: this.state.scheduleID 
    })
    .then((response) => {
      //console.log(test);
      console.log('delete')
    })
    .catch(function (error) {
      console.log('error');
      console.log(error);
    });
  }

  deleteUserEnergy(id) {
    // console.log('http://localhost:9090/energyrule/${id}')
    this.setState({ energyID: id})

    axios.delete(`http://localhost:9090/energyrule/${this.state.energyID}`, {
      id: this.state.energyID
    })
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
  				<h2>Schedule <Link to='schedule/addschedule'><Button bsStyle="success">Add </Button> </Link></h2> 
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
                <tr>
                  <td>{room}</td>
                  <td>{description}</td>
                  <td>{day}</td>
                  <td>{starttime.toFixed(2)} น.</td>
                  <td>{endtime.toFixed(2)} น.</td>
                  <td>
                    <Link to={`schedule/editschedule/${id}`}><Button bsStyle="info">Edit</Button></Link>
                    {' '} 
                    <Button bsStyle="danger" onClick={() => this.deleteUserSchedule(id)}>Delete</Button>
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
        <h2>Energy Rule <Link to='schedule/addenergy-rule'><Button bsStyle="success">Add </Button> </Link></h2> 
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
                <tr>
                  <td>{room}</td>
                  <td>{description}</td>
                  <td>{maxenergy.toFixed(2)} Wh</td>
                  <td>
                    <Link to={`schedule/editenergy/${id}`}><Button bsStyle="info">Edit</Button></Link>
                    {' '}
                    <Button bsStyle="danger" onClick={() => this.deleteUserEnergy(id)}>Delete</Button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
      </div>


          <div>
        <Button onClick={this.handleButtonClick.bind(this)}>Notif!</Button>
        <Notification 
          ignore={this.state.ignore && this.state.title !== ''}
          notSupported={this.handleNotSupported.bind(this)}
          onPermissionGranted={this.handlePermissionGranted.bind(this)}
          onPermissionDenied={this.handlePermissionDenied.bind(this)}
          // onShow={this.handleNotificationOnShow.bind(this)}
          // onClick={this.handleNotificationOnClick.bind(this)}
          // onClose={this.handleNotificationOnClose.bind(this)}
          // onError={this.handleNotificationOnError.bind(this)}
          timeout={5000}
          title={this.state.title}
          options={this.state.options}
        />
       
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
