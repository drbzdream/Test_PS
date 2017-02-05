import React from 'react'
import {
	Router,
	Route,
	IndexRoute,
	Redirect
} from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import App from 'containers/App'
import {
	ListUser,
	AddUser,
	EditUser
} from 'containers/users'
import {
	Building,
	EachBuilding,
	Floor,
	Room
} from 'containers/electrics'
import {
	EachDevice,
	EditDevice
}from 'containers/devices'
import {
	Schedule
}from 'containers/schedule'
import Test from 'containers/test'
import Test2 from 'containers/Test2'






export default (store, history) => (
	<Router history={syncHistoryWithStore(history, store)}>
		<Route path='test2' component={Test2} />
		<Route path='/' component={App}>
			<IndexRoute component={Building} />
		</Route>
		<Route path='/infodevice' component={App}>
			<IndexRoute component={Room} />
			<Route path='editdevice' component={EditDevice} />
		</Route>
		<Route path='/schedule' component={App}>
			<IndexRoute component={Test} />
		</Route>
	</Router>
)