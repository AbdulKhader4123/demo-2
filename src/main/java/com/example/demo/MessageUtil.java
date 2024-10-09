package com.example.demo;

import java.util.Locale;

import org.springframework.context.MessageSource;
import org.springframework.stereotype.Component;

@Component
public class MessageUtil {
    private final MessageSource messageSource;

    public MessageUtil(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    public String get(String key) {
        System.out.println(key);
        return messageSource.getMessage(key, null, Locale.getDefault());
    }
}
