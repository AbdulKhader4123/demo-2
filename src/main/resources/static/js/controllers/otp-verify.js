const cardOTPForm = document.getElementById('validateOtpForm');
const resentOtpForm = document.getElementById('resendOtp');
const otpInputEl = document.getElementById('totp');
const actionInputEl = document.getElementById('action');
const otpVerifyBtn = document.getElementById('verify-otp-btn');
const verifyingOtp = document.getElementById('verifying-otp');
const otpForm = document.getElementById('otp-form');
let otpRemainingAttempts = 0;

otpVerifyBtn.setAttribute('disabled', true);
otpInputEl.addEventListener("keypress", updateValue);
otpInputEl.addEventListener("input", checkOtpLength);

// prevent charactor input in OTP field
function updateValue(evt) {
  var charCode = (evt.which) ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    evt.preventDefault();
  }
}

// Enable or disable Verify button based on the lenght of the OTP field value
function checkOtpLength(evt) {
  evt.target.value.length < 6 ? 
    otpVerifyBtn.setAttribute('disabled', true) : otpVerifyBtn.removeAttribute('disabled')
}

// Submit OTP for verifiation
function submitOtp() {
  otpForm.setAttribute("style", "display: none");
  verifyingOtp.setAttribute("style", "display: block");
  cardOTPForm.submit();
}

// Restart flow
function restartFlow(url) {
  window.location.assign(url);
}