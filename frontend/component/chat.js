import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import { firebaseConfig } from '../firebase/config.js';
import Item from './item.js';
import { FirebaseApp } from '../index.js';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';
import ChatListItem from './chat_list_item.js'
import LinearProgress from 'material-ui/LinearProgress';

export default class Chat extends React.Component {

  constructor(props) {
    super(props);

    let url = props.match.params.url;

    this.database = FirebaseApp.database().ref("/chats/" + url)

    this.onChangeInputName = this.onChangeInputName.bind(this);
    this.onChangeInputBody = this.onChangeInputBody.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = { 
      items: [],
      inputName: "",
      inputBdy: ""
    };

  }

  componentWillMount() {
    this.databaseOnBind();
  }

  componentWillUnmount() {
    this.database.off();
  }

  databaseOnBind() {
    this.database.startAt().on("child_added", (snapshot) => {
      let items = this.state.items;
      items.unshift(snapshot);
      this.setState({
        items: items
      });
    }).bind(this);

    this.database.on("child_removed", (snapshot) => {
      let items = this.state.items;
      items = _.remove(items, function(i) { return i.key !== snapshot.key });
      this.setState({
        items: items
      });
    }).bind(this);

    this.database.on("child_moved", (childSnapshot, prevChildKey) => {
      console.log("child_moved");
    }).bind(this);

    this.database.on("child_changed", (childSnapshot) => {
      console.log("child_changed");
    }).bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    let name = this.state.inputName;
    let body = this.state.inputBody;

    if (name.trim().length !== 0 && body.trim().length !== 0) {
      this.pushItem(name, body);
    }

  }

  pushItem(name, body) {
      this.database.push({
          name: name, 
          body: body, 
          date: new Date().getTime()
      })
  }

  removeItem(key) {
      if (key.lenght !== 0) {
          this.database.child(key).remove();
      }
  }

  onChangeInputName(e) {
      this.setState({inputName: e.target.value});
  }

  onChangeInputBody(e) {
      this.setState({inputBody: e.target.value});
  }

  render() {

    let form = (
        <div className="Form">
          <form onSubmit={this.handleSubmit}>
            <TextField 
                hintText="Name"
                fullWidth={true}
                onChange={this.onChangeInputName} /><br/>

            <TextField 
                multiLine={true}
                rows={3}
                fullWidth={true}
                onChange={this.onChangeInputBody}
                hintText="Text....  " /><br/><br/>

             <FlatButton type="submit" label=" Post " fullWidth={true} />

          </form>
        </div>
    )

    let listItems = _.map(this.state.items, (e, i) => {
        return (
            <ChatListItem name={e.val().name} index={i} body={e.val().body} />
        );
    });

    return (
        <div>
            <MuiThemeProvider>
                { form }
            </MuiThemeProvider>

            <MuiThemeProvider>
                <LinearProgress mode="indeterminate" />
            </MuiThemeProvider>

            <MuiThemeProvider>
                <List>
                    <Subheader>Chat Room</Subheader>
                    { listItems }
                </List>
            </MuiThemeProvider>
        </div>
    )
  }

}

