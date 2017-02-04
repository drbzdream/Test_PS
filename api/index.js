import mqtt from 'mqtt'
import config from './config'

const client = mqtt.connect(config.mqtt)

client.on('connect', () => {
	console.log('connected')
	client.subscribe('/a')
})
 
client.on('message', (topic, payload) => {
	let msg = payload.toString()
	console.log(msg)
})