import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import { firebaseConfig } from './firebase/config.js';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const database = firebaseApp.database().ref("/items")

import Todo from './component/todo.js'

class TodoList extends React.Component {

  constructor(props) {
    super(props);

    this.onChangeInputTitle = this.onChangeInputTitle.bind(this);
    this.onChangeInputBody = this.onChangeInputBody.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSortClick = this.handleSortClick.bind(this);

    this.state = { 
      items: [],
      inputTitle: "",
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
    database.orderByChild("title").on("child_added", (snapshot) => {
      let items = this.state.items;
      items.push(snapshot);
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

    let title = this.state.inputTitle;
    let body = this.state.inputBody;
    if (title.trim().length !== 0 && body.trim().length !== 0) {
      this.pushItem(title, body);
    }

  }

  handleSortClick(e) {
    console.log("------------------- handleSortClick");
  }

  pushItem(title, body) {
    database.push({title: title, body: body})
  }

  removeItem(key) {
    if (key.lenght !== 0) {
      database.child(key).remove();
    }
  }

  onChangeInputTitle(e) {
    this.setState({inputTitle: e.target.value});
  }

  onChangeInputBody(e) {
    this.setState({inputBody: e.target.value});
  }

  render() {
    let form = (
        <div>
          <form className="" onSubmit={this.handleSubmit}>
            <input name="title" type="text" size="30" onChange={this.onChangeInputTitle}></input>
            <input name="body" type="text" size="60" onChange={this.onChangeInputBody}></input>
            <input type="submit" value="submit"></input>
          </form>  
        </div>)

    let list = _.map(this.state.items, (i) => {
      return <Todo item={i} remove={this.removeItem} key={i.key} />;
    });

    return (
      <div>
        <hr/>{ form }<hr/>
        <ol>{ list }</ol>
        <div><input type="button" value="sort" onClick={this.handleSortClick}/></div>
      </div>
    )
  }

}

ReactDOM.render(<TodoList />, document.getElementById('root'));
