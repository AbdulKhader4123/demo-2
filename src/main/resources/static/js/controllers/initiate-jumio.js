let jumioBtn;

$( document ).ready(function() {
  
    jumioBtn = document.getElementById('jumioBtn');
    $("#jumio-wrapper").hide();

    $(jumioBtn).on("click", event => {
        $("#jumio-wrapper").show();
        $("#continueJumioVerificationWrapper").hide();
    });
});

