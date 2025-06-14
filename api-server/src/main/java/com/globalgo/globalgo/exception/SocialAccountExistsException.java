package com.globalgo.globalgo.exception;

public class SocialAccountExistsException extends RuntimeException {
    public SocialAccountExistsException(String message) {
        super(message);
    }
}