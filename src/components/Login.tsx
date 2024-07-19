import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { loginUser } from '../reducer/AuthSlice';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const LoginForm = styled.form`
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
  p {
    font-size:0.8rem;
    color:grey;
    text-align:center;
  }
`;

const Input = styled.input`
  padding: 10px;
  width:300px;
  border: 1px solid #ccc;
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


const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading ,isAuthenticated } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };
  useEffect(() => {
    if (isAuthenticated) {
      const timeout = setTimeout(() => {
        navigate('/');
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [navigate,isAuthenticated]);

  
  return (
    <LoginContainer>
      <LoginForm onSubmit={handleLogin}>
        <h2>로그인</h2>
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
        <Button type="submit" disabled={loading}>
          {loading ? '로그인 중...' : '로그인'}
        </Button>
        <Link to={"/auth"}>
        <p>아이디가 없으신가요? 회원가입하러 가기</p>
        </Link>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;