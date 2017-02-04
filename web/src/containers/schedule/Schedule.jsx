import React, {Component} from 'react'
import { Link } from 'react-router'
import {
	Button,
	Image,
	Glyphicon,
	FieldGroup,
	FormControl,
	Checkbox
} from 'react-bootstrap'
import 'components/EachDevice.css'
import { Field, reduxForm } from 'redux-form'



class Schedule extends Component {
	render(){
		const { handleSubmit,pristine, reset, submitting } = this.props;
		return(
			<div>
				<div className='each_device-detail'>
					<br />
					<h3>SCHEDULE</h3>
					<br />
					<br />
				</div>
				
				<Link to='/schedule'>
					<Button bsStyle="primary">Schedule</Button>
				</Link>

				<br />
				<br />

				<form onSubmit={handleSubmit}>
      				<div>
        				<label>First Name</label>
        				<div>
         		 			<Field name="firstName" component="input" type="text" placeholder="First Name"/>
        				</div>
      				</div>
      				<div>
        				<label>Last Name</label>
        				<div>
          					<Field name="lastName" component="input" type="text" placeholder="Last Name"/>
        				</div>
      				</div>
      				<div>
        				<label>Email</label>
        				<div>
          					<Field name="email" component="input" type="email" placeholder="Email"/>
        				</div>
     				</div>
      				<div>
        				<label>Sex</label>
        				<div>
          					<label><Field name="sex" component="input" type="radio" value="male"/> Male</label>
          					<label><Field name="sex" component="input" type="radio" value="female"/> Female</label>
        				</div>
      				</div>
      				<div>
        				<label>Favorite Color</label>
        				<div>
          					<Field name="favoriteColor" component="select">
            					<option></option>
            					<option value="ff0000">Red</option>
            					<option value="00ff00">Green</option>
            					<option value="0000ff">Blue</option>
          					</Field>
        				</div>
      				</div>
      				<div>
        				<label htmlFor="employed">Employed</label>
        				<div>
          					<Field name="employed" id="employed" component="input" type="checkbox"/>
        				</div>
      				</div>
      				<div>
        				<label>Notes</label>
        				<div>
        					<FormControl name="notes" componentClass="textarea" placeholder="Enter Text" />
        				</div>
      				</div>
      				<div>
        				<Button type="submit" bsStyle="info" disabled={pristine || submitting}>Submit</Button>
        				<Button type="button" bsStyle="danger" disabled={pristine || submitting} onClick={reset}>Clear Values</Button>
      				</div>
    			</form>

			</div>
		)
	}
}


export default Schedule