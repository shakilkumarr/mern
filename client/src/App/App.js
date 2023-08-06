import { useEffect, useState } from "react";
import Header from '../Header';
import Body from "../Body";
import RegisterForm from "../RegisterForm";
import './App.css';
import { loginUser, registerUser } from '../actions';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) setIsLoggedIn(true);
  }, [])

  const handleRegistration = (userData, apiToCall = registerUser) => {
    apiToCall(userData)
      .then(({ data }) => {
        setIsLoggedIn(true);
        localStorage.setItem("jwt", data.token);
        onClose();
      })
      .catch((error) => {
        console.error(error);
        alert(error);
      });
  };

  const handleLogin = (userData) => {
    handleRegistration(userData, loginUser);
  };

  const onClose = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(false);
  }

  const openForm = formHandler => () => {
    formHandler(true);
  };

  return (
    <div className='app'>
      <Header />
      <Body
        isLoggedIn={isLoggedIn}
        onLogin={openForm(setIsLoginModalOpen)}
        onRegister={openForm(setIsRegisterModalOpen)}
      />
      <RegisterForm
        isOpen={isRegisterModalOpen || isLoginModalOpen}
        onRequestClose={onClose}
        onRegister={handleRegistration} // Replace this with your registration logic
        onLogin={handleLogin} // Replace this with your login logic
        isLogin={isLoginModalOpen}
      />
    </div>
  );
};

export default App;
