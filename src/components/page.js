import React from 'react';
page('/', () => {
  ReactDOM.render(
    <App>
      <ChatContainer />
    </App>.
    document.getElementById('root')
  );
});

page('/login', () => {
 ReactDOM.render(
   <App>
    <LoginContainer />
   </App>.
   document.getElementById('root')
  );
});

//// Each Route takes a path prop. If the URL in the browser matches that path, the Route will render its 
// child component (the container); otherwise, it will render nothing.