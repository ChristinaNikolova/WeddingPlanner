import { useState, useEffect } from 'react';
import * as authService from '../../../services/auth';
import * as validator from '../../../utils/validators/auth';
import * as helpers from '../../../utils/helpers/form';
import Input from '../../shared/Input/Input';
import ClientError from '../../shared/ClientError/ClientError';
import styles from './Register.module.css';

function Register() {
    const [values, setValues] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        repass: '',
    });
    const [isDisabled, setIsDisabled] = useState(true);
    const [emailError, setEmailError] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [repassError, setRepassError] = useState('');

    useEffect(() => {
        checkDisabled();
    }, [values, emailError, firstNameError, lastNameError, passwordError, repassError]);

    const submitHandler = (e) => {
        e.preventDefault();

        setEmailError(validator.validEmail(values.email));
        setFirstNameError(validator.validName(values.firstName));
        setLastNameError(validator.validName(values.lastName));
        setPasswordError(validator.validPassword(values.password));
        setRepassError(validator.validPasswordMatch(values.password, values.repass));

        if (emailError || firstNameError || lastNameError || passwordError || repassError) {
            return;
        }

        authService.register(values.firstName, values.lastName, values.email, values.password)
            .then((data) => {
                console.log(data);
                // TODO finish logic
            });
    }

    const changeHandler = (e) => {
        setValues((state) => ({
            ...state,
            [e.target.name]: e.target.value.trim(),
        }));
    }

    const validateEmail = () => {
        setEmailError(validator.validEmail(values.email));
    }

    const validateFirstName = () => {
        setFirstNameError(validator.validName(values.firstName));
    }

    const validateLastName = () => {
        setLastNameError(validator.validName(values.lastName));
    }

    const validatePassword = () => {
        setPasswordError(validator.validPassword(values.password));
    }

    const validateRepass = () => {
        setRepassError(validator.validPasswordMatch(values.password, values.repass));
    }

    const checkDisabled = () => {
        setIsDisabled(helpers.isButtonDisabled(values, [emailError, firstNameError, lastNameError, passwordError, repassError]));
    }

    return (
        <section className={`${styles.register} section`}>
            <div className={styles["register-title-wrapper"]}>
                <h2 className={styles["register-title"]}>Register</h2>
                <p className={styles["register-content"]}>
                    Please complete the register form to start planning you wedding day
                </p>
            </div>
            <div className={styles["register-content-wrapper"]}>
                <img className={styles["register-img"]} src="./img/wedding-634526_1280.jpg" alt="bride_accessories" />
                <form className={styles["register-form"]} onSubmit={submitHandler} >
                    <div className={styles["register-form-wrapper"]}>
                        <Input
                            name="email"
                            type="email"
                            label="Email"
                            value={values.email}
                            onChangeHandler={changeHandler}
                            onBlurHandler={validateEmail}
                        />
                        {emailError && <ClientError error={emailError} />}
                    </div>
                    <div className={styles["register-form-wrapper"]}>
                        <Input
                            name="firstName"
                            type="text"
                            label="First Name"
                            value={values.firstName}
                            onChangeHandler={changeHandler}
                            onBlurHandler={validateFirstName}
                        />
                        {firstNameError && <ClientError error={firstNameError} />}
                    </div>
                    <div className={styles["register-form-wrapper"]}>
                        <Input
                            name="lastName"
                            type="text"
                            label="Last Name"
                            value={values.lastName}
                            onChangeHandler={changeHandler}
                            onBlurHandler={validateLastName}
                        />
                        {lastNameError && <ClientError error={lastNameError} />}
                    </div>
                    <div className={styles["register-form-wrapper"]}>
                        <Input
                            name="password"
                            type="password"
                            label="Password"
                            value={values.password}
                            onChangeHandler={changeHandler}
                            onBlurHandler={validatePassword}
                        />
                        {passwordError && <ClientError error={passwordError} />}
                    </div>
                    <div className={styles["register-form-wrapper"]}>
                        <Input
                            name="repass"
                            type="password"
                            label="Repeat Password"
                            value={values.repass}
                            onChangeHandler={changeHandler}
                            onBlurHandler={validateRepass}
                        />
                        {repassError && <ClientError error={repassError} />}
                    </div>
                    <button className="btn" disabled={isDisabled}>Register</button>
                </form>
            </div>
        </section>
    );
}

export default Register;