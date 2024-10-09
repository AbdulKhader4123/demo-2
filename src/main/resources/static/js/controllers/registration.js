// Global variable for the card Details page.
var cardNumberInput;
var cardTypeDescription;
var cardExpiryDateInput;
var cardPinInput;
var cardCvvInput;
var cardCvvContainer;
var selectedCardType = 'DebitCard'
var cardTypeContainer;
var cardFormContainer;
var legalDocName= 'NIC';
var nicNumberInput;
var passportNumberInput;
var cardFormContinueBtn;
var cardForm;
var cardNumberInputError;
var cardExpiryDateInputError;
var cardPinInputError;
var cardCvvInputError;
var nicNumberInputError;
var passportNumberInputError;
var mcbCardErrorTitle;
/**
 * hidden form variables mapped with backend model, to retreive form values after form submit incase backend returns error.
 */
var cardNumberHidden;
var cardTypeHidden;
var cardPinHidden;
var expiryDateHidden;
var cvvNumberHidden;
var legalDocNameHidden;
var nicPassportNumberHidden;

/**
 * Code to be executed once the page is loaded/.
 */
$( document ).ready(function() {
    cardTypeContainer = document.getElementById('card-type-container');
    cardFormContainer = document.getElementById('card-form-container');
    cardNumberInput = document.getElementById('card-number-input');
    cardNumberInputError = document.getElementById('card-number-input-error');
    cardTypeDescription = document.getElementById("card-description");
    cardExpiryDateInput = document.getElementById("expiry-date-input");
    cardExpiryDateInputError = document.getElementById("expiry-date-input-error");
    cardPinInput = document.getElementById("card-pin-input");
    cardPinInputError = document.getElementById("card-pin-input-error");
    cardCvvInput = document.getElementById("card-cvv-input");
    cardCvvInputError = document.getElementById("card-cvv-input-error");
    cardCvvContainer = document.getElementById("card-cvv-container");
    nicNumberInput = document.getElementById("nic-input");
    passportNumberInput = document.getElementById("passport-input");
    nicNumberInputError = document.getElementById("nic-input-error");
    passportNumberInputError = document.getElementById("passport-input-error");
    cardFormContinueBtn = document.getElementById("card-form_continue-btn");
    cardFormContinueBtn?.setAttribute("disabled", true);
    cardForm = document.getElementById('card-form');

    mcbCardErrorTitle = document.getElementById("mcbCardErrorTitle");
    cardNumberHidden = document.getElementById("cardNumberHidden");
    cardTypeHidden = document.getElementById("cardTypeHidden");
    cardPinHidden = document.getElementById("cardPinHidden");
    expiryDateHidden = document.getElementById("expiryDateHidden");
    cvvNumberHidden = document.getElementById("cvvNumberHidden");
    legalDocNameHidden = document.getElementById("legalDocNameHidden");
    nicPassportNumberHidden = document.getElementById("nicPassportNumberHidden");

    addListenersToCardForm();

    if(mcbCardErrorTitle?.value){
        populateFormValues();
    }

});

function cardSelected(cardType){
    selectedCardType = cardType;
    cardTypeContainer.style.display = "none";
    cardFormContainer.style.display = "block";
    
    /**
     * Code to be executed once the card type is selected.
     */
    setDescription();
    showNicAsDefault();
    showCvvIfCreditCard();
}

/**
 *  if backend returns error after validating, the form needs to be populated with values.
 */
function populateFormValues(){
    if(cardTypeHidden.value !== "" && (cardTypeHidden.value === "CreditCard" || cardTypeHidden.value === "DebitCard")){
        selectedCardType = cardTypeHidden.value
    }
    cardSelected(selectedCardType);
    legalDocName = legalDocNameHidden.value || "NIC";
    handleRadioChange({value: legalDocName});

    if(legalDocName === "NIC"){
        document.getElementsByName("nic-passport-radio")[0].checked = true;
        document.getElementsByName("nic-passport-radio")[1].checked = false;
    }
    else{
        document.getElementsByName("nic-passport-radio")[0].checked = false;
        document.getElementsByName("nic-passport-radio")[1].checked = true;
    }

    if(cardNumberHidden.value){
        let cardNumberGroup = cardNumberHidden.value.match(/.{1,4}/g);
        cardNumberInput.value = cardNumberGroup.join(' ');
    }

    if(expiryDateHidden.value.length === 4){
        cardExpiryDateInput.value = expiryDateHidden.value.substring(2, 4) + '/' + expiryDateHidden.value.substring(0, 2);
    }
    
    cardPinInput.value = "";
    cardCvvInput.value = cvvNumberHidden.value;
    nicNumberInput.value = legalDocName === "NIC" ? nicPassportNumberHidden.value : "";
    passportNumberInput.value = legalDocName !== "NIC" ? nicPassportNumberHidden.value : "";

    cardFormContinueBtn.setAttribute("disabled", true);
}