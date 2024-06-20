import React from 'react'
import "./Login.css"
import { Button } from '@mui/material'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../firebase'

function Login() {

    const signIn = () => {
        signInWithPopup(auth, provider).catch((err) => {
            alert(err.message)
        })
    }

  return (
    <div className='login'>
        <div className="loginLogo">
            <img src="./yucchy.jpg" alt="" />
        </div>

        <Button onClick={signIn}>ログイン</Button>
    </div>
  )
}

export default Login