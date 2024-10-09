<#import "mcb-error-template.ftl" as layout />
<@layout.errorLayout displayMessage=false; section>
  <#if section="error">
    <img class="error-img" src="${url.resourcesPath}/img/error_illustration.svg" />
    <h1 class="mb-3">
      ${msg.get('otpMaxAttemptsTitle')}
    </h1>
    <p class="error-description margin-bottom-40">
      ${msg.get('otpMaxAttemptsDescription')}
    </p>
    <button type="button" onclick="location.href='${url.loginRestartFlowUrl}'" class="error-button btn-lg mcb-btn">
      ${msg.get('done')}
    </button>
  </#if>
</@layout.errorLayout>