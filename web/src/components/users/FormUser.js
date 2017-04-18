import React from 'react'
import { Button } from 'react-bootstrap'
import { Field } from 'redux-form'

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>{' '}
	<input {...input} type={type} /> {' '}
	<span className='error' style={{'color':'red'}}>{touched && ((error && <span>{error}</span>))}</span>
  </div>
)

const FormUser = ({ handleSubmit, submitting, reset }) => {
	return (
	    <form onSubmit={handleSubmit} className='form' action='javascript:void(0)'>
			<Field name="name" component={renderField} type="text" label='Room :'/>
			<Field name="description" component={renderField} type="text" label='Description :'/>
			<Field name="start" component={renderField} type="text" label='Start Time :'/>
			<Field name="end" component={renderField} type="text" label='End Time :'/>
			<Field name="day" component={renderField} type="text" label='Day :'/>
			<Field name="maxenergy" component={renderField} type="text" label='Maximun Energy :'/>
			<div>
		    	<Button type='submit' bsStyle="primary" disabled={submitting}>Submit</Button>
		    	{' '}
		    	<Button type='reset' bsStyle="danger" disabled={submitting} onClick={reset}>Reset</Button>
		    </div>
	    </form>
	)
}

export default FormUser