
import  { useEffect } from 'react';
import './App.css'
import { RootState } from './store/store';
import {  useSelector } from 'react-redux';
import { ConnectToServer, disconnectFromServer } from './socket/socket';

import ConnectionState from './components/ConnectionState';
import MessageForm from './components/MessageForm';
import MessageList from './components/MessageList';

function App() {
    
    const {username,isConnect} = useSelector((state:RootState)=>state.chat);

    useEffect(()=>{
        if(isConnect && username){
          ConnectToServer(username);
        }
        return ()=>{
          disconnectFromServer();
        }
    },[isConnect,username])  
   
  return (
    <>
      <ConnectionState/>
      <MessageForm/>
      <MessageList/>
    </>
  )
}

export default App
