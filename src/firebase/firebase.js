import firebase from 'firebase/app';
import 'firebase/database';
let config = {
	apiKey: "AIzaSyCACpQr0LoH4482IZnUCQpIAaE6GWa9Ky4",
	authDomain: "other-61580.firebaseapp.com",
	databaseURL: "https://other-61580.firebaseio.com",
	projectId: "other-61580",
	storageBucket: "other-61580.appspot.com",
	messagingSenderId: "383146077335",
	appId: "1:383146077335:web:1bb0414cbda8e925b58dd2"
};

let appSet = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
let db = appSet.database();
const players = db.ref('players/');
//-const storesMarkets = db.ref('storesMarkets/');


export { players };
