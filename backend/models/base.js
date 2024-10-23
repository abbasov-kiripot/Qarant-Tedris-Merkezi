let usersUrl = import.meta.env.VITE_USERS_API
import axios from "axios"
export const usersApi ={
    loginUsers: async function(email,password){
        try{
            let res = await axios.get('${usersUrl}?email=${email}&password=${passvord}')
            return res

        } catch (error){
            return error.response
        }
    },
    registerUser: async function(userData){
        try{
            let res = await axios.post(usersUrl,userData)
            return res

        } catch (error){
            return error.response
        }
    },
}