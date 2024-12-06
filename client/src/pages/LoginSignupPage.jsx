import Auth from '../utils/auth'
import LoginSignup from '../components/LoginSignup'
import { Box } from '@chakra-ui/react';

const LoginSignupPage = () => {
    Auth.loggedIn() ? window.location.assign('/') : null
  return (
    <Box display='flex' alignItems='center' justifyContent='center' flexDirection='column'>
      <LoginSignup/>
    </Box>
    
  );
};

export default LoginSignupPage;
