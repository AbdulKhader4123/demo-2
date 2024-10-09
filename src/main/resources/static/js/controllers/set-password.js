
  var REGEX = {
    lowercase: /(.*[a-z].*)/,       // For lower cases
    uppercase: /(.*[A-Z].*)/,       // For upper cases
    digits: /(.*\d.*)/,          // For digits
    specialChars: /[!_.@#$%\-\*&]/,          // For !_.@#$%-&*
  };
  alphaSuccess = false;
  eightSuccess = false;
  lowerSuccess = false;
  upperSuccess = false;
  charSuccess = false;

  allRequirementsMet = false;
  passwordsMatched = false;
  var policyErrorMessage;

  $( document ).ready(function() {
      document.addEventListener("keyup", event => {
        capsLockIsOn = event.getModifierState && event.getModifierState('CapsLock');
      });

      $("#set-password").hide();
      showHidePassword = document.getElementById('password-showHidePassword');
      confirmFieldshowHidePassword = document.getElementById('confirmPassword-showHidePassword');
      passwordInputField = document.getElementById('password');
      confirmPasswordInputField = document.getElementById('confirmPassword');
      eightCharText = document.getElementById('eight-charecters');
      alphaNumericText = document.getElementById('alphanumeric');
      upperCaseText = document.getElementById('upper-case');
      lowerCaseText = document.getElementById('lower-case');
      specialCharText = document.getElementById('special-charecter');
      passwordHiddenField = document.getElementById('password-hidden-field');
      confirmPasswordHiddenField = document.getElementById('confirmPassword-hidden-field');
      policyErrorMessage = document.getElementById("policyErrorMessage");

      if(policyErrorMessage?.value){
        goToSetPassword();
      }

      $(showHidePassword).on("click", event => {
          revealPassword(passwordInputField, 'password');
      });
      $(confirmFieldshowHidePassword).on("click", event => {
          revealPassword(confirmPasswordInputField, 'confirmPassword');
      });

      $(passwordInputField).on("keyup focus blur", event => {
        updateCapsLockFlagByEvent(event);
        showHideCapsLock(passwordInputField, event.type === 'blur' ? false : true)
      })

      $(confirmPasswordInputField).on("keyup focus blur", event => {
        updateCapsLockFlagByEvent(event)
        showHideCapsLock(confirmPasswordInputField, event.type === 'blur' ? false : true)
      })

      $(passwordInputField).on("keyup", event => {
          passwordsMatched = false;
          let password = event.target.value;
          if(password.length > 7) {
            eightSuccess = true;
            eightCharText.classList.add('valid')
          }else {
            eightSuccess = false;
            eightCharText.classList.remove('valid')
          }

          if(REGEX.digits.test(password) && (REGEX.lowercase.test(password) || REGEX.uppercase.test(password))) {
            alphaSuccess = true;
            alphaNumericText.classList.add('valid')
          }else {
            alphaSuccess = false;
            alphaNumericText.classList.remove('valid')
          }

          if(REGEX.lowercase.test(password)) {
            lowerSuccess = true;
            lowerCaseText.classList.add('valid')
          }else {
            lowerSuccess = false;
            lowerCaseText.classList.remove('valid')
          }

          if(REGEX.uppercase.test(password)) {
            upperSuccess = true;
            upperCaseText.classList.add('valid')
          }else {
            upperSuccess = false;
            upperCaseText.classList.remove('valid')
          }
          specialCharWarning = document.getElementById('specialCharText');
          if(REGEX.specialChars.test(password)) {
            charSuccess = true;
            specialCharText.classList.add('valid');
            specialCharWarning.classList.add('special-chars-text-success');
          }else {
            charSuccess = false;
            specialCharText.classList.remove('valid');
            specialCharWarning.classList.remove('special-chars-text-success');
          }
          validatePassword(password);
          if(confirmPasswordInputField.value !== ""){
            if(confirmPasswordInputField.value === password) {
              passwordsMatched = true;
              confirmPasswordInputField.classList.remove('border-red');
              $("#passwords-not-matched").hide();
            }else {
              passwordsMatched = false;
              confirmPasswordInputField.classList.add('border-red');
              $("#passwords-not-matched").show();
            }
          }
          validateSubmit();
      });

      $(passwordInputField).on("blur", event => {
        allRequirementsMet ? passwordInputField.classList.remove('border-red') : passwordInputField.classList.add('border-red')
      });

      $(confirmPasswordInputField).on("keyup", event => {
        const confirmPasswordVal = event.target.value;
        if(confirmPasswordVal === ""){
          confirmPasswordInputField.classList.remove('border-red');
          $("#passwords-not-matched").hide();
          passwordsMatched = false;
        }
        else if(passwordInputField.value === confirmPasswordVal) {
          passwordsMatched = true;
          confirmPasswordInputField.classList.remove('border-red');
          $("#passwords-not-matched").hide();
        }else {
          passwordsMatched = false;
          confirmPasswordInputField.classList.add('border-red');
          $("#passwords-not-matched").show();
        }
        validateSubmit();
      });
  });

  function goToSetPassword() {
    $("#verification-successful").hide();
    $("#set-password").show();
    $("#passwords-not-matched").hide();
  }

  function validatePassword(password) {
    
    if (eightSuccess && alphaSuccess && upperSuccess && lowerSuccess && charSuccess) {
      $("#warningIcon").hide();
      $("#successIcon").show();
      allRequirementsMet = true;
      const encryptedPassword = encryptPassword(password)
      $(passwordHiddenField).val(encryptedPassword);
      $(confirmPasswordHiddenField).val(encryptedPassword);
    }else {
      $("#warningIcon").show();
      $("#successIcon").hide();
      allRequirementsMet = false;
    }
    validateSubmit();
  } 

  function encryptPassword(password) {
    let tempkey = document.getElementById("rsaPublicKey").value;

    const environment = {
        publicKey: `-----BEGIN PUBLIC KEY-----
    ${tempkey}
    -----END PUBLIC KEY-----
    `
    };
    let publicKey = forge.pki.publicKeyFromPem(environment.publicKey);
    var encryptedPass = forge.util.encode64(publicKey.encrypt(forge.util.encodeUtf8(password), 'RSA-OAEP', {
        md: forge.md.sha256.create(),
        mgf1: {
            md: forge.md.sha1.create()
        }
    }));

    return encryptedPass;
  }

  function validateSubmit() {
    confirmBtn = document.getElementById('confirmBtn');
    (allRequirementsMet && passwordsMatched) ? confirmBtn.disabled = false : confirmBtn.disabled = true;
  }

  function showHideCapsLock(field, fieldIsFocused = false) {
    $(field).tooltip('disable');
    if(capsLockIsOn && fieldIsFocused) {
        $(field).tooltip('enable');
        $(field).tooltip('show');
    } else {
        $(field).tooltip('hide');
        $(field).tooltip('disable');
    }
}