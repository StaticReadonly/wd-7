export const emailValidator = (data, errors) => {
    if (!data.email.match('^[a-z]+(\\.[a-z]+)*@[a-z]+(\\.[a-z]+)+$')) {
        errors.email = true;
    }
    else{
        errors.email = false;
    }
}

export const passwordValidator = (data, errors) => {
    if (!data.password.match('^[a-zA-Z0-9!@#$%^&*()-=+\'\\";:.,_]{6,100}$')) {
        errors.password = true;
    }
    else{
        errors.password = false;
    }
}

export const lastnameValidator = (data, errors) => {
    if (!data.lastname.match('^[A-ZА-ЯІЄЇ]{1}[a-zа-яієї]{1,99}$')) {
        errors.lastname = true;
    }
    else{
        errors.lastname = false;
    }
}

export const firstnameValidator = (data, errors) => {
    if (!data.firstname.match('^[A-ZА-ЯІЄЇ]{1}[a-zа-яієї]{1,99}$')) {
        errors.firstname = true;
    }
    else{
        errors.firstname = false;
    }
}
