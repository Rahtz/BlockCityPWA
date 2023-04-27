import { useState, useEffect } from "react";
import { supabase } from "./client";

const Login = () => {
    const [email, setEmail] = useState(''); // email of the user
    const [password, setPassword] = useState(''); // password of the user
    const [username, setUsername] = useState(''); // username of the user
    const [Rmsg, setRMsg] = useState(''); // Registration message
    const [Lmsg, setLMsg] = useState(''); // Login message
    const [user, setUser] = useState(''); // User object after registration / login
    const [session, setSession] = useState(''); // session object after registration / login


    const Register = async () => {
        const {data, error} = await supabase.auth.signUp({
          email,
          password,
        },
        {
          data: {
            username
          }
        })
        if(error){
          setRMsg(error.message)
        }else{
          setRMsg('User created successfully')
          setUser(data.user)
        }
      }

      const Login = async () => {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if(error){
          setLMsg(error.message)
        }else{
          setLMsg('Login successfully')
          setUser(data.user)
          setSession(data.session)
          console.log(data.session)
        }
      }

  return (
    <div className="App">
      <h1>Register User</h1>
      email:<input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" /><br/>
      Password:<input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter your Password" /><br/>
      username:<input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" /><br/>
      <button onClick={Register}>Register</button><br/>
      <p>{Rmsg}</p>
      <h1>Login</h1>
      email:<input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" /><br/>      Password:<input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter your Password" /><br/>
      <button onClick={Login}>Login</button><br/>
      <p>{Lmsg}</p>
    </div>
  );
}

export default Login