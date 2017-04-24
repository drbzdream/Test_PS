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
	Building,
	Room
} from 'containers/electrics'
import {
	Schedule,
	AddUser,
	AddEnergy,
	EditSchedule,
	EditEnergy
}from 'containers/schedule'
import {
	realtimeEnergy
} from 'containers/realtime'
import Test from 'containers/test'
import Eiei from 'containers/Eiei'





export default (store, history) => (
	<Router history={syncHistoryWithStore(history, store)}>
		<Route path='user/:id/edit' component={Eiei} />
		<Route path='/' component={App}>
			<IndexRoute component={Building} />
		</Route>
		<Route path='/realtime-energy' component={App}>
			<IndexRoute component={realtimeEnergy} />
		</Route>
		<Route path='/infodevice' component={App}>
			<IndexRoute component={Room} />
		</Route>
		<Route path='/schedule' component={App}>
			<IndexRoute component={Test} />
			<Route path='addschedule' component={AddUser} />
			<Route path='addenergy-rule' component={AddEnergy} />
			<Route path='editschedule/:id' component={EditSchedule} />
			<Route path='editenergy/:id' component={EditEnergy} />
		</Route>
	</Router>
)