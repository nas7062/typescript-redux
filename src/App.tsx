
import  { useEffect } from 'react';
import './App.css'
import { RootState } from './store/store';
import {  useSelector } from 'react-redux';
import { ConnectToServer, disconnectFromServer } from './socket/socket';
import Main from './pages/Main';

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
      <Main/>
    </>
  )
}

export default App
