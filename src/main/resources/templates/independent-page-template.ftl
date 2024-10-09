<#import "footer.ftl" as footer />
<#import "header.ftl" as header />
<#macro newTemplateLayout bodyClass="asdfasdf" displayInfo=false displayMessage=true displayWide=false>
    <!DOCTYPE
        html
        PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html
        xmlns="http://www.w3.org/1999/xhtml"
        class="${properties.kcHtmlClass!}">

    <head>
        <meta charset="utf-8">
        <meta
            http-equiv="Content-Type"
            content="text/html; charset=UTF-8" />
        <meta
            name="robots"
            content="noindex, nofollow">
        <#if properties.meta?has_content>
            <#list properties.meta?split(' ') as meta>
            <meta name="${meta?split('==')[0]}" content="${meta?split('==')[1]}"/>
        </#list>
    </#if>
    <title>
${msg.get("loginTitle")}
</title>
    <link rel="icon" href="${url.resourcesPath}/img/favicon.ico" />
    <#if properties.styles?has_content>
        <#list properties.styles?split(' ') as style>
            <link href="${url.resourcesPath}/${style}" rel="stylesheet" />
        </#list>
    </#if>
    <#if properties.independentTemplateStyles?has_content>
        <#list properties.independentTemplateStyles?split(' ') as style>
            <link href="${url.resourcesPath}/${style}" rel="stylesheet" />
        </#list>
    </#if>
    <link href="${url.resourcesPath}/css/card-details.css?v=${.now?long?c}" rel="stylesheet" />
    <link href="${url.resourcesPath}/css/email-terms.css?v=${.now?long?c}" rel="stylesheet" />
    <link href="${url.resourcesPath}/css/set-password.css?v=${.now?long?c}" rel="stylesheet" />
    <script src="${url.resourcesPath}/bootstrap/js/jquery-3.6.3.min.js"></script>
</head>
<body class="bg-white">
    <@header.headerLayout></@header.headerLayout>
    <div class="container-xxl independent-page_container">
      <#nested "form">
    </div>
    <@footer.footerLayout></@footer.footerLayout>
    <script src="${url.resourcesPath}/js/vendor/encryption_rsa.js" type="text/javascript" defer></script>
    <script src="${url.resourcesPath}/bootstrap/js/popper.min.js"></script>
    <script src="${url.resourcesPath}/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="${url.resourcesPath}/js/controllers/common.js?v=${.now?long?c}" type="text/javascript"></script>
</body>
</html>
</#macro>