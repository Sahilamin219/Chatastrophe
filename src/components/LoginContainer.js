import React, {Component} from 'react';
import Header from './Header';

class LoginContainer  extends Component{
	state={
		text:"Chatastrophe",
		email: '', 
		password: '',
		error:''
	};
	handleClick=()=>{
		this.setState({ text:"Chatastrophe is here"})
	};
	handleEmailChange=(event)=>{
		this.setState({ email:event.target.value});
	};
	handlePasswordChange=(event)=>{
		this.setState({ password:event.target.value});
	};
	onLogin(){
		//  // redirect to '/'
		this.props.history.push('/');
	}
	signup() {
	  firebase
	    .auth()
	    .createUserWithEmailAndPassword(this.state.email, this.state.password)
	    .then(res => {
	    	this.onLogin();
	      console.log(res);
	    })
	    .catch(error => {
	      console.log(error);
	      this.setState({ error: 'Error signing up.' });
	    });
	}
	login(){
		console.log("Hi")
		firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)	
		.then( res => { this.onLogin();console.log("authenitacted"); })
		// .catch( err => { console.log(err); })
		.catch( err => {
			console.log("Got error")
			console.log(err);
			if(error.code === 'auth/user-not-found'){
				// Sign up here.
				this.signup();
			}else{
				this.setState( { error: 'Error Logging in'});
			}
		})
	};
	handleSubmit = (event) => {
		// console.log(this.state);
		// Step 1. Check if user filled out fields
		// Step 2. If yes, try to log them in.
		// Step 3. If login fails, sign them up.
		event.preventDefault();
		this.setState({error :''});
		if (this.state.email && this.state.password) {
			// Try to log them in.
			this.login();
		}
		else {
			// display an error reminding them to fill out fields.
			this.setState({ error: 'Please fill in both fields.' });
		}
	};
	// firebase.auth().signInWithEmailAndPAssword(email, password, function(){
	// 	Do something when the sign in is complete.

	// 	***CallBack Hell
	// 	onLoginComplete(email, password, function() { 
	//     onLoginCompleteComplete('contrived example', function() {
	//       anotherFunction('an argument', function () {
	//         console.log('Help I'm in callback hell!');
	//       });
	//     });
	//   });
	// });
	render()
	{
		return (
			<div id="LoginContainer" className="inner-container">
			<Header/>
			<form onSubmit={this.handleSubmit}>
				<p>Sign in or sign up by entering your email and password.</p>
				<input type="text" onChange ={this.handleEmailChange} value={this.state.email} placeholder="Your email"/>
				<input type="password" onChange ={this.handlePasswordChange} value={this.state.password} placeholder="Your password"/>
				<p className="error">{this.state.error}</p>
				<button className="red light" type ="submit">Login</button>
			</form>
      		</div>
      );
	}
}

export default LoginContainer;
/// <div id="Header">
// <img src="/assets/icon-256.png" alt="logo"/>
// <h1 onClick={this.handleClick}>{this.state.text}</h1>
// </div>


// ---------------------
// You can try it by logging out the user in the callback of onAuthStateChanged with 
// firebase.auth().signOut();. Try logging in again, and then refreshing the page; 
// you should see the user object appear no matter how many times you refresh, 
// as you are automatically logged in.


// So, if we're at /login, and want to go to /: history.pushState(null, null, ‘/’)