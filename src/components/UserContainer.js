import React, { Component } from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';

export default class UserContainer extends Component {
  render() {
    return (
      <div id="UserContainer">
        <Header>
        	<Link to="/">
        	<button className="red">Back To Chat</button>
        	</Link>
        </Header>
        <h1> Hello from UserContainer for user {this.props.match.params.id} </h1>
      </div>
    );
  }
}

/// It's called Link, and it's just like a tag in HTML, but is optimized for React Router.









    // Users should be able to view their messages even when offline
    // Users should receive push notifications when a message is sent by another user
    // Users should be able to install the app to their mobile device
    // Users should be able to load the app in under five seconds, even under shaky network conditions
    // Users should be able to send and receive messages in real time
    // Users should be able to view all messages by a given author