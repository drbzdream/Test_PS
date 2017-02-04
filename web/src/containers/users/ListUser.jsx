import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router' 
import { Button } from 'react-bootstrap'
import actions from 'actions'
import { TableListUser } from 'components/users'

const { getUsers, deleteUser } = actions

class ListUser extends Component {

	componentWillMount(){
		// this.props.getUsers()
	}

	shouldComponentUpdate(nextProps, nextState){
		return nextProps.users !== this.props.users
	}

	render(){
		return (
			<div>
				<div className="page-header">
				  <h1>List User <Link to='user/add'><Button bsStyle="info">Add</Button></Link></h1>
				</div>
				<br />
				<TableListUser users={this.props.users} deleteUser={this.props.deleteUser} />
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	users: state.users.get.data
})

const mapDispatchToProps = (dispatch) => ({
	getUsers() {
	    dispatch(getUsers())
	},
	deleteUser(id) {
		dispatch(deleteUser(id))
	}
})

ListUser = connect(
	mapStateToProps,
	mapDispatchToProps
)(ListUser)

export default ListUser