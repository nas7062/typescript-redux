import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { SetIsConnect } from "../reducer/ChatSlice";
const ConnectionState: React.FC = () => {
    const dispatch = useDispatch();
    const isConnect = useSelector((state: RootState) => state.chat.isConnect);

    const ConnectHandler = () => {
        dispatch(SetIsConnect(true));
    }
    const DisConnectHandler = () => {
        dispatch(SetIsConnect(false));
    }

    return (
        <div>
            <p>{isConnect ? "접속중" : "미접속"}</p>
            <button onClick={ConnectHandler}>접속</button>
            <button onClick={DisConnectHandler}>접속종료</button>
        </div>
    );
}

export default ConnectionState;