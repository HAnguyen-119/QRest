const users = require('../constrants/users.json')

const validateLogin = (username, password) => {
    const user = users.find((u) => u.username === username && u.password === password)
    return user || null
}

console.log(validateLogin('admin', 'admin123'))

module.exports = validateLogin