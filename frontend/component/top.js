import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import { FirebaseApp } from '../index.js'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

export default class Top extends React.Component {

  constructor(props) {
    super(props);

    this.database = FirebaseApp.database().ref("/topics");

    this.onChangeInputTitle = this.onChangeInputTitle.bind(this);
    this.onChangeInputUrl = this.onChangeInputUrl.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.click = this.click.bind(this);

    this.state = {
      inputTitle: "",
      inputUrl: "",
      topics: [ ]
    }

  }

  componentWillMount() {
    this.databaseOnBind();
  }

  componentWillUnmount() {
  }

  databaseOnBind() {
    this.database.startAt().on("child_added", (snapshot) => {
      let topics = this.state.topics;
      topics.unshift(snapshot);
      this.setState({
        topics: topics
      });
    }).bind(this);
  }

  onChangeInputTitle(e) {
    this.setState({inputTitle: e.target.value});
  }

  onChangeInputUrl(e) {
    this.setState({inputUrl: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();

    let title = this.state.inputTitle;
    let url = this.state.inputUrl;

    if (title.trim().length !== 0 && url.trim().length !== 0) {
      this.pushTopic(title, url);
    }
  }

  pushTopic(title, url) {
    this.database.push({
      title: title,
      url: url
    })
  }

  click() {
    console.log("--------------------- ");
  }

  render() {

    let form = ( 
        <div>
          <form onSubmit={this.handleSubmit}>
             <div>
              <input className="mdl-textfield__input" type="text" id="TitleText" onChange={this.onChangeInputTitle} />
              <label className="mdl-textfield__label" htmlFor="TitleText">Name...</label>
            </div>
            <div className="FormField mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input className="mdl-textfield__input" id="UrlBody" onChange={this.onChangeInputUrl} rows="6" />
              <label className="mdl-textfield__label" htmlFor="UrlBody">Body...</label>
            </div>
            <input className="FormButton mdl-button mdl-js-button mdl-button--raised" type="submit" value=" save "></input>
          </form>
        </div> 
    )

    let list = _.map(this.state.topics, (i) => {
       return (
             <li className="mdl-list__item">
               <span className="mdl-list__item-primary-content">
                 { i.val().title }
               </span>
               <Link className="mdl-list__item-secondary-action" to={"/chat/" + i.val().url}>
                 <i className="material-icons"> >> </i></Link>
             </li>
       )
    })

    return (
        <div>
          <h2>Topics List</h2>
          <ul className="mdl-list">
            { list }
          </ul>
        </div>
    )
  }

}

