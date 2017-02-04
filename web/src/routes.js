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





export default (store, history) => (
	<Router history={syncHistoryWithStore(history, store)}>
		<Route path='/' component={App}>
			<IndexRoute component={Building} />
			<Route path='test' component={Test} />
			<Route path='eachbuilding' component={EachBuilding} />
			<Route path='floor' component={Floor} />
			<Route path='room' component={Room} />
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