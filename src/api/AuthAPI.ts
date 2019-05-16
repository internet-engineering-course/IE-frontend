import API from "./API";

export const registerUser = (user: object)=>{
    return API.post('/auth/register', user);
}
