var modalTriggeredBy = "";

function showDiscardModal(trigger, url){
    modalTriggeredBy = trigger;
    if(formValueHasChanged()){
        $('#discardModal').modal('show');
    }
    else{
        discard(url)
    }
}

function discard(url){
    $('#discardModal').modal('hide');
    if(modalTriggeredBy === "backBtn"){
        cardTypeContainer.style.display = "block";
        cardFormContainer.style.display = "none";
        resetCardForm();
    }
    else{
        window.location.assign(url);
    }
}

function formValueHasChanged(){
    return !(cardNumberInput.value === "" && cardExpiryDateInput.value === "" && cardPinInput.value === "" && cardCvvInput.value === "" && nicNumberInput.value === "" && passportNumberInput.value === "")
}

function closeModal(){
    $('#discardModal').modal('hide');
}

function resetCardForm(){
    cardNumberInput.value = ""
    cardExpiryDateInput.value = ""
    cardPinInput.value = ""
    cardCvvInput.value = ""
    nicNumberInput.value = ""
    passportNumberInput.value = ""
    handleRadioChange({value: "NIC"})
    document.getElementsByName("nic-passport-radio")[0].checked = true;
    removeErrorOutline();
    const errorTextBox =document.getElementById("error-text-box");
    if(errorTextBox){
        errorTextBox.style.display = "none"
    }
}

function showNicAsDefault(){
    document.getElementById("nic-container").style.display = "block"
    document.getElementById("passport-container").style.display = "none"
}

function setDescription(){
    let description = ""
    if(selectedCardType === "DebitCard"){
        description = "Enter your debit card details"
    }else if(selectedCardType === "CreditCard"){
        description = "Enter your credit card details"
    }
    cardTypeDescription.innerText = description;
}

function showCvvIfCreditCard(){
    if(selectedCardType === "CreditCard"){
        cardCvvContainer.style.display = "block"
    }
    else{
        cardCvvContainer.style.display = "none"
    }
}

function addListenersToCardForm() {

    $(cardNumberInput).bind('input', function(){
        cardNumberFormatter(this)
    });
    $(cardNumberInput).bind('keypress', function(e){
        return numericOnly(e)
    });
    $(cardExpiryDateInput).bind('keypress', function(e){
        return numericOnly(e)
    });

    $(cardExpiryDateInput).bind('keypress', function(e) {
        return restrictExpiryDate(e)
    });
    $(cardExpiryDateInput).bind('keypress', function(e) {
        return formatExpiryDate(e)
    });
    $(cardExpiryDateInput).bind('keypress', function(e) {
        return formatForwardSlashAndSpace(e)
    });
    $(cardExpiryDateInput).bind('keypress', function(e) {
        return formatForwardExpiryDate(e)
    });
    $(cardExpiryDateInput).bind('keydown', function(e) {
        return formatBackExpiryDate(e)
    });
    $(cardExpiryDateInput).bind('input', function(e) {
        return expiryDateFormatter(e)
    });
    $(cardExpiryDateInput).bind('change', function(e) {
        return expiryDateFormatter(e)
    });

    cardForm.addEventListener('input', function(e) {
        setTimeout(()=>{
            formValidation(e);
        })
    });
}

function cardNumberFormatter(THIS){
    let val = $(THIS).val();
    let newval = '';
    val = val.replace(/[^0-9]/g, '');
    for(let i=0; i < val.length; i++) {
        if(i%4 == 0 && i > 0) newval = newval.concat(' ');
        newval = newval.concat(val[i]);
    }
    if (newval.length > 19) {
        newval = newval.substring(0,19);
    }
    $(THIS).val(newval);
}

function numericOnly(event){
    return event.charCode == 8 || (event.charCode >= 48 && event.charCode <= 57)
}

function numericOnlyInput(input){
    let value = input.value;
    let letters = value.replace(/[^0-9]/g, "");
    input.value = letters;
}

function alphaNumericOnlyInput(input){
    let value = input.value;
    let letters = value.replace(/[^a-zA-Z0-9]/g, "");
    input.value = letters;
}

function removeErrorOutline(){
    cardNumberInput.classList.remove("border-error");
    cardExpiryDateInput.classList.remove("border-error");
    cardCvvInput.classList.remove("border-error");
    cardPinInput.classList.remove("border-error");
    nicNumberInput.classList.remove("border-error");
    passportNumberInput.classList.remove("border-error");
}

function formValidation(e){
    cardFormContinueBtn.setAttribute("disabled", true);
    let nicChecked = document.getElementsByName("nic-passport-radio")[0].checked;

    switch(e?.target?.id){
        case "card-number-input" :
            cardNumberInput.classList.remove("border-error");
            let trimmedCardNumber = cardNumberInput.value?.replace(/[^0-9]/g, '');
            if(trimmedCardNumber?.length > 0 && ((selectedCardType === "DebitCard" && trimmedCardNumber?.length !== 16) || (selectedCardType === "CreditCard" && trimmedCardNumber?.length < 15))){
                cardNumberInput.classList.add("border-error");
            } 
            break;
        case "expiry-date-input":
            cardExpiryDateInput.classList.remove("border-error");
            if(cardExpiryDateInput.value?.length === 0 ){
                break;
            }
            if(cardExpiryDateInput.value?.length !== 5){
                cardExpiryDateInput.classList.add("border-error");
                break;
            }
            const month_year = getDateParts()
            if(!validExpiryDate(month_year["month"], month_year["year"])){
                cardExpiryDateInput.classList.add("border-error");
            }
            break;
        case "card-pin-input":
            cardPinInput.classList.remove("border-error");
            if(cardPinInput.value?.length > 0 && cardPinInput.value?.length !== 4){
                cardPinInput.classList.add("border-error");
            }
            break;
        case "card-cvv-input":
            cardCvvInput.classList.remove("border-error");
            if(selectedCardType === "CreditCard" && (cardCvvInput.value?.length > 0 && cardCvvInput.value?.length < 3)){
                cardCvvInput.classList.add("border-error");
            }
            break;
        case "nic-input":
        case "nic-radio":
            nicNumberInput.classList.remove("border-error");
            let regex = /^[A-Za-z]\d{12}[A-Za-z0-9]$/i;
            if(nicChecked && nicNumberInput.value?.length > 0 && (nicNumberInput.value?.length !== 14 || !regex.test(nicNumberInput.value))){
                nicNumberInput.classList.add("border-error");
            }
            break;
    }
    if(cardNumberInput.value === "" || cardExpiryDateInput.value === "" || cardPinInput.value === "" || (selectedCardType === "CreditCard" && cardCvvInput.value === "") || (nicChecked && nicNumberInput.value === "") ||(!nicChecked && passportNumberInput.value === "")){
        return
    }
    let invalidFields = document.getElementById("card-form").getElementsByClassName("border-error")
    /**
     * checking how many fields have border as red & whether they are visible.
     */
    if(invalidFields.length === 0 || (invalidFields.length === 1 && !isVisible(invalidFields[0]))){
        setFormData();
        cardFormContinueBtn.removeAttribute("disabled");
    }
}

function setFormData(){
    let expiryDateInputValue = cardExpiryDateInput.value.substring(3, 5) + cardExpiryDateInput.value.substring(0, 2);
    let trimmedCardNumber = cardNumberInput.value.replace(/\s/g, "");
    let pinBlock = '';

    if(cardPinInput.value){
        pinBlock = getClearPINblock(trimmedCardNumber, cardPinInput.value);
    }
    
    $('#cardNumber').val(trimmedCardNumber);
    $('#cardType').val(selectedCardType);
    $('#cardPin').val(pinBlock);
    $('#expiryDate').val(expiryDateInputValue);
    $('#cvvNumber').val(cardCvvInput.value);
    $('#legalDocName').val(legalDocName);
    $('#nicPassportNumber').val(legalDocName === "NIC" ? nicNumberInput.value : passportNumberInput.value);
}

function isVisible(e) {
    return !!( e.offsetWidth || e.offsetHeight || e.getClientRects().length );
}

function restrictExpiryDate(e){
    let target, digit, value;
    target = $(e.currentTarget);
    digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
      return;
    }
    if (hasTextSelected(target)) {
      return;
    }
    value = target.val() + digit;
    value = value.replace(/\D/g, '');
    if (value.length > 4) {
      return false;
    }
}

function formatExpiryDate(e) {
    let target, digit, val;
    digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
        return;
    }
    target = $(e.currentTarget);
    val = target.val() + digit;
    if (/^\d$/.test(val) && (val !== '0' && val !== '1')) {
        return setTimeout(function() {
            return target.val("0" + val + "/");
        });
    } else if (/^\d\d$/.test(val)) {
        return setTimeout(function() {
            return target.val("" + val + "/");
        });
    }
};

function formatForwardSlashAndSpace(e) {
    let target, val, which;
    which = String.fromCharCode(e.which);
    if (!(which === '/' || which === ' ')) {
      return;
    }
    target = $(e.currentTarget);
    val = target.val();
    if (/^\d$/.test(val) && val !== '0') {
      return target.val("0" + val + "/");
    }
};

function formatForwardExpiryDate(e) {
    let target, digit, val;
    digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
        return;
    }
    target = $(e.currentTarget);
    val = target.val();
    if (/^\d\d$/.test(val)) {
        return target.val("" + val + "/");
    }
};

function formatBackExpiryDate(e) {
    let target, value;
    target = $(e.currentTarget);
    value = target.val();
    if (e.which !== 8) {
        return;
    }
    if ((target.prop('selectionStart') != null) && target.prop('selectionStart') !== value.length) {
        return;
    }
    if (/\d\/$/.test(value)) {
        e.preventDefault();
        return setTimeout(function() {
            return target.val(value.replace(/\d\/$/, ''));
        });
    }
};

function hasTextSelected(target) {
  let _ref;
  if ((target.prop('selectionStart') != null) && target.prop('selectionStart') !== target.prop('selectionEnd')) {
    return true;
  }
  if ((typeof document !== "undefined" && document !== null ? (_ref = document.selection) != null ? _ref.createRange : void 0 : void 0) != null) {
    if (document.selection.createRange().text) {
      return true;
    }
  }
  return false;
};

function getDateParts(){
    const expiryDate = cardExpiryDateInput.value;
    let month, prefix, year, date_parts;
    date_parts = expiryDate.split(/[\s\/]+/, 2);
    month = date_parts[0];
    year = date_parts[1];
    if ((year != null ? year.length : void 0) === 2 && /^\d+$/.test(year)) {
      prefix = (new Date).getFullYear();
      prefix = prefix.toString().slice(0, 2);
      year = prefix + year;
    }
    month = parseInt(month, 10);
    year = parseInt(year, 10);
    return {
      month: month,
      year: year
    };
}

function validExpiryDate(month, year){
    if (!(month && year)) {
      return false;
    }
    if (!/^\d+$/.test(month)) {
      return false;
    }
    if (!/^\d+$/.test(year)) {
      return false;
    }
    if (!((1 <= month && month <= 12))) {
      return false;
    }
    if (year.toString().length != 4) {
        return false;
    }
    let currentTime = new Date();
    const currentMonth = currentTime.getMonth() + 1; // @param monthIndex — The month as a number between 0 and 11
    const currentYear = currentTime.getFullYear()
    if(year < currentYear || (month < currentMonth && year === currentYear)){
        return false
    }
    return true
}

function expiryDateFormatter(e) {
    return setTimeout(function() {
        let target, value, result;
        target = $(e.currentTarget);
        value = target.val();
        let mon, parts, sep, year;
        parts = value.match(/^\D*(\d{1,2})(\D+)?(\d{1,2})?/);
        if (!parts) {
            return target.val("");
        }
        mon = parts[1] || '';
        sep = parts[2] || '';
        year = parts[3] || '';

        if (mon.length === 1 && (mon !== '0' && mon !== '1')) {
            mon = "0" + mon;
            sep = '/';
        }
        if (mon.length === 2) {
            sep = '/';
        }
        if (sep.length > 1) {
            sep = '/';
        }
        return target.val(mon + sep + year);
    })
};

function handleRadioChange(e){
    if(e?.value === "Passport"){
        legalDocName = 'Passport'
        document.getElementById("passport-card").classList.add('active');
        document.getElementById("nic-card").classList.remove('active');
        document.getElementById("passport-container").style.display = "block"
        document.getElementById("nic-container").style.display = "none"
    }
    else{
        legalDocName = 'NIC'
        document.getElementById("nic-card").classList.add('active');
        document.getElementById("passport-card").classList.remove('active');
        document.getElementById("nic-container").style.display = "block"
        document.getElementById("passport-container").style.display = "none"
    }
}