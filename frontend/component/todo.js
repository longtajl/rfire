import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';

export default class Todo extends React.Component {

  constructor(props) {
    super(props)
    this.click = this.click.bind(this)
  }

  click() { 
    this.props.remove(this.props.item.key);
  }

  render() {
    let item = this.props.item.val();
    return (
        <li>{item.title} {item.body}
          <span style={{ color: 'red', marginLeft: '10px', cursor: 'pointer' }} onClick={this.click}>X</span>
        </li>
    );
  }

}
