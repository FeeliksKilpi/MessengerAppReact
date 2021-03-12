import React from 'react';
import PublishBtn from './components/PublishBtn';
import BottomNav from './components/BottomNav';

function App() {
  return (
    <div className="App">
      <h1 style={{textAlign: 'center'}}>Felipe's Messaging Client</h1>
      <BottomNav />
      <PublishBtn />
    </div>
  );
}

export default App;
