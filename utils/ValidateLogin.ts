import { Login } from "@/constrants/types"

import users from '../constrants/users.json'

export const validateLogin = ({username, password}: Login) => {
    const user = users.find((u: Login) => u.username === username && u.password === password)
    return user || null
}

console.log(validateLogin({ username: 'admin', password: 'admin123' }))
