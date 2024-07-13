
import  { useEffect } from 'react';
import './App.css'
import { RootState } from './store/store';
import {  useSelector } from 'react-redux';
import { ConnectToServer, disconnectFromServer } from './socket/socket';
import Main from './pages/Main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Feed from './pages/Feed';
import FeedDetail from './pages/FeedDetail';
import FeedDetail2 from './pages/FeedDetail2';
import Challenge from './pages/Challenge';
import GoalDetail from './pages/GoalDetail';
import GoalDetail2 from './pages/GoalDetail2';


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
        <Route path='/ch' element={ <Challenge/>}/>
        <Route path='/feed/:id' element={ <FeedDetail/>}/>
        <Route path='/chal/:id' element={ <GoalDetail/>}/>
        <Route path='/feeds/:id' element={ <FeedDetail2/>}/>
        <Route path='/chals/:id' element={ <GoalDetail2/>}/>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
