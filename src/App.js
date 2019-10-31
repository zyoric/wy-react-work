import React, { useState } from 'react';
import './App.css';
import InputNumber from './components/InputNumber/index';
import { Modal } from './components/Modal';

function App() {
  const [value] = useState(333);
  return (
    <div className="cont">
      <div>受控组件：<InputNumber value={value} onChange={e=>{}}/></div>
      <div>非受控组件：<InputNumber defaultValue={value} onChange={e=>{}}/></div>
      <div className="modal-btn" onClick={()=> showConfirm()}>modal confirm</div>
      <div className="modal-btn" onClick={()=> showInfo()}>modal info</div>
    </div>
  );
}

async function showConfirm() {
  const res = await Modal.confirm('确认退出游戏吗？');
  console.log('showConfirm', res);
}

async function showInfo() {
  const res = await Modal.info('默认3秒后关闭');
  console.log('showInfo', res);
}

export default App;
