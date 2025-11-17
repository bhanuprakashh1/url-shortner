import React, { useState } from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

const AuthPage = () => {
    const [login, setLogin] = useState(true)

    return (
        <div className="h-full bg-gradient-to-br from-black via-[#0f0f0f] to-gray-900 flex flex-col items-center justify-center p-4">
            {login ? <LoginForm state={setLogin} /> : <RegisterForm state={setLogin} />}
        </div>
    )
}

export default AuthPage;