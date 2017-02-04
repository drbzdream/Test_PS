import { CALL_API } from 'redux-api-middleware'
import { push } from 'react-router-redux'

export default (id, data) => dispatch => dispatch({
	[CALL_API]: {
		endpoint: `${process.env.API_SERVER}/users/${id}`,
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		method: 'PATCH',
		body: JSON.stringify(data),
		types: [
			'PATCH_USER_REQUEST',
			{
	            type: 'PATCH_USER_SUCCESS',
	            payload: (action, state, res) => {
					return res.json().then((json) => {
						dispatch(push(`/`))
						return json
					})
	            }
			},
			'PATCH_USER_FAILURE'
	    ]
	}
})