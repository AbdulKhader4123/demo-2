package com.example.demo;

import java.util.Locale;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class FormController {

    @Autowired
    private MessageSource messageSource;
    @Autowired
    private MessageUtil messageUtil;

    @GetMapping("/")
    public String index() {
        return "redirect:/form";
    }

    @GetMapping("/form")
    public String formGet(Model model) {
       String loginTitle = messageSource.getMessage("loginTitle", null, Locale.getDefault());
        System.out.println("Login Title: " + loginTitle);
        model.addAttribute("msg", messageUtil); 
        model.addAttribute("url", new Url()); 
        model.addAttribute("properties", new Properties()); 

        // return "mcb-otp-max-attempt";
        return "mcb-cards-terms";
    }

    public static class Url {

        public String getResourcesPath() {
            return ""; 
        }
        public String getLoginRestartFlowUrl() {
            return ""; 
        }
        public String getLoginAction() {
            return ""; 
        }
    }

    public static class Properties {

        public String getMeta() {
            return "viewport==width=device-width,initial-scale=1"; 
        }

        public String getKcHtmlClass(){
            return "";
        }

        public String getStyles(){
            return "lib/backbase-theme/dist/backbase-theme.css bootstrap/css/bootstrap.min.css css/fonts/lato/lato-font.css css/mcb-box-page.css css/styles.css css/footer.css";
        }
        
        public String getScripts(){
            return "";
        }
        
        public String getKcBodyClass(){
            return "h-100vh w-100vw";
        }

        public String getKcLoginClass(){
            return "align-items-center box-container d-flex fill justify-content-center";
        }

        public String getContentColClass(){
            return "box-container d-flex justify-content-center align-items-center fill";
        }

        public String getBbCardContainerClass(){
            return "card user-message-box mcb-box-shadow-sm bg-white";
        }

        public String getBbAlert(){
            return "d-flex align-items-baseline";
        }

        public String getIndependentTemplateStyles(){
            return "css/header.css css/stepper.css css/registration.css css/phone-validation.css";
        }
    }
}
