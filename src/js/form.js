export const clearErrors = (errors) => {
    for (let e in errors){
        errors[e] = false;
    }
}

export const emailValidator = (data, errors) => {
    if (!data.email.match('^[a-z]+(\\.[a-z]+)*@[a-z]+(\\.[a-z]+)+$')) {
        errors.email = true;
    }
    else{
        errors.email = false;
    }
}

export const passwordValidator = (data, errors) => {
    if (!data.password.match('^[a-zA-Z0-9!@#$%^&*()-=+\'\";:.,_]{6,100}$')) {
        errors.password = true;
    }
    else{
        errors.password = false;
    }
}

export const surnameValidator = (data, errors) => {
    if (!data.surname.match('^[A-ZА-ЯІЄЇ]{1}[a-zа-яієї]{1,99}$')) {
        errors.surname = true;
    }
    else{
        errors.surname = false;
    }
}

export const firstnameValidator = (data, errors) => {
    if (!data.firstName.match('^[A-ZА-ЯІЄЇ]{1}[a-zа-яієї]{1,99}$')) {
        errors.firstName = true;
    }
    else{
        errors.firstName = false;
    }
}

export const secondNameValidator = (data, errors) => {
    if (!data.secondName.match('^[A-ZА-ЯІЄЇ]{1}[a-zа-яієї]{1,99}$')) {
        errors.secondName = true;
    }
    else{
        errors.secondName = false;
    }
}

export const genderValidator = (data, errors) => {
    const allowedValues = [
        'male',
        'female'
    ]

    if (!allowedValues.includes(data.gender)) {
        errors.gender = true;
    }
    else{
        errors.gender = false;
    }
}

export const dateValidator = (data, errors) => {
    const minDate = new Date(1940, 0, 1);
    const maxDate = new Date(Date.now());
    const currentDate = new Date(data.date);

    if (!(minDate < currentDate && currentDate < maxDate)) {
        errors.date = true;
    }
    else{
        errors.date = false;
    }
}

export const groupValidator = (data, errors) => {
    const allowedValues = [
        'ia_31',
        'ia_32',
        'ia_33',
        'ia_34'
    ]

    if (!allowedValues.includes(data.group)) {
        errors.group = true;
    }
    else{
        errors.group = false;
    }
}

export const phoneValidator = (data, errors) => {
    if (!data.phone.match('^\\+38\\(0[0-9]{2}\\) [0-9]{3}-[0-9]{2}-[0-9]{2}$')) {
        errors.phone = true;
    }
    else{
        errors.phone = false;
    }
}