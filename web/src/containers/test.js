import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'

import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import {
  Nav,
  Button,
  Glyphicon,
  Image,
} from 'react-bootstrap'




class Test extends Component {

	constructor(props, context) {
      super(props, context);
    }

	render(){
		return (
			<div>
				<h2>Schedule</h2>
        <br />
        <table className="table is-striped">
            <thead>
              <tr>
                <th>Room</th>
                <th>Description</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Day</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            
              <tr >
                <td>202</td>
                <td>Computer Network</td>
                <td>9.00 A.M.</td>
                <td>12.00 A.M.</td>
                <td>Tuesday</td>
                <td><Button bsStyle="info">Edit</Button> <Button bsStyle="danger">Delete</Button></td>
              </tr>

              <tr >
                <td>202</td>
                <td>Algorithm</td>
                <td>13.00 P.M.</td>
                <td>14.30 P.M.</td>
                <td>Monday, Wednesday</td>
                <td><Button bsStyle="info">Edit</Button> <Button bsStyle="danger">Delete</Button></td>
              </tr>

              <tr >
                
              </tr>

            </tbody>
          </table>
				
			      
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
