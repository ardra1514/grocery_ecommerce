import React, { useState } from 'react'
import { useAppContext } from '../context/Appcontex'
import axios from "axios"
import toast from "react-hot-toast"

const Login = () => {
  const { setShowUserLogin, setUser, navigate } = useAppContext()

  const [state, setState] = useState("login")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data } = await axios.post(
        `/api/user/${state}`,
        { name, email, password }
      )

      if (data.success) {
        setUser(data.user)
        toast.success(state === "login" ? "Login successful" : "Account created")
        navigate("/")
        setShowUserLogin(false)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div
      className='fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center text-sm text-gray-600 bg-black/50'
      onClick={() => setShowUserLogin(false)}
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px]
        text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white"
        onClick={(e) => e.stopPropagation()}
      >

        <button
          type="button"
          className="absolute top-4 right-6 text-xl"
          onClick={() => setShowUserLogin(false)}
        >✕</button>

        <p className="text-2xl font-medium m-auto">
          <span className="text-primary">User</span> {state === "login" ? "Login" : "Sign Up"}
        </p>

        {state === "register" && (
          <div className="w-full">
            <p>Name</p>
            <input
              type="text"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            type="email"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            type="password"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {state === "register" ? (
          <p>Already have an account? <span className="text-primary cursor-pointer" onClick={() => setState("login")}>Login</span></p>
        ) : (
          <p>Create an account? <span className="text-primary cursor-pointer" onClick={() => setState("register")}>Register</span></p>
        )}

        <button className="bg-primary text-white w-full py-2 rounded-md">
          {state === "login" ? "Login" : "Register"}
        </button>

      </form>
    </div>
  )
}

export default Login;
