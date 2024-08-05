import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { setuser } from "../reducer/AuthSlice";
import styled from "styled-components";
import { getUserParticipations, removeStudyParticipation } from "../components/api";
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

const LeaveButton = styled.div`
  margin-top: 20px;
  color: #dc3545;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
const Input = styled.input`
    width:250px;
    height:30px;
    margin:20px 20px;
`
const Mypage:React.FC = () =>{
    const [image, setImage] = useState<File | null>(null);
    const [participations, setParticipations] = useState<any[]>([]);
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const [username, setUsername] = useState(user?.username || '');
    const navigate = useNavigate();
    useEffect(() => {
      if (user?.uid) {
        getUserParticipations(user.uid).then(setParticipations);
      }
    }, [user]);
  
    const handleRemoveParticipation = async (studyId: string) => {
      if (user?.uid) {
        await removeStudyParticipation(user.uid, studyId);
        setParticipations(participations.filter(p => p.id !== studyId)); // Remove from local state
      }
    };
  
    const handleStudyClick = (studyId: string) => {
      navigate(`/study/${studyId}`);
    };
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        setImage(e.target.files[0]);
      }
    };
  
    const handleUpload = async () => {
      if (!image || !user) return;
  
      const storageRef = ref(storage, `profiles/${user.uid}/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
  
      uploadTask.on(
        'state_changed',
        (snapshot) => {},
        (error) => {
          // Handle error
          console.error(error);
        },
        async () => {
          // Handle successful upload
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await updateDoc(doc(db, 'users', user.uid), {
            username :username,
            profileImage: downloadURL,
          });
          dispatch(setuser({ ...user, username, profileImage: downloadURL }));
        }
        
      );
      setUsername("");
    };
    return(
        <>
        <Header/>
        <Container>
           
            <ProfileImage src={user?.profileImage}/>
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
        </Container>
        </>
    );
}

export default Mypage;