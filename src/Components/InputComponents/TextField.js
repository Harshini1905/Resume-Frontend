import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// This is a custom 'textfield' input component, that allows the application to provide text input field along with validation check
// It takes general textfield parameters as parameters/props, and along with them it also takes an additional parameter --validation--
// which provides different validation checks.
// Different validation parameters are as follows:
// 1. validation={required:true} ensures that some value must be given for the given field.
// 2. validation={maxLengthRequired:10} ensures that the number of characters in the input does not exceed 10 characters.
// 3. validation={checkType:email} ensures that the input entered in the field matches with email pattern

function TextField(props) {
    const [value, setValue] = useState(props.value || '');
    const showErrorMessages = useSelector((state) => state.dataStore.showErrorMessages);

    const checkValidation = () => {
        let errorMessage = '';
        
        // Validation for required field
        if (props.validation && props.validation.required && value === '') {
            errorMessage = '*required!';
        }
        // Validation for max length
        else if (props.validation && props.validation.maxLengthRequired && value.length > props.validation.maxLengthRequired) {
            errorMessage = 'write up to ' + props.validation.maxLengthRequired + ' characters';
        }
        // Validation for email
        else if (props.validation && props.validation.checkType && props.validation.checkType === 'email') {
            if (!/\S+@\S+\.\S+/.test(value)) {
                errorMessage = 'Invalid Email address!';
            }
        }
        
        return errorMessage;
    };

    let errorMessage = checkValidation();

    useEffect(() => {
        if (props.validation && props.validation.required && value === '') {
            props.onChange(value, '*required!');
        } else {
            props.onChange(value, errorMessage);
        }
    }, [value, props, errorMessage]);

    useEffect(() => {
        // Debouncing mechanism to prevent unnecessary validation on every keystroke
        let timerOutId;
        
        if (value !== props.value && props.onChange) {
            timerOutId = setTimeout(() => {
                if (props.validation) {
                    props.onChange(value, errorMessage);
                } else {
                    props.onChange(value, '');
                }
            }, 500);
        }
        
        return () => {
            clearTimeout(timerOutId);
        };
    }, [value, props, errorMessage]);

    return (
        <div className="w-100 h-100 position-relative">
            {/* Error message display */}
            <div
                style={value !== "" || showErrorMessages === true && errorMessage !== "" ? { display: 'block', position: 'absolute', bottom: -20, color: "rgb(247, 89, 89)" } : { display: 'none' }}
            >
                {errorMessage}
            </div>
            <input
                className="input-style"
                id={props.elementId}
                type={props.type}
                value={value}
                placeholder={props.placeholder}
                onChange={(e) => {
                    setValue(e.target.value); // Update the local state value
                }}
            />
        </div>
    );
}

export default TextField;
