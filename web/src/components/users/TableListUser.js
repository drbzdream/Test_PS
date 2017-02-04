import React from 'react'
import { 
	Table,
	Button
} from 'react-bootstrap'
import { Link } from 'react-router' 
import { ColTableListUser } from 'components/users'

const TableListUser = ({ users, deleteUser }) => {
	return (
		<Table striped bordered condensed hover>
			<thead>
				<tr>
					<th>User ID</th>
					<th>Name</th>
					<th>Description</th>
					<th>Option</th>
				</tr>
			</thead>
			<tbody>
				{
					users.map((user, index) => {
						return (
							<ColTableListUser key={index} deleteUser={deleteUser} {...user} />
						)
					})
				}
			</tbody>
		</Table>
	)
}

export default TableListUser