
import { useEffect } from 'react';
import './App.css'
import { RootState } from './store/store';
import { useDispatch, useSelector } from 'react-redux';
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
import Notice from './pages/Notice';
import NoticeDetail from './pages/NoticeDetail';
import ScrollToTop from './components/ScrollToTop';


function App() {

  const { username, isConnect } = useSelector((state: RootState) => state.chat);
  // useSelector 사용 store에서 chat 상태의 username과 isConnect 값을 추출
  const dispatch = useDispatch();
  useEffect(() => {
    if (isConnect && username) {
      ConnectToServer(username);
    }
    return () => {
      disconnectFromServer();
    } // 언마운트될 때 또는 isConnect나 username이 변경될 때 서버 연결을 해제.

  }, [isConnect, username])



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid); // Firestore에서  사용자의 문서 참조 가져옴.
        const userDocSnap = await getDoc(userDocRef); // 사용자의 문서
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();  // 문서가 존재할 경우 데이터를 가져엄.
          dispatch(setuser({ uid: user.uid, email: user.email, username: userData.username, profileImage: userData.profileImage }));
          // 사용자 정보를 setuser에  id,email,username,profileimage를 디스패치함.
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
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='/ch' element={<Challenge />} />
          <Route path='/study' element={<Study />} />
          <Route path='/feed/:id' element={<FeedDetail />} />
          <Route path='/chal/:id' element={<GoalDetail />} />
          <Route path='/feeds/:id' element={<FeedDetail2 />} />
          <Route path='/chals/:id' element={<GoalDetail2 />} />
          <Route path='/study/:id' element={<StudyDetail />} />
          <Route path='/studys/:id' element={<StudyDetail2 />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/login' element={<Login />} />
          <Route path='/chat' element={<Chatting />} />
          <Route path='/my' element={<Mypage />} />
          <Route path='/book' element={<BookMarkPage />} />
          <Route path='/notice' element={<Notice />} />
          <Route path='/notice/:id' element={<NoticeDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
