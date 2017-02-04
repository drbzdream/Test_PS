import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'
import { push } from 'react-router-redux'
import actions from 'actions'
import { FormUser } from 'components/users'

const { patchUser } = actions

class EditUser extends Component {

    state = {}

    componentWillMount(){
    	if(!this.props.isFinished){
    		this.props.redirectToListUser()
    	}
    }

	render(){
		const { handleSubmit, reset, submitting } = this.props

		return (
			<div>
				<div className="page-header">
				  <h1>Edit User</h1>
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

EditUser = reduxForm({
	form: 'adduser',
	validate
})(EditUser)

const mapStateToProps = (state, ownProps) => ({
	initialValues: state.users.get.data.find(user => user.id == ownProps.params.user_id),
	isFinished: state.users.get.isFinished
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit(values) {
    dispatch(patchUser(ownProps.params.user_id, values))
  },
  redirectToListUser(){
    dispatch(push('/'))
  }
})

EditUser = connect(
	mapStateToProps,
	mapDispatchToProps
)(EditUser)

export default EditUser