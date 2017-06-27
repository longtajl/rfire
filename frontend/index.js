import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import { firebaseConfig } from './firebase/config.js';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const database = firebaseApp.database().ref("/rooms/three")

import Item from './component/item.js'

class TodoList extends React.Component {

  constructor(props) {
    super(props);

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
    database.off();
  }

  databaseOnBind() {
    database.startAt().on("child_added", (snapshot) => {
      let items = this.state.items;
      items.unshift(snapshot);
      this.setState({
        items: items
      });
    }).bind(this);

    database.on("child_removed", (snapshot) => {
      let items = this.state.items;
      items = _.remove(items, function(i) { return i.key !== snapshot.key });
      this.setState({
        items: items
      });
    }).bind(this);

    database.on("child_moved", (childSnapshot, prevChildKey) => {
      console.log("child_moved");
    }).bind(this);

    database.on("child_changed", (childSnapshot) => {
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
    database.push({
      name: name, 
      body: body, 
      date: new Date().getTime()
    })
  }

  removeItem(key) {
    if (key.lenght !== 0) {
      database.child(key).remove();
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
            <div className="FormField mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input className="mdl-textfield__input" type="text" id="NameText" onChange={this.onChangeInputName} />
              <label className="mdl-textfield__label" htmlFor="NameText">Name...</label>
            </div>
            <div className="FormField mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <textarea className="mdl-textfield__input" id="NameBody" onChange={this.onChangeInputBody} rows="6" />
              <label className="mdl-textfield__label" htmlFor="NameBody">Body...</label>
            </div>
            <input className="FormButton mdl-button mdl-js-button mdl-button--raised" type="submit" value=" save "></input>
          </form>
        </div>
    )

    let list = _.map(this.state.items, (i) => {
      return <Item item={i} remove={this.removeItem} key={i.key} />;
    });

    return (
      <div>
        { form }

        <div className="Snippet-captions">
          <div className="Snippet-caption">Simple list</div>
        </div>

        <div className="List">
          <ol className="mdl-list">
            { list }
          </ol>
        </div>
      </div>
    )
  }

}

ReactDOM.render(<TodoList />, document.getElementById('content'));

