import React from 'react';
import ListView from './components/ListView';
import PublishBtn from './components/PublishBtn';
import BottomNav from './components/BottomNav';
import TopBar from './components/TopBar';

function App() {
  return (
    <div className="App">
      <h1>Messaging App</h1>
      <TopBar />
      <BottomNav />
      <PublishBtn />
    </div>
  );
}

export default App;
