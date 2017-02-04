import { CALL_API } from 'redux-api-middleware'

export default (id) => dispatch => dispatch({
	[CALL_API]: {
		endpoint: `${process.env.API_SERVER}/users/${id}`,
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		method: 'DELETE',
		types: [
			'DELETE_USER_REQUEST',
			{
	            type: 'DELETE_USER_SUCCESS',
	            payload: (action, state, res) => {
					return res.json().then((json) => {
						return {
							id
						}
					})
	            }
			},
			'DELETE_USER_FAILURE'
	    ]
	}
})