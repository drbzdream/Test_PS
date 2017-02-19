import { CALL_API } from 'redux-api-middleware'
import { push } from 'react-router-redux'

export default (room='202', day='2015-02-28') => dispatch => dispatch({
	[CALL_API]: {
		endpoint: `${process.env.API_SERVER}/data?room=${room}&day=${day}`,
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		method: 'GET',
		types: [
			'GET_DATA_REQUEST',
			'GET_DATA_SUCCESS',
			'GET_DATA_FAILURE'
	    ]
	}
})