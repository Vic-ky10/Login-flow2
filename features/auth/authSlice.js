import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import { loadUser } from "../../utils/localStorage";


const initialState = loadUser() || {
    user :null,
    token:null,
    loading : false,
    error : null
}

// fake api login

const fakeLogin = ({email , password}) => {
    new Promise((resolve ,reject)=> {
        setTimeout(()=> {
            if(password === "123456"){
                resolve({
                    user:{name :"Vicky" , email},
                    token :"jwt-token-xyz"
                });
                
            }else{
                   reject("Wrong password") 
                }
        },1000)
    })
}

export const loginUser = createAsyncThunk(
    "auth/loginUser",
     async (data , {rejectWithValue }) => {
     try{
        return await fakeLogin(data);
     }catch(err){
        return rejectWithValue(err)
     }
    }
);

const authSlice = createSlice({
    name :"auth",
    initialState,
    reducers:{
        logout :(state) => {
            state.user = null ;
            state.action = null;
            clearUser();
        }
    }
})