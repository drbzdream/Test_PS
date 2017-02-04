import React, {Component} from 'react'
import { Link } from 'react-router'
import {
	Button,
	Image,
	Glyphicon,
	FieldGroup,
	FormGroup,
	ControlLabel,
	FormControl,
	option,
	Checkbox,
	form
} from 'react-bootstrap'
import 'components/EachDevice.css'
import { Field, reduxForm } from 'redux-form'
import {
	testpic
} from 'assets/images'


class EditDevice extends Component {
	render(){

		const { handleSubmit, pristine, reset, submitting } = this.props;



		return(
				<div className='each_device-detail'>
					<br />
					<h3>EDIT DEVICE</h3>
				
				<Link to='/infodevice'>
					<Button bsStyle="primary"><Glyphicon glyph="chevron-left" /> Back</Button>
				</Link>
				<br/>
				<br/>
				<br/>

				<div className='edit_photo'>
					<div className="form-group">
        				<label>Image File</label>
        				<div>
         		 			<Field name="firstname" component="input" type="file" />
        				</div>
      				</div>
					<Image src={testpic} />
					
				</div>

				<form onSubmit={handleSubmit}>

      				<div className="form-group">
        				<label>Device</label>
        				<div>
         		 			<Field className="form-control" name="firstname" component="input" type="text" placeholder="Enter Text"/>
        				</div>
      				</div>

      				<div className="form-group">
        				<label>Device Name</label>
        				<div>
         		 			<Field className="form-control" name="device" component="input" type="text" placeholder="Enter Name"/>
        				</div>
      				</div>

      				<div className="form-group">
        				<label>Date Installation</label>
        				<div>
          					<Field className="form-control"  name="lastname" component="input" type="text" placeholder="Enter Date"/>
        				</div>
      				</div>

      				<div className="form-group">
        				<label>Building</label>
        				<FormControl componentClass="select" placeholder="select">
				        <option value="select">Building</option>
				        <option value="other">Building1</option>
				        <option value="other">Building2</option>
				        <option value="other">Building3</option>
				      </FormControl>
     				</div>

     				<div className="form-group">
        				<label>Floor</label>
        				<FormControl componentClass="select" placeholder="select">
				        <option value="select">Floor</option>
				        <option value="other">Floor1</option>
				        <option value="other">Floor2</option>
				        <option value="other">Floor3</option>
				      </FormControl>
     				</div>

     				<div className="form-group">
        				<label>Room</label>
        				<FormControl componentClass="select" placeholder="select">
				        <option value="select">Room</option>
				        <option value="other">Room1</option>
				        <option value="other">Room2</option>
				        <option value="other">Room3</option>
				      </FormControl>
     				</div>

     				
				   
     			
     				<div className="form-group">
        				<label>Description</label>
        				<div>
        					<FormControl name="notes" componentClass="textarea" placeholder="Enter Text" />
        				</div>
      				</div>
      				
      				<div className="button-form">
      					<Link to='/infodevice'>
        					<Button type="submit" bsStyle="success" disabled={pristine || submitting}>Submit</Button>
        				</Link>
        		
        				<Button type="button" bsStyle="danger" disabled={pristine || submitting} onClick={reset}>Clear Values</Button>
      			
      				</div>
    			</form>

			</div>
			)
	}
}

EditDevice = reduxForm({
  form: 'edit' // a unique name for this form
})(EditDevice);

export default EditDevice