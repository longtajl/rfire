import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import { FirebaseApp } from '../index.js';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

export default class Top extends React.Component {

  constructor(props) {
    super(props);

    this.database = FirebaseApp.database().ref("/topics");

    this.onChangeInputTitle = this.onChangeInputTitle.bind(this);
    this.onChangeInputUrl = this.onChangeInputUrl.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.chatToPage = this.chatToPage.bind(this);

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

  chatToPage(url) {
    this.props.history.push('/chat/' + url)
  }

  render() {

    let topics = this.state.topics;
    let size = topics.length * 2;
    let listItems = _.map(Array.apply(null, Array(size)), (e, i) => {
        if (i % 2 == 0) {
          let topic = topics[i/2].val();
          return (
                <ListItem primaryText={topic.title} key={i}
                    onClick={(e) => { this.chatToPage(topic.url) }}/>
          );
        } else {
          return (
              <Divider inset={false} key={i} />
          );
        }
    });

    return (
        <div>
          <MuiThemeProvider>
          <List>
            <Subheader>Topic List</Subheader>
            { listItems }
          </List>
          </MuiThemeProvider>
        </div>
    )

  }

}

