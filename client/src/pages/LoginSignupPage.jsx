import Auth from '../utils/auth'
import LoginSignup from '../components/LoginSignup'

const LoginSignupPage = () => {
    Auth.loggedIn() ? window.location.assign('/') : null
  return (
    <LoginSignup/>
  );
};

export default LoginSignupPage;
