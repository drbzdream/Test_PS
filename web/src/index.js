import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Root from 'Root'
import * as firebase from 'firebase'

const rootEl = document.getElementById('root')

var config = {
    apiKey: "AIzaSyBqexk4_Dx9W7vOlC8g3tlgF_MFWifkYzg",
    authDomain: "energy-seniorproject.firebaseapp.com",
    databaseURL: "https://energy-seniorproject.firebaseio.com",
    storageBucket: "energy-seniorproject.appspot.com",
    messagingSenderId: "350224705659"
  };
  firebase.initializeApp(config);

render(
	<AppContainer>
		<Root />
	</AppContainer>,
	rootEl
)

if (module.hot) {
  module.hot.accept('Root', () => {
    const NextRootApp = require('Root').default
    
    render(
      <AppContainer>
         <NextRootApp />
      </AppContainer>,
      rootEl
    )
  })
}
