import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';

export default class Item extends React.Component {

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
        <li className="mdl-list__item mdl-list__item--two-line">
          <span className="mdl-list__item-primary-content">
            <span>{item.name}</span>
            <span className="mdl-list__item-sub-title">{item.body}</span>
          </span>
          <span style={{ color: 'red', marginLeft: '10px', cursor: 'pointer' }} onClick={this.click}></span>
        </li>
    );
  }

}
