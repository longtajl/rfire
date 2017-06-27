import React from 'react'
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import firebase from 'firebase';
import { firebaseConfig } from './firebase/config.js';

import Top  from './component/top.js'
import Chat from './component/chat.js'

export const FirebaseApp = firebase.initializeApp(firebaseConfig);

const Main = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/top">Top</Link></li>
        <li><Link to="/chat">Chat</Link></li>
      </ul>
      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/chat/:url" component={Chat}/>
      <Route path="/top" component={Top}/>

    </div>
  </Router>
)

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

ReactDOM.render(<Main />, document.getElementById('content'));

