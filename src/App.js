import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import InputNumber from './components/InputNumber/index';

function App() {
  const [value,setValue] = useState(333);
  return (
    <div className="cont">
      <InputNumber value={value} onChange={e=>{}}/>
      <InputNumber defaultValue={value} onChange={e=>{}}/>
    </div>
  );
}

export default App;
