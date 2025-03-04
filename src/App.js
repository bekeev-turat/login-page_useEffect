import React, { useState } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // состояние для отслеживания авторизован ли пользователь 



  React.useEffect(() => {
    const userIsLoggedInfo = localStorage.getItem('isLoggedIn') // берет данные из localStorage
    if (userIsLoggedInfo === '1') { // если userIsLoggedInfo равен 1 то состояние setIsLoggedIn меняется на true
      setIsLoggedIn(true)
    }
  }, []) // нет зависимостей и поетому выполняеся только при первом рендере 

  const loginHandler = (email, password) => { // функция прокидывается в компоненту Login он принимает email и password и нужен для обработки входа пользователя
    localStorage.setItem('isLoggedIn', 'hello') // сохраняется в localStorage 
    setIsLoggedIn(true);  //isLoggedIn меняется на true
  };

  const logoutHandler = () => { // прокидывается в Home нужен для обработки выхода пользователя 
    setIsLoggedIn(false); //сбрасывание состояния авторизации
    localStorage.removeItem('isLoggedIn')  // удаление данных из localStorage
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {/* если пользователь не авратизован показыается Login */}
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {/* если пользователь авратизован показыается Home */}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;
