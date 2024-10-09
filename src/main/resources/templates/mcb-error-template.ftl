<#import "footer.ftl" as footer />
<#import "header.ftl" as header />
<#macro errorLayout bodyClass="" displayInfo=false displayMessage=true displayWide=false>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" class="${properties.kcHtmlClass!}">

    <head>
        <meta charset="utf-8">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="robots" content="noindex, nofollow">
        <#if properties.meta?has_content>
            <#list properties.meta?split(' ') as meta>
                <meta name="${meta?split('==')[0]}" content="${meta?split('==')[1]}"/>
            </#list>
        </#if>
        <title>
${msg.get("loginTitle")}
</title>
        <link rel="icon" href="${url.resourcesPath}/img/favicon.ico" />
        <link href="${url.resourcesPath}/css/error-template.css?v=${.now?long?c}" rel="stylesheet" />
        <link href="${url.resourcesPath}/css/fonts/lato/lato-font.css" rel="stylesheet">
        <#if properties.styles?has_content>
            <#list properties.styles?split(' ') as style>
                <link href="${url.resourcesPath}/${style}" rel="stylesheet" />
            </#list>
        </#if>
        <#if properties.scripts?has_content>
            <#list properties.scripts?split(' ') as script>
                <script src="${url.resourcesPath}/${script}" type="text/javascript"></script>
            </#list>
        </#if>
        <#if scripts??>
            <#list scripts as script>
                <script src="${script}" type="text/javascript"></script>
            </#list>
        </#if>
    </head>
    <body class="${properties.kcBodyClass!} bg-white">
        <@header.headerLayout></@header.headerLayout>
            <div class="error-container">
                <#nested "error">
            </div>
        <@footer.footerLayout></@footer.footerLayout>
    </body>
    </html>
</#macro>