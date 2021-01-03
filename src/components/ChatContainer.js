import React, { Component } from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';

export default class ChatContainer extends Component {
	state = { newMessage: '' };
	handleInputChange = (event) => {
		this.setState( {newMessage : event.target.value } );
		console.log("you pressed the fly")
	};
	handleLogout = () => {
		console.log('user get Lost');
		firebase.auth().signOut();
	};
	handleSubmit = () => {
		console.log("PROPS ON SUBMIT", this.props)
		this.props.onSubmit(this.state.newMessage);
		this.setState( {newMessage:''} );
	};
	handleKeyDown = (event) => {
		if(event.key === 'Enter'){
			event.preventDefault();
			this.handleSubmit();
		}
	};
	getAuthor = (msg,  nextMsg) => {
		if( !nextMsg || nextMsg.author !== msg.author){
			return(
				<p className="author">
    				<Link to={`/users/${msg.user_id}`}> {msg.author}</Link>
    			</p>
			);
		}
	};
  render() {
  	console.log("PROPS",this.props)
    return (
    	<div id='ChatContainer' className="inner-container">
    	<Header>
    		<button onClick={this.handleLogout} className="red">Logout</button>
    	</Header>
    	<h1>Hello from ChatContainer</h1>
    	<div id='message-container'>
    		{
    			this.props.messages.map( (msg,i) => (
    			<div key={msg.id} className={`message ${this.props.user.email === msg.author && 'mine'}`}>
    				<p>{msg.msg}</p>
    				{
    					this.getAuthor(msg, this.props.messages
    					[i+1])
    				}
    			</div>
    			))
    		}
    	</div>
    	<div id='chat-input'>
    		<textarea placeholder="Say hi to sahil ..." onChange={this.handleInputChange} value={this.state.newMessage} onKeyDown={this.handleKeyDown}/>
	    	<button onClick={this.handleSubmit}>
	    		<svg viewBox="0 0 24 24">
	       			<path fill="#424242" d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
	     		</svg>
	     	</button>
     	</div>
    	</div>
   );
  }
}

/// We can take advantage of the Route history prop and use that to do a conditional rendering of the Logout button based on the URL
// (if the path is "/", render the button, otherwise don't!). However, that can be messy 


	
	// Our chat view will have two main sections:
    // A message display where all chats are listed
    // A chat box for the user to type in a new message


// However, we also want to let users submit by pressing Enter. How can we do so?
// At the moment, we listen for the change event on the textarea, and then call the handleInputChange method.
// The prop on textarea that listens for changes in its value is onChange, but there's another event, key-down'
// which occurs whenever the user presses a key.



// The map function goes over each element in the messages array, and creates a div based on its data. 
// When its done iterating, it returns that array of divs, which is then displayed as part of our JSX.
// One of the quirks of React is that each element on the screen needs a unique identifier so that React 
// can update it properly. Thats hard for React to do when dealing with a collection of the same elements, 
// as we are creating here. Thus, we have to give each message div a key prop that is guaranteed to be unique.



// For displaying msg autor : The [to] prop on the Link uses ES6 string interpolation. If you wrap your string in 
// backticks (`) instead of quotation marks, you can use ${VARIABLE} to embed variables right into it. ....<div key={msg.id} className="message">