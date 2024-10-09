// Global variable for the login page.
let showHidePassword;
let form;
let allInputs;
let loginBtn;
let registrationUrl;


/**
 * Code to be executed once the page is loaded/.
 */
$( document ).ready(function() {
    $('[data-bs-toggle="tooltip"]').tooltip();
    showHidePassword = document.getElementById('password-field-showHidePassword');
    form = document.querySelector('form');
    allInputs = document.querySelectorAll('input#password-field, input#username');
    loginBtn = document.querySelector('button[type="submit"]');


    document.addEventListener("keyup", event => {
        capsLockIsOn= event.getModifierState && event.getModifierState('CapsLock');
    });
    addListenersToFields();
    showHideCapsLockIndicator(passwordFieldIsFocusedIn, false );
    disableBtn(form, allInputs, loginBtn);
    // Event Handler when the user click on show/hide password to toggle visibility of password
    if($('#kc-form-login').is(":visible")) {
        $(showHidePassword).on("click", event => {
            revealPassword(passwordInputField,'password-field');
        });
    }
    $("#kc-form-login").submit(function(event) {
            event.preventDefault();
            encode64EncryptPassword('password-field', 'password');
            $(this).unbind('submit').submit();
    });
});


const registrationSteps = {
 step1 : {
    title: "Have your card ready",
    text: "To start with, you will need a MCB credit or debit card linked to your account. The card will serve as a secure and seamless gateway to the new world of online banking.",
    btnText: "Next",
 },
 step2 : {
    title: "Also grab your NIC or passport",
    text: "Security is an integral part of the experience.  This is why we kindly request that you also have  your National Identity Card or passport for identity verification.",
    btnText: "Next"
 },
 step3 : {
    title: "Keep your phone close for verification",
    text: "As part of this process, we will be sending you a One-Time Password (OTP) to verify your identity. The OTP will be sent to your registered mobile number associated with your account.",
    btnText: "Next"
 },
 step4 : {
    title: "Create a new password",
    text: "This process is designed to provide a comprehensive level of authentication and safeguards your account from unauthorized access.",
    btnText: "Let's begin"
 },
}
function closeModal(){
    $('#refreshing_banking_modal').modal('hide');
}

function openRegistrationModal(){
    registrationUrl = $("#loginUrl").val()+"&pageRequest=registration";
    const registration_content_1 = document.querySelectorAll('.registration_content_1')
    const registration_content_2 = document.querySelectorAll('.registration_content_2')
    registration_content_1[0].classList.remove("d-none")
    registration_content_2[0].classList.add("d-none")

    $('#refreshing_banking_modal').modal('show');
}

function showRegistrationSteps(){
    const registration_content_1 = document.querySelectorAll('.registration_content_1')
    const registration_content_2 = document.querySelectorAll('.registration_content_2')
    registration_content_1[0].classList.add("d-none")
    registration_content_2[0].classList.remove("d-none")
    nextRegistrationStep(true);
}

function nextRegistrationStep(reset=false){
    const modal = document.getElementById("refreshing_banking_modal");
    let nextStep = ""
    const currentStep = reset ? '' : modal.dataset.step;
    switch(currentStep) {
        case "step1":
          nextStep = "step2"
          break;
        case "step2":
            nextStep = "step3"
          break;
        case "step3":
            nextStep = "step4"
          break;
        case "step4":
            window.location.assign(registrationUrl);
          break;
        default:
            nextStep = "step1"
            break;
      }
    if(nextStep){
        updateModalContent(nextStep)
    }
    modal.dataset.step = nextStep;
}

function updateModalContent(step){
    const titleElem = document.getElementById("registrationStepsModal_title");
    const textElem = document.getElementById("registrationStepsModal_text");
    const btnElem = document.getElementById("registrationStepsModal_btn");
    const imgElem = document.getElementById("registrationStepsModal_img")
    const pagination_dots = document.querySelectorAll('.registrationStepsModal_pagination span')
    const dotIndex = Number(step.slice(-1) - 1);
    pagination_dots.forEach((dot, index) => {
        if(dotIndex === index){
            pagination_dots[index].classList.add('active')
        }
        else{
            pagination_dots[index].classList.remove('active')
        }
    })
    btnElem.classList.remove('step4-btn');
    if(step === "step4"){
        btnElem.classList.add('step4-btn');
    }

    const resourcePath = imgElem.dataset.resourcepath
    $('#registrationStepsModal_img').attr("src", resourcePath + step + ".svg");
    titleElem.innerText = registrationSteps[step].title
    textElem.innerText = registrationSteps[step].text
    btnElem.innerText = registrationSteps[step].btnText
}