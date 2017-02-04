import mqtt from 'mqtt'
import firebase from 'firebase'
import config from './config'

const configFirebase = () => {
	const config = {
		apiKey: "AIzaSyBqexk4_Dx9W7vOlC8g3tlgF_MFWifkYzg",
		authDomain: "energy-seniorproject.firebaseapp.com",
		databaseURL: "https://energy-seniorproject.firebaseio.com",
		storageBucket: "energy-seniorproject.appspot.com",
		messagingSenderId: "350224705659"
	}
	firebase.initializeApp(config)
}

const client = mqtt.connect(config.mqtt)

client.on('connect', () => {
	console.log('connected')
	client.subscribe('/a')
	configFirebase()
})
 
client.on('message', (topic, payload) => {
	let msg = payload.toString()
	console.log(msg)

	///////////////// ใส่ข้อมูล
	let x = firebase.database().ref('test/eiei')
	x.push({
			data: msg
	})


	///////////////// once ดึงครั้งเดียว
	// firebase.database().ref('test')
	// 	.once('value')
	// 	.then((snapshot) => {
	// 		console.log(snapshot.val())
	// 	})	


	/////////////// on ดึงตลอดเวลา		
	// firebase.database().ref('test')
	// .on('value', (snapshots) => {
	// 		console.log(snapshots.val())
	// 	})

})