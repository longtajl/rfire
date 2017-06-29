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
      <div>
        <nav className="">
          <Link to="/" className="mdl-navigation__link">Welcome</Link>
          <Link to="/top" className="mdl-navigation__link">Top</Link> 
          <Link to="/chat" className="mdl-navigation__link">Chat</Link>
        </nav>
      </div>
      <hr/>
      <Route exact path="/" component={Welcome}/>
      <Route path="/chat/:url" component={Chat}/>
      <Route path="/top" component={Top}/>
    </div>
  </Router>
)

const Welcome = () => (
  <div>
    <h2>Welcome</h2>
  </div>
)

ReactDOM.render(<Main />, document.getElementById('content'));

