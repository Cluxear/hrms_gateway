package com.tw.gateway.security;

/**
 * Constants for Spring Security authorities.
 */
public final class AuthoritiesConstants {

    public static final String ADMIN = "ROLE_ADMIN";

    public static final String USER = "ROLE_USER";

    public static final String ANONYMOUS = "ROLE_ANONYMOUS";

    public static final String CANDIDATE = "ROLE_CANDIDATE";

    public static final String HR = "ROLE_HR";

    private AuthoritiesConstants() {
    }
}
