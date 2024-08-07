import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { setuser } from "../reducer/AuthSlice";
import styled from "styled-components";
import { getUserGoalParticipations, getUserParticipations, removeGoalParticipation, removeStudyParticipation } from "../components/api";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const ProfileImage = styled.div<{ src?: string }>`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background-color: #ccc;
  background-image: url(${(props) => props.src || ''});
  background-size: cover;
  background-position: center;
  margin-bottom: 20px;
`;

const UserName = styled.div`
  font-size: 1.5rem;
  margin-bottom: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #17a2b8;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
  &:hover {
    background-color: #138496;
  }
    margin:20px 20px;
`;

const ListItem = styled.div`
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const Input = styled.input`
    width:250px;
    height:30px;
    margin:20px 20px;
`
const Mypage: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [participations, setParticipations] = useState<any[]>([]);
  const [goals, setgoals] = useState<any[]>([]);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [username, setUsername] = useState(user?.username || '');
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.uid) {
      getUserParticipations(user.uid).then(setParticipations);
      getUserGoalParticipations(user.uid).then(setgoals);
    }
  }, [user]);  // 사용자의 참여한 스터디와 목표 데이터를 가져와 상태를 업데이트합니다.

  const handleRemoveParticipation = async (studyId: string) => {
    if (user?.uid) {
      await removeStudyParticipation(user.uid, studyId);
      setParticipations(participations.filter(p => p.id !== studyId)); 
    }
  }; //해당스터디 제거하는 함수 

  const handleStudyClick = (studyId: string) => {
    
    if (!isNaN(Number(studyId))) 
      navigate(`/study/${studyId}`);
    else
      navigate(`/studys/${studyId}`);
   
  }; // studyId가 숫자인 경우와 그렇지 않은 경우에 따라 다른 경로로 이동
  const handleRemoveGoal = async (Id: string) => {
    if (user?.uid) {
      await removeGoalParticipation(user.uid, Id);
      setgoals(participations.filter(p => p.id !== Id)); // Remove from local state
    }
  };// 해당 챌린지 제거하는 함수 

  const handleGoalClick = (Id: string) => {
    if (!isNaN(Number(Id)))
      navigate(`/chal/${Id}`);
    else
      navigate(`/chals/${Id}`);
  };// Id가 숫자인 경우와 그렇지 않은 경우에 따라 다른 경로로 이동

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  }; // 선택된 파일을 이미지 상태로 설정하는 함수

  const handleUpload = async () => {
    if (!image || !user) return; // 선택된 이미지나 접속유저가 없을시 종료

    const storageRef = ref(storage, `profiles/${user.uid}/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    // Firebase 스토리지에 프로필 이미지를 업로드
    uploadTask.on(
      'state_changed',
      (snapshot) => { },
      (error) => {console.error(error);},
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        await updateDoc(doc(db, 'users', user.uid), {
          username: username,
          profileImage: downloadURL,
        }); 
        dispatch(setuser({ ...user, username, profileImage: downloadURL }));
      }

    );
    setUsername("");
  };
  return (
    <>
      <Header />
      <Container>

        <ProfileImage src={user?.profileImage} />
        <UserName>{user?.username}</UserName>
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="사용자 이름"
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <Button onClick={handleUpload}>프로필 수정</Button>
        {participations.map((participation) => (
          <ListItem key={participation.id} onClick={() => handleStudyClick(participation.id)}>
            <h2>{participation.title}</h2>
            <Button onClick={(e) => { e.stopPropagation(); handleRemoveParticipation(participation.id); }}>제거</Button>
          </ListItem>
        ))}

        {goals.map((goal) => (
          <ListItem key={goal.id} onClick={() => handleGoalClick(goal.id)}>
            <h2>{goal.title}</h2>
            <Button onClick={(e) => { e.stopPropagation(); handleRemoveGoal(goal.id); }}>제거</Button>
          </ListItem>
        ))}
      </Container>
    </>
  );
}

export default Mypage;