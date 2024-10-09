<#import "independent-page-template.ftl" as layout />
<#import "stepper.ftl" as stepper />
<@layout.newTemplateLayout displayMessage=false; section>
  <@stepper.stepperLayout active=3 flow=flowType>
  </@stepper.stepperLayout>
  <#if section="form">
    <div class="verification-step-terms">
      <div class="margin-bottom-24">
        <h1 class="margin-bottom-32">
          A few more steps to go…
        </h1>
        <p class="margin-bottom-40">
          ${(msg.get("termsText"))}
        </p>
        <div class="row mb-5">
            <div class="col px-4">
                <label class="mcb-form-check"> 
                    <input type="checkbox" onclick="onAcceptingTerms()" id="checkbox"/>
                    <span class="checkmark"></span>
                    <p class="pt-1"> ${msg.get("termsAgreeText")} </p>
                </label>
            </div>
        </div>
        <form class="form-actions mcb-mb-sticky-footer mcb-mb-fixed-footer" name="termsForm" id="termsForm" action="${url.loginAction}" method="POST">
          <input type="text" id="accept" name="accept" value="Continue" hidden />
          <div class="text-center">
            <button type="submit" aria-label="Favourite" class="btn-danger confirmBtn" id="confirmBtn" disabled> ${msg.get('submitText')} </button>
          </div>
        </form>
      </div>
  </#if>
</@layout.newTemplateLayout>
<script src="${url.resourcesPath}/js/controllers/email-terms.js?v=${.now?long?c}" type="text/javascript"></script>