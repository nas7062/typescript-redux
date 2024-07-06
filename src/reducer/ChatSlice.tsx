import { createSlice,PayloadAction } from "@reduxjs/toolkit";

export interface MessageProps {
    username:string;
    message:string;
}
export interface ChatProps {
    dialog:MessageProps[];
    username:string;
    isConnect:boolean;
    message:string;
}
const initialState :ChatProps = {
    username : '',
    isConnect:false,
    message: '',
    dialog : [],
};

const ChatSlice = createSlice({
    name : 'Chat',
    initialState,
    reducers :{
        SetUsername : (state,action : PayloadAction<string>) =>{
            state.username =action.payload;
        },
        SetIsConnect : (state,action : PayloadAction<boolean>) =>{
            state.isConnect =action.payload;
        },
        SetMessage: (state, action: PayloadAction<string>) => {
            state.message = action.payload;
          },
        AddMessage: (state, action: PayloadAction<MessageProps>) => {
            state.dialog.push(action.payload);
          },

    },
});

export const {SetUsername,SetIsConnect,SetMessage,AddMessage} = ChatSlice.actions;

export default ChatSlice.reducer;
