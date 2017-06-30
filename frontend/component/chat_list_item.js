import React from 'react';
import ReactDOM from 'react-dom'
import {ListItem} from 'material-ui/List';

export default class ChatListItem extends React.Component {

    render() {
      return (
          <ListItem primaryText={this.props.name} 
              key={this.props.index}
              secondaryTextLines={0}
              secondaryText={
                <span>{this.props.body.split('\n').map((item, key) => {
                  return <span key={key}>{item}<br/></span> })}
                </span>
              } />
      )
    }

}
