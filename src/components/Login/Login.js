import React, { useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => {
 // состояния для управления вводом пользователя
 const [enteredEmail, setEnteredEmail] = useState(''); // состояние для хранения email
 const [emailIsValid, setEmailIsValid] = useState(); // состояние для проверки валидности email
 const [enteredPassword, setEnteredPassword] = useState(''); // состояние для хранения пароля
 const [passwordIsValid, setPasswordIsValid] = useState(); // состояние для проверки валидности пароля
 const [formIsValid, setFormIsValid] = useState(false); // состояние для проверки валидности всей формы

// обработчик изменения email
const emailChangeHandler = (event) => {
  setEnteredEmail(event.target.value); // сбновляем состояние email

  // проверяем валидность всей формы (при изменении email)
  setFormIsValid(
    event.target.value.includes('@') && enteredPassword.trim().length > 6
  );
};

// обработчик изменения пароля
const passwordChangeHandler = (event) => {
  setEnteredPassword(event.target.value); // обновляем состояние пароля

  // проверяет валидность всей формы (при изменении пароля)
  setFormIsValid(
    event.target.value.trim().length > 6 && enteredEmail.includes('@')
  );
};

// проверка валидности email при потере фокуса
const validateEmailHandler = () => {
  setEmailIsValid(enteredEmail.includes('@'));
};

// проверка валидности пароля при потере фокуса
const validatePasswordHandler = () => {
  setPasswordIsValid(enteredPassword.trim().length > 6);
};

// обработчик отправки формы
const submitHandler = (event) => {
  event.preventDefault(); // зброс формы
  props.onLogin(enteredEmail, enteredPassword); // передаем email и пароль в родительский компонент
};

return (
  <Card className={classes.login}>
    <form onSubmit={submitHandler}>
      <div
        className={`${classes.control} ${
          emailIsValid === false ? classes.invalid : ''
        }`}
      >
        <label htmlFor="email">E-Mail</label>
        <input
          type="email"
          id="email"
          value={enteredEmail}
          onChange={emailChangeHandler} // вызывается при изменении email
          onBlur={validateEmailHandler} // вызывается при потере фокуса
        />
      </div>

      <div
        className={`${classes.control} ${
          passwordIsValid === false ? classes.invalid : ''
        }`}
      >
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={enteredPassword}
          onChange={passwordChangeHandler} // вызывается при изменении пароля
          onBlur={validatePasswordHandler} // вызывается при потере фокуса
        />
      </div>

      {/* кнопка отправки формы */}
      <div className={classes.actions}>
        <Button type="submit" className={classes.btn} disabled={!formIsValid}>
          Login
        </Button>
      </div>
    </form>
  </Card>
);
};

export default Login;
