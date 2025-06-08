import { Login } from "@/constants/Types/authentication"

import users from '../constants/users.json'
import {AccountProps} from "@/constants/Types/account";
import {fetchAPI} from "@/services/fetchAPI";

export const validateLogin = async ( username : any, password :any ) => {
    const account = { "username" : username, "password" : password };

    try {
        console.log(account)
        const response = await fetchAPI.login(account);
        console.log(response)
        const token = response.token;
        console.log(token);
        if (token) {
            console.log("JWT Token:", token);
            return token;
        } else {
            console.log("Login successful but no token returned.");
        }

    } catch (error) {
        console.log(error);
    }

    return null;
};


// console.log(validateLogin({ username: 'admin', password: 'admin123' }))
