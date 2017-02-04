import { combineReducers } from 'redux'
import { routerReducer  } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import users from 'reducers/userReducer'

export default combineReducers({
	routing: routerReducer,
	form: formReducer,
	users
})