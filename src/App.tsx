
import  { useEffect } from 'react';
import './App.css'
import { RootState } from './store/store';
import {  useDispatch, useSelector } from 'react-redux';
import { ConnectToServer, disconnectFromServer } from './socket/socket';
import Main from './pages/Main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Feed from './pages/Feed';
import FeedDetail from './pages/FeedDetail';
import FeedDetail2 from './pages/FeedDetail2';
import Challenge from './pages/Challenge';
import GoalDetail from './pages/GoalDetail';
import GoalDetail2 from './pages/GoalDetail2';
import Study from './pages/Study';
import StudyDetail from './pages/StudyDetail';
import StudyDetail2 from './pages/StudyDetail2';
import Auth from './components/Auth';
import Login from './components/Login';
import Chatting from './components/Chatting';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { logout, setuser } from './reducer/AuthSlice';
import Mypage from './pages/Mypage';
import BookMarkPage from './pages/BookMarkPage';


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
  
    const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          dispatch(setuser({ uid: user.uid, email: user.email, username: userData.username, profileImage: userData.profileImage }));
        }
      }
        else {
          dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
   
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Main/>}/>
        <Route path='/feed' element={ <Feed/>}/>
        <Route path='/ch' element={ <Challenge/>}/>
        <Route path='/study' element={ <Study/>}/>
        <Route path='/feed/:id' element={ <FeedDetail/>}/>
        <Route path='/chal/:id' element={ <GoalDetail/>}/>
        <Route path='/feeds/:id' element={ <FeedDetail2/>}/>
        <Route path='/chals/:id' element={ <GoalDetail2/>}/>
        <Route path='/study/:id' element={ <StudyDetail/>}/>
        <Route path='/studys/:id' element={ <StudyDetail2/>}/>
        <Route path='/auth' element={ <Auth/>}/>
        <Route path='/login' element={ <Login/>}/>
        <Route path='/chat' element={ <Chatting/>}/>
        <Route path='/my' element={ <Mypage/>}/>
        <Route path='/book' element={ <BookMarkPage/>}/>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
