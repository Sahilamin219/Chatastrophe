import React , { Component } from 'react';
import './app.css';
import { Route , withRouter} from 'react-router-dom';
import LoginContainer from './LoginContainer';
import ChatContainer from './ChatContainer';
import UserContainer from './UserContainer';

// const property = object.property;
// const {property} = object;

// const App = () => {
// 	return <h1> Hello from React making edits!! </h1>
// };

class App extends Component	{
	// greating = "hello from react class !!";
	// logGreatinng = () => {
	// console.log("hello from method");}
	state = { 
		user: null, 
		messages: [], 
		messagesLoaded: false 
	};
	onMessage = (snapshot) => 
	{
		const messages = Object.keys(snapshot.val()).map(key => {
			const msg = snapshot.val()[key];
			msg.id = key;
			return msg;
		});
		console.log(messages);
		this.setState( {messages} );
	};
	componentWillMount(){ console.log( '1' ); }
	componentDidMount() {
		console.log( '2' );
		// this.state.user==null;if user logs out
		firebase.auth().onAuthStateChanged((user) => {//firebase.auth().onAuthStateChanged in our App#componentDidMount listens for changes in our current user, and updates the state.user of our App.
			if(user){
				this.setState( {user : user });
			}
			else {
				// Our App isn't the child of a Route, so it doesn't get access to the history prop that we used in LoginContainer
				this.props.history.push('/login');
			}
		});
		// Doing the same thing with our messages references 
		firebase.database().ref('/messages').on('value', snapshot => {
			console.log(snapshot.val());//messageID is the key in snapshot.val()
			this.onMessage(snapshot);
		});
		// We use the .on function to listen for a 'value' event from the database. Our callback is then called with an argument called snapshot. 
		// Lets plug this in and send another message, and take a look at what our snapshot looks like:
	}
	componentWillReceiveProps(){ console.log( '2' ); }
	componentWillUpdate(){ console.log( '3' ); }
	componentDidUpdate(){ console.log( '4' ); }
	componentWillUnmount(){ console.log( '5' ); }
	// method As the name suggests, after all the elements of the page is rendered correctly, 
	// this method is called. After the markup is set on the page, this technique called by React itself to 
	// either fetch the data from An External API or perform some unique operations which need the JSX elements.

	handleSubmitMessage = (msg) => {
		// send to database
		console.log(msg);
		const data = {
			msg,
			author : this.state.user.email,
			user_id : this.state.user.uid,
			timestamp : Date.now()
		};
		firebase.database().ref('messages/').push(data);
	};
	render()
	{
		return (
			<div id="container" className="inner-container">
			<Route
			  exact = {true}
			  path="/"
			  render={
			  	() => <ChatContainer 
			  	onChange={this.handleSubmitMessage}
			  	messagesLoaded={this.state.messagesLoaded}
              	onSubmit={this.handleSubmitMessage }
              	user={this.state.user}
              	messages={this.state.messages} 
			  	/>}
			/>
			<Route path='/login' component={LoginContainer}/>
			<Route path='/users/:id' component={UserContainer}/>
			</div>
		);
	}
}
export default withRouter(App);


/// withRouter is a function that takes a component as an argument and returns that component exactly as it was,
// except that now it has access to the history prop. We'll cover more on that as we move on, but let's finish this logout flow first.



// It turns out that the React Router provides three distinct methods of rendering components inside Route.
// The simplest way is the route (ha ha) we chose earlier, passing it in as a prop called component.

// There's' another, better way for our purposes--a prop called render, into which we pass a function that returns our component.
// The third way to render a component inside Route is via a prop called children, which takes a function with a match argument, 
// which is either defined or null, depending on whether the path prop matches the browsers URL. 
// The JSX returned by the function is always rendered, but you can modify it based on the match argument.


// --User One side Chat
// This uses ES6 string interpolation along with short-circuit evaluation to create the effect we want. Those are the fancy terms for what boils 
// down to this: if the message author matches the user email in state, set the className to message mine; 
// otherwise, set it to message.