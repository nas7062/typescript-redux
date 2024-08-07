import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import {registerUser} from "../reducer/AuthSlice";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const RegisterForm = styled.form`
  background: white;
  padding: 50px 100px;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  display: flex;
  flex-direction: column;
  gap: 15px;
  h2 {
    text-align:center;
  }
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  width:300px;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #2CE0BC;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
`;


const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading ,user} = useSelector((state: RootState) => state.auth);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registerUser({ email, password, username }));
  };
  
  useEffect(() => {
    if (user) {
      const timeout = setTimeout(() => {
        navigate('/');
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [navigate,user]);
  
  console.log(user);
  return (
    <RegisterContainer>
      <RegisterForm onSubmit={handleRegister}>
        <h2>회원가입</h2>
        <Input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="사용자 이름"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading} >
          {loading ? '회원가입 중...' : '회원가입'}
        </Button>
      </RegisterForm>
    </RegisterContainer>
  );
};

export default Auth;