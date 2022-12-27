import { useState, useEffect, useRef } from 'react';

import { getDifference, parseDate } from '../../../utils/helpers/datetime';
import * as validator from '../../../utils/validators/event';
import * as helpers from '../../../utils/helpers/form';

import ServerError from '../../shared/Errors/ServerError/ServerError';
import ClientError from '../../shared/Errors/ClientError/ClientError';
import Input from '../../shared/Tags/Input/Input';

import styles from './FormEvent.module.css';

function FormEvent({ title, startTime, endTime, duration, formName, serverError, onSubmitHandler, onCancelFormHandler }) {
    //todo test events again
    //todo test server error - create and update
    //test with icons
    //todo heightl.
    //todo add before and after for the timeline
    //extract css into files

    const [values, setValues] = useState({
        title: title,
        startTime: startTime,
        endTime: endTime,
        duration: duration,
    });

    const durationRef = useRef();
    const [isDisabled, setIsDisabled] = useState(true);
    const [titleError, setTitleError] = useState('');
    const [startTimeError, setStartTimeError] = useState('');
    const [endTimeError, setEndTimeError] = useState('');

    useEffect(() => {
        checkDisabled();

        if (values.startTime && values.endTime) {
            const [hours, minutes] = getDifference(values.startTime, values.endTime);

            durationRef.current.value = `${hours}:${minutes}`;
            values.duration = `${hours}:${minutes}`;
        }
    }, [values, titleError, startTimeError, endTimeError]);

    const changeHandler = (e) => {
        setValues((state) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };

    const validateTitle = () => {
        setTitleError(validator.validTitle(values.title));
    };

    const validateStartTime = () => {
        setStartTimeError(validator.validTime(values.startTime, values.endTime));
    };

    const validateEndTime = () => {
        setEndTimeError(validator.validTime(values.startTime, values.endTime));
    };

    const checkDisabled = () => {
        setIsDisabled(helpers.isButtonDisabled(values, [titleError, startTimeError, endTimeError]));
    };

    const onSubmitHelperHandler = (e) => {
        e.preventDefault();

        setTitleError(validator.validTitle(values.title));
        setStartTimeError(validator.validTime(values.startTime, values.endTime));
        setEndTimeError(validator.validTime(values.startTime, values.endTime));

        if (titleError || startTimeError || endTimeError) {
            return;
        }

        onSubmitHandler(values.title, parseDate(values.startTime), parseDate(values.endTime), values.duration);
    }

    return (
        <div className={styles["event-content-form-wrapper"]} >
            <form className={[styles["event-form"], "form-error-message-width"].join(' ')} onSubmit={onSubmitHelperHandler}>
                {serverError && <ServerError errors={serverError} />}
                <div className="form-wrapper">
                    <Input
                        name="title"
                        type="text"
                        label="Title"
                        value={values.title}
                        onChangeHandler={changeHandler}
                        onBlurHandler={validateTitle}
                    />
                    {titleError && <ClientError error={titleError} />}
                </div>
                <div className="form-wrapper">
                    <Input
                        name="startTime"
                        type="time"
                        label="Start Time"
                        value={values.startTime}
                        onChangeHandler={changeHandler}
                        onBlurHandler={validateStartTime}
                    />
                    {startTimeError && <ClientError error={startTimeError} />}
                </div>
                <div className="form-wrapper">
                    <Input
                        name="endTime"
                        type="time"
                        label="End Time"
                        value={values.endTime}
                        onChangeHandler={changeHandler}
                        onBlurHandler={validateEndTime}
                    />
                    {endTimeError && <ClientError error={endTimeError} />}
                </div>
                <div className="form-wrapper">
                    <label className="label" htmlFor="duration">Duration</label>
                    <input ref={durationRef} className="input" id="duration" name="duration" type="text" readOnly />
                </div>
                <div className={styles["event-btns-wrapper"]}>
                    <button disabled={isDisabled} className="btn btn-center">{formName}</button>
                    <button onClick={onCancelFormHandler} className="btn btn-center">Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default FormEvent;