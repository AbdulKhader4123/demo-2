function urlEncodeFormData(formData) {
    return Object.keys(formData)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(formData[key]))
        .join('&');
}

function onAcceptingTerms() {
    var confirmButton = document.getElementById("confirmBtn");
    var accepted = document.getElementById("checkbox").checked;
    accepted ? confirmButton.removeAttribute("disabled") : confirmButton.setAttribute("disabled", 'true')
}

async function restartLogin() {
    const url = document.getElementById('restart')?.getAttribute('value');
    let request = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
    };
    try {
        let result = await fetch(url, request);
        let response = await result.text();
        if (response) {
            document.open();
            document.write(response)
        }
    }
    catch (error) {
        document.write(error)
    }
}

$(document).ready(function() {
    $("#needHelpRedirectBtn").hide();
    $("#needHelpConfirmBtn").show();
    document.getElementById("option1").checked = true;
});

function needHelpRadioChanged() {
    var form = document.getElementById("need-help-radio");
    var needhelpValue = form.elements["requestParam"].value;
    if(needhelpValue == 'external') {
      $("#needHelpRedirectBtn").show();
      $("#needHelpConfirmBtn").hide();
    }else {
      $("#needHelpRedirectBtn").hide();
      $("#needHelpConfirmBtn").show();
    }
}
