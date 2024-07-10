
import  { useEffect } from 'react';
import './App.css'
import { RootState } from './store/store';
import {  useSelector } from 'react-redux';
import { ConnectToServer, disconnectFromServer } from './socket/socket';
import Main from './pages/Main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Feed from './pages/Feed';
import FeedDetail from './pages/FeedDetail';


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
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Main/>}/>
        <Route path='/feed' element={ <Feed/>}/>
        <Route path='/feed/:id' element={ <FeedDetail/>}/>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
