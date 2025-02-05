import React, { useState } from 'react';
import ScreenShare from './components/ScreenShare.jsx';
import ViewScreen from './components/ViewScreen.jsx';
import './App.css';
import RemoteScreen from './components/RemoteScreen';

function App() {
  const [mode, setMode] = useState('');

  return (
  <RemoteScreen/>
  );
}

export default App;
