import React from 'react'
import { 
	Table,
	Button
} from 'react-bootstrap'
import { Link } from 'react-router' 

const ColTableListUser = ({ id, name, description, deleteUser }) => {
	return (
		<tr>
			<td>{id}</td>
			<td>{name}</td>
			<td>{description}</td>
			<td>
				<Link to={`user/${id}/edit`}><Button bsStyle="success">Edit</Button></Link>
				{' '}
				<Button bsStyle="danger" onClick={() => deleteUser(id)}>Delete</Button>
			</td>
		</tr>
	)
}

export default ColTableListUser