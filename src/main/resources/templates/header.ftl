<#macro headerLayout bodyClass="" displayInfo=false displayMessage=true displayWide=false>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
        <body>
            <div class="card top-banner">
                <div class="header-card px-4 py-3">
                    <span class="banner-logo mr-3"><img src="${url.resourcesPath}/img/mcb_logo.svg"/></span>
                    <span class="header-logo-title">${msg.get('ibHeaderTitle')}</span>
                </div>
            </div>
        </body>
    </html>
</#macro>
