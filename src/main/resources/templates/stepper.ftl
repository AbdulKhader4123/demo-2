<#macro stepperLayout active flow=''>
  <div class="stepper-container">
    <div class="stepper-header">
      <#if flow!='forget_password'>
        ${msg.get('onboardingHeader')}
        <#else>
          ${msg.get('resetPasswordHeader')}
      </#if>
    </div>
    <div class="d-none d-md-block">
      <div class="stepper">
        <div class="step <#if active==1>active</#if><#if active gt 1>completed</#if>">
          <span class="circle"></span>
        </div>
        <div class="step <#if active==2>active</#if><#if active gt 2>completed</#if>">
          <span class="circle"></span>
        </div>
        <#if flow!='forget_password'>
          <div class="step <#if active==3>active</#if><#if active gt 3>completed</#if>">
            <span class="circle"></span>
          </div>
        </#if>
        <div class="step <#if active==4>active</#if><#if active gt 4>completed</#if>">
          <span class="circle"></span>
        </div>
        <div class="step <#if active==5>active</#if>">
          <span class="circle"></span>
        </div>
      </div>
      <div class="stepper-labels">
        <div class="step-lebel">Confirm Mobile</div>
        <div class="step-lebel">Verification</div>
        <#if flow!='forget_password'>
          <div class="step-lebel">Terms & Conditions</div>
        </#if>
        <div class="step-lebel">Email confirmation</div>
        <div class="step-lebel">Set new password</div>
        <#-- <div class="step-lebel">Log in
      </div> -->
    </div>
  </div>
  </div>
</#macro>