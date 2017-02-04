import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'
import actions from 'actions'
import { FormUser } from 'components/users'

const { postUser } = actions

class AddUser extends Component {

    state = {}

	render(){
		const { handleSubmit, reset, submitting } = this.props

		return (
			<div>
				<div className="page-header">
				  <h1>Add User</h1>
				</div>
				<FormUser {...this.props} />
			</div>
		)
	}
}

const validate = values => {
	const { name, description } = values
	const errors = {}
	if (!name || name.trim() == '') {
    	errors.name = 'Required'
	}

	if (!description || description.trim() == '') {
    	errors.description = 'Required'
	}

	return errors
}

AddUser = reduxForm({
	form: 'adduser',
	validate
})(AddUser)

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  onSubmit(values) {
    dispatch(postUser(values))
  }
})

AddUser = connect(
	mapStateToProps,
	mapDispatchToProps
)(AddUser)

export default AddUser