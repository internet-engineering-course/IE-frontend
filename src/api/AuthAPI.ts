import API from "./API";

export const registerUser = (user: object)=>{
    return API.post('/auth/register', user);
}

export const login = (username:string , password:string)=>{
    return API.post('/auth/login' , {username:username , password:password});
}