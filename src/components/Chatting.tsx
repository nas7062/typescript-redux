import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ConnectToServer, disconnectFromServer, SendMessage } from '../socket/socket';
import { SetUsername, SetMessage ,SetIsConnect, AddMessage} from '../reducer/ChatSlice';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: space-between;
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
`;

const MessageContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Message = styled.div<{ isUser: boolean }>`
    align-self: ${props => (props.isUser ? 'flex-end' : 'flex-start')};
    background-color: ${props => (props.isUser ? '#dcf8c6' : '#fff')};
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
    const { username, message, dialog, isConnect } = useSelector((state: any) => state.chat);

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
            const socket = ConnectToServer(username);
            socket.on('message', handleMessage);

            return () => {
                socket.off('message', handleMessage);
            };
        }
    }, [isConnect, dispatch, username]);
   
    const handleSend = () => {
        if (message) {
            SendMessage(username, message);
            dispatch(SetMessage(''));
        }
    };

    const handleConnect = () => {
        if (username && !isConnect) {
            ConnectToServer(username);
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
            <Header>
                <Input
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => {
                        dispatch(SetUsername(e.target.value));
                    }}
                />
                <Button onClick={handleConnect}>Connect</Button>
                <Button onClick={handleDisconnect}>Disconnect</Button>
            </Header>

            <ChatWindow>
                <MessageContainer>
                    {dialog.map((msg: any, index: number) => (
                        <Message key={index} isUser={msg.username === username}>
                            <strong>{msg.username}:</strong> {msg.message}
                        </Message>
                    ))}

                    
                </MessageContainer>
            </ChatWindow>

            <InputContainer>
                <Input
                    type="text"
                    placeholder="Enter message"
                    value={message}
                    onChange={(e) => dispatch(SetMessage(e.target.value))}
                />
                <Button onClick={handleSend}>Send</Button>
            </InputContainer>
        </Container>
    );
};

export default Chatting;
