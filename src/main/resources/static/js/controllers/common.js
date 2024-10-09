let capsLockIsOn = false;
let usernameFieldIsFocusedIn = false;
let passwordFieldIsFocusedIn = false;
let usernameInput;
let passwordInput;
/**
 * Helper to toggle the visibility of the Caps Lock indicator tooltip.
 * if show equals to true and caps lock is On while focus is on the password field, the tool tip will be shown.
 * @param show : flag to toggle show/hide the tool tip via argument. Default value is 'true'
 */
function showHideCapsLockIndicator(fieldIsFocused = false, show = true) {
    $("[data-bs-toggle='tooltip']").tooltip('disable');
    if(show && capsLockIsOn && fieldIsFocused) {
        $("[data-bs-toggle='tooltip']").tooltip('enable');
        $("[data-bs-toggle='tooltip']").tooltip('show');
    } else {
        $("[data-bs-toggle='tooltip']").tooltip('hide');
        $("[data-bs-toggle='tooltip']").tooltip('disable');
    }
}
/**
 * Helper to toggle the visibility of the password.
 * @param input : value to toggle password visibility
 */
function revealPassword(input,field) {
    if (input.type === "password") {
        input.type = "text";
        $("#"+field+"-hidePassword").show();
        $("#"+field+"-showPassword").hide();
    } else {
        input.type = "password";
        $("#"+field+"-showPassword").show();
        $("#"+field+"-hidePassword").hide();
    }
}

/**
 * Return a flag denoting when event is focusIn or blur from an event.
 * @param event: event triggered
 * @param initialState: initial state
 * @returns {boolean|*} true if focus, false if blur, else return current state.
 */
function updateFieldFocusFlagByEvent(event, initialState) {
    if (event.type === 'focus') {
        return true;
    }else if (event.type === 'blur') {
        return false;
    } else {
        // return initial state as it is neither focus or blur event. Therefore we dont update the flag.
        return initialState;
    }
}

/**
 * Return a flag denoting whether caps lock is on if event is of type 'keyup'.
 * @param event: event triggered
 * @returns {boolean|*} state of capslock if it is a keyup event, else return previous state.
 */
function updateCapsLockFlagByEvent(event) {
    if (event.type === 'keyup') {
        capsLockIsOn= event.originalEvent.getModifierState && event.originalEvent.getModifierState('CapsLock');
    }
}
/**
 * Listeners for 'keyup', 'focus' and 'blur' event for the password field.
 */
function addListenersToFields() {

    usernameInput = document.getElementById('username');
    passwordInput = document.getElementById('password');
    passwordInputField = document.getElementById('password-field');

    // Event handler when user types in the FCDB password field.
    $(passwordInputField).on("keyup focus blur", event => {
        passwordFieldIsFocusedIn = updateFieldFocusFlagByEvent(event, passwordFieldIsFocusedIn);
        updateCapsLockFlagByEvent(event);
        showHideCapsLockIndicator(passwordFieldIsFocusedIn, true );
        if($('#password-field').hasClass('border-error')){
            $('#password-field').removeClass('border-error')
        }
    });

    // Event handler when user types in the new password field.
    $(passwordInput).on("keyup focus blur", event => {
        passwordFieldIsFocusedIn = updateFieldFocusFlagByEvent(event, passwordFieldIsFocusedIn);
        updateCapsLockFlagByEvent(event);
        showHideCapsLockIndicator(passwordFieldIsFocusedIn, true );
        if($('#password').hasClass('border-error')){
            $('#password').removeClass('border-error')
        }
    });

    // Event handler when user types in the new password field.
    $(usernameInput).on("keyup focus blur", event => {
        usernameFieldIsFocusedIn = updateFieldFocusFlagByEvent(event, usernameFieldIsFocusedIn);
        updateCapsLockFlagByEvent(event);
        if($('#username').hasClass('border-error')){
            $('#username').removeClass('border-error')
        }
    });
}
/**
 * Disable and enable submit button based on all input fields of the form are filled in.
 * @param form: form with input fields and submit button
 * @param allInputs: forms input fields
 * @param btn: forms submit button
 */
function disableBtn(form, allInputs, btn){

    form.addEventListener('keyup', function(e) {
        let disabled = false;
        allInputs.forEach(function(input) {
            if (input.value === '' || !input.value.replace(/\s/g, '').length) {
                disabled = true;
            }
        })
        if (disabled) {
            btn.setAttribute('disabled', 'disabled');
        } else {
            btn.removeAttribute('disabled');
        }
    })
}
/**
 * Getting public key to encrypt password
 */
function encryptPassword(){
    let rawPassword = document.getElementById('password-field');
    let encryptedPassword = '';
    let publicKey = document.getElementById("rsaPublicKey").value;
    let tempPublicKey = '-----BEGIN PUBLIC KEY-----' +publicKey+'-----END PUBLIC KEY-----';
    //encrypt passwrod and set the value to the encrypted password
    let encrypt = new JSEncrypt();
    encrypt.setPublicKey(tempPublicKey);
    encryptedPassword = encrypt.encrypt(rawPassword.value);
    rawPassword.setAttribute('disabled', 'disabled');
    document.getElementById('password').value = encryptedPassword;
    document.getElementById('password').value = encryptedPassword;
}

/**
 * Getting public key to encrypt password
 */
function encode64EncryptPassword(rawPasswordFiledId, encryptedPasswordFiledId){
    //Get the plain text password field object
    let rawPassword = document.getElementById(rawPasswordFiledId);
    //Declaring empty encrypted password
    //let encryptedPassword = '';
    //Get the plain public key from BE
    let publicKey = document.getElementById("bbRsaPublicKey").value;
    // let publicKey = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr1t/GyIWs74Qamhuq8cN4O3wrxzjjM9jRmstVonqeaHLL6/ihYZlCy9V1pMbOHTpzxXb1rBWuGPH3kZrOv7nrWhZJRD42KjAzFLZeuAEe8QHnX5OuVhP0r1uj1+pY8diVIBUcuTl9Zuch/uSP18sfeEnTcMdY/gFjNwtbUnTtripojuReW3BKj2CVUFAy0f7CS7zaDyxAETJ0nbTfv2a69P26h+Z/qEJCO6CGfOQXjFAUWCG2/QpPDkliKYTTdWK422C/9eqP5JxB6ivGa2SzbDxkm/Y8Mvou2B10JGwhn1gSQU4pdRRNlEcyD+m84weTvwQriY4UNiyTyuWsPBl1QIDAQAB"
    //Set the public key to be used to Encrytp password
    //let tempPublicKey =forge.pki.publicKeyFromPem('-----BEGIN PUBLIC KEY-----' +publicKey+'-----END PUBLIC KEY-----'); ;
    //encrypt password and set the value of password to the encrypted password
    //encryptedPassword = forge.util.encode64(tempPublicKey.encrypt(forge.util.encodeUtf8(rawPassword.value), 'RSA-OAEP', {
    //    md: forge.md.sha256.create(),
    //    mgf1: {
    //        md: forge.md.sha1.create()
     //   }
    //}));
    rawPassword.setAttribute('disabled', 'disabled');
    //document.getElementById(encryptedPasswordFiledId).value = encryptedPassword;
    document.getElementById(encryptedPasswordFiledId).value = rawPassword.value;
}