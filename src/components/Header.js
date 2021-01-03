import React from 'react';

const Header = (props) => {
	return (
		<div id="Header">
		<img src="/assets/icon-256.png" atl="logo"/>
		<h1>Chatastrophe</h1>
		{props.children}
		</div>
	);
};
export default Header;