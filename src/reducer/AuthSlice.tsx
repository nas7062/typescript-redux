import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth, db } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface User {
  uid: string;
  email: string | null;
  username: string;
  profileImage?: string;
}

interface AuthState {
  loading: boolean;
  error: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  loading: false,
  error: null,
  user: null,
  isAuthenticated: false,
};

interface RegisterArgs {
  email: string;
  password: string;
  username: string;
}

interface LoginArgs {
  email: string;
  password: string;
}

type RegisterUserThunk = ReturnType<typeof createAsyncThunk<User, RegisterArgs>>;
type LoginUserThunk = ReturnType<typeof createAsyncThunk<User, LoginArgs>>;
export const registerUser: RegisterUserThunk = createAsyncThunk<User, RegisterArgs>(
  'auth/registerUser',
  async ({ email, password, username }, { rejectWithValue }) => {
    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      const user = credential.user;
      const userDoc = doc(db, 'users', user.uid);
      await setDoc(userDoc, {
        uid: user.uid,
        email: email,
        username: username,
      });  // Firestore에 사용자 문서 저장

      return { uid: user.uid, email: user.email, username };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);


export const loginUser: LoginUserThunk = createAsyncThunk<User, LoginArgs>(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      const user = credential.user;
      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);
      
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        return { 
          uid: user.uid, 
          email: user.email, 
          username: userData.username, 
          profileImage: userData.profileImage 
        };  // 사용자 문서가 존재하면 사용자 정보를 반환
      } else {
        return rejectWithValue('User document does not exist');
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;// 로그아웃 시 사용자 정보 초기화 
      state.isAuthenticated = false; //  인증 상태를 false
      signOut(auth); //firebase 로그아웃
    }, 
    setuser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true; //  인증 상태를 true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, setuser } = AuthSlice.actions;
export default AuthSlice.reducer;