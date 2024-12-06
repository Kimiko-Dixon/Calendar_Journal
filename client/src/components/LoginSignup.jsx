import { SIGNUP, LOGIN } from "../utils/mutations";
import { useState } from "react";
import { useMutation} from "@apollo/client";
import { Button, Card, Input, Stack } from "@chakra-ui/react"
import { Field } from "./ui/field"
import { PasswordInput } from "./ui/password-input"
import Auth from '../utils/auth'


const SignupLogin = () => {
  const [signup] = useMutation(SIGNUP);
  const [login] = useMutation(LOGIN);
  const [hasAccount,setHasAccount] = useState(true)
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')

  const handleChange = (e) => {
    const {name,value} = e.target
    switch(name){
        case 'username':
            setUsername(value)
            break
        case 'password':
            setPassword(value)
            break
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log(username,password)
    try {
      const { data } = await signup({
        variables: {username,password},
      });
      setUsername('')
      setPassword('')
      Auth.login(data.signup.token)
    } catch (err) {
      console.log(err);
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      /* console.log(Auth.loggedIn()) */
      const { data } = await login({
        variables: {username,password},
      });
      setUsername('')
      setPassword('')
      Auth.login(data.login.token)

    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
    <form id="login-signup-form" onSubmit={hasAccount ? handleLogin : handleSignup}>
    <Card.Root maxW="sm">
    <Card.Header>
      {hasAccount ? (<Card.Title display='flex' justifyContent='center' id="login-heading">Login</Card.Title>) : (<Card.Title display='flex' justifyContent='center' id="signup-heading">Signup</Card.Title>)}
      {/* <Card.Description>
        Fill in the form below to create an account
      </Card.Description> */}
    </Card.Header>
    <Card.Body>
      <Stack gap="4" w="full">
        <Field label="Username">
          <Input name="username" id="username"  placeholder="Username"  value={username} onChange={handleChange}/>
        </Field>
        <Field label="Passsowrd">
          <PasswordInput name="password" id="password"  placeholder="Password"  value={password} onChange={handleChange}/>
        </Field>
      </Stack>
    </Card.Body>
    <Card.Footer justifyContent="center">
      {hasAccount ? (<Button type="submit" id="login-button">Login</Button>) : (<Button type="submit" id="signup-button">Signup</Button>)}
    </Card.Footer>
  </Card.Root>
  </form>
  {hasAccount ? 
        <p onClick={() => {
          setUsername('')
          setPassword('')
          setHasAccount(false)
        }
        }>New? Signup TODAY</p>
        :
        <p onClick={() => {
          setUsername('')
          setPassword('')
          setHasAccount(true)
        }
        }>Login</p>}
        {/* {hasAccount ? (<h2 id="login-heading">Login</h2>) : (<h2 id="signup-heading">Signup</h2>)}
        <form id="login-signup-form" onSubmit={hasAccount ? handleLogin : handleSignup}>
                <input type="text" name="username" id="username"  placeholder="Username"  value={username} onChange={handleChange}/>
                <input type="password" name="password" id="password"  placeholder="Password"  value={password} onChange={handleChange}/>
                {hasAccount ? (<button type="submit" id="login-button">Login</button>) : (<button type="submit" id="signup-button">Signup</button>)}
        </form>
        {hasAccount ? 
        <p onClick={() => {
          setUsername('')
          setPassword('')
          setHasAccount(false)
        }
        }>New? Signup TODAY</p>
        :
        <p onClick={() => {
          setUsername('')
          setPassword('')
          setHasAccount(true)
        }
        }>Login</p>} */}
    </>
  );
};

export default SignupLogin;
