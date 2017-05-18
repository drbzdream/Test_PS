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
	energyConsump,
	Resource
} from 'containers/electrics'
import {
	Notification,
	AddSchedule,
	AddEnergy,
	EditSchedule,
	EditEnergy
}from 'containers/schedule'
import {
	realtimeEnergy
} from 'containers/realtime'






export default (store, history) => (
	<Router history={syncHistoryWithStore(history, store)}>
		<Route path='/' component={App}>
			<IndexRoute component={energyConsump} />
		</Route>
		<Route path='/realtime-energy' component={App}>
			<IndexRoute component={realtimeEnergy} />
		</Route>
		<Route path='/infodevice' component={App}>
			<IndexRoute component={Resource} />
		</Route>
		<Route path='/schedule' component={App}>
			<IndexRoute component={Notification} />
			<Route path='addschedule' component={AddSchedule} />
			<Route path='addenergy-rule' component={AddEnergy} />
			<Route path='editschedule/:id' component={EditSchedule} />
			<Route path='editenergy/:id' component={EditEnergy} />
		</Route>
	</Router>
)