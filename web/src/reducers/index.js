import { combineReducers } from 'redux'
import { routerReducer  } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import users from 'reducers/userReducer'
import PowerResourceReducers from 'reducers/PowerResourceReducers'

export default combineReducers({
	routing: routerReducer,
	form: formReducer,
	users,
	power_resources: PowerResourceReducers
})