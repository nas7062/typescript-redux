import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ConnectToServer, disconnectFromServer, SendMessage } from '../socket/socket';
import { SetUsername, SetMessage ,SetIsConnect, AddMessage} from '../reducer/ChatSlice';
import styled from 'styled-components';
import { RootState } from '../store/store';
import { Link } from 'react-router-dom';
import { logout } from '../reducer/AuthSlice';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: space-between;

    h2 {
        text-align:center;
        font-size:2.5rem;
        margin:5px;
        color: #007bff;
    }
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background-color: #f1f1f1;
`;

const ChatWindow = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 10px;
    display: flex;
    flex-direction: column-reverse;
`;

const MessageContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Message = styled.div<{ isUser: boolean }>`
    align-self: ${props => (props.isUser ? 'flex-end' : 'flex-start')};
    background-color: ${props => (props.isUser ? '#dcf8c6' : '#dcdcdc')};
    border-radius: 10px;
    padding: 10px;
    max-width: 60%;
    word-break: break-word;
`;

const InputContainer = styled.div`
    display: flex;
    padding: 10px;
    background-color: #f1f1f1;
`;

const Input = styled.input`
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 10px;
`;

const Button = styled.button`
    padding: 10px 20px;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: #0056b3;
    }
`;

const Chatting = () => {
    const dispatch = useDispatch();
    const { username, message, dialog, isConnect } = useSelector((state: RootState) => state.chat);
    const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
    const chatWindowRef = useRef<HTMLDivElement>(null);
    console.log(dialog);
    useEffect(() => {
        return () => {
            if (isConnect) {
                disconnectFromServer();
                dispatch(SetIsConnect(false));
            }
        };
    }, [isConnect, dispatch]);
    useEffect(() => {
        const handleMessage = (msg: { username: string, message: string }) => {
            
            if (msg.username && msg.message) {
                dispatch(AddMessage(msg));
            } else {
                console.error('Unexpected message format:', msg);
            }
        };
        
        if (isConnect) {
            const socket = ConnectToServer(isAuthenticated ? user?.username || '' : username);
            socket.on('message', handleMessage);

            return () => {
                socket.off('message', handleMessage);
            };
        }
    }, [isConnect, dispatch, username, user, isAuthenticated]);
   
    useEffect(() => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    }, [dialog]);
    const handleSend = () => {
        if (message) {
            SendMessage(isAuthenticated ? user?.username || '' : username, message);
            dispatch(SetMessage(''));
        }
    };

    const handleConnect = () => {
        if ((isAuthenticated ? user?.username || '' : username, message) && !isConnect) {
            ConnectToServer(isAuthenticated ? user?.username || '' : username, message);
            dispatch(SetIsConnect(true));
        }
    };
    const handleDisconnect = () => {
        if (isConnect) {
            disconnectFromServer();
            dispatch(SetIsConnect(false));
        }
    };
    
    return (
        <Container>
            <Link to ="/"><h2>10012</h2></Link>
        <Header>
            {!isAuthenticated ? (
                <Input
                    type="text"
                    placeholder="사용자 이름 입력"
                    value={username}
                    onChange={(e) => {
                        dispatch(SetUsername(e.target.value));
                    }}
                />
            ) : (
                <div>{user&& user.username}님</div>
            )}
            <Button onClick={handleConnect}>연결</Button>
            <Button onClick={() => {
                handleDisconnect();
                if (isAuthenticated) dispatch(logout()); // 로그아웃 시 인증 상태 업데이트
            }}>
                연결 해제
            </Button>
        </Header>

        <ChatWindow ref={chatWindowRef}>
            <MessageContainer>
                {dialog.map((msg: any, index: number) => (
                    <Message key={index} isUser={msg.username === (isAuthenticated ? user.username : username)}>
                        <strong>{msg.username}:</strong> {msg.message}
                    </Message>
                ))}
            </MessageContainer>
        </ChatWindow>

        <InputContainer>
            <Input
                type="text"
                placeholder="메시지 입력"
                value={message}
                onChange={(e) => dispatch(SetMessage(e.target.value))}
            />
            <Button onClick={handleSend}>전송</Button>
        </InputContainer>
    </Container>
    );
};

export default Chatting;
