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
} from 'react-bootstrap'
import Notification  from '../../node_modules/react-web-notification/lib/components/Notification'
import axios from 'axios'


window.React = React;

class Test extends Component {

	// constructor(props, context) {
 //      super(props, context);
 //        this.state = {
 //        ignore: true,
 //        title: ''
 //      };
 //    }


  state = {
    test: [],
    ignore: true,
    title: ''
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
  axios.get('http://localhost:9090/test')
    .then(function (response) {
      console.log(response);
      this.setState({ test: response.data})
      //console.log(test);
    })
    .catch(function (error) {
      console.log('error');
      console.log(error);
    });
  }


  

	render(){

    let datatest = []

    datatest = this.state.test.map((data) => {
      return ({
        room: power_value,
        date: timestemp
      })
    })


		return (
			<div>
				<h2>Schedule <Link to='schedule/addinfo'><Button bsStyle="success">Add </Button> </Link></h2> 
        <br />
        <table className="table is-striped">
            <thead>
              <tr>
                <th>Room</th>
                <th>Description</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Day</th>
                <th>Maximun Energy</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            
              <tr >
                <td>301</td>
                <td>Closed</td>
                <td>9.00 A.M.</td>
                <td>12.00 A.M.</td>
                <td>Tuesday</td>
                <td> - Wh</td>
                <td><Button bsStyle="info">Edit</Button> <Button bsStyle="danger">Delete</Button></td>
              </tr>

              <tr >
                <td>302</td>
                <td>Closed</td>
                <td>13.00 P.M.</td>
                <td>14.30 P.M.</td>
                <td>Monday, Wednesday</td>
                <td> - Wh</td>
                <td><Button bsStyle="info">Edit</Button> <Button bsStyle="danger">Delete</Button></td>
              </tr>

              <tr >
                
              </tr>

            </tbody>
          </table>


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
