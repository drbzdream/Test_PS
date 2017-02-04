import { CALL_API } from 'redux-api-middleware'
import { push } from 'react-router-redux'

export default (data) => dispatch => dispatch({
	[CALL_API]: {
		endpoint: `${process.env.API_SERVER}/users`,
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify(data),
		types: [
			'POST_USER_REQUEST',
			{
	            type: 'POST_USER_SUCCESS',
	            payload: (action, state, res) => {
					return res.json().then((json) => {
						dispatch(push(`/`))
						return json
					})
	            }
			},
			'POST_USER_FAILURE'
	    ]
	}
})