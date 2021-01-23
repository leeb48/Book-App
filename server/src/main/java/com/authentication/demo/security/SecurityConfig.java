package com.authentication.demo.security;

import com.authentication.demo.security.jwt.JwtAuthFilter;
import com.authentication.demo.security.jwt.JwtAuthenticationEntryPoint;
import com.authentication.demo.security.jwt.JwtTokenProvider;
import com.authentication.demo.security.oauth2.OAuth2AuthenticationSuccessHandler;
import com.authentication.demo.security.oauth2.Oauth2AuthenticationFailureHandler;
import com.authentication.demo.services.CustomOauth2UserService;
import com.authentication.demo.services.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.web.HttpSessionOAuth2AuthorizationRequestRepository;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static com.authentication.demo.security.SecurityConstants.OAUTH2_URLS;
import static com.authentication.demo.security.SecurityConstants.SIGN_UP_URLS;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
        securedEnabled = true,
        jsr250Enabled = true,
        prePostEnabled = true
)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserService userService;
    private final CustomOauth2UserService customOauth2UserService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final JwtAuthenticationEntryPoint unauthorizedHandler;
    private final HttpSessionOAuth2AuthorizationRequestRepository httpSessionOAuth2AuthorizationRequestRepository;

    private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
    private final Oauth2AuthenticationFailureHandler oauth2AuthenticationFailureHandler;

    private final JwtAuthFilter jwtAuthFilter;


    public SecurityConfig(UserService userService,
                          CustomOauth2UserService customOauth2UserService, BCryptPasswordEncoder bCryptPasswordEncoder,
                          JwtAuthenticationEntryPoint unauthorizedHandler, JwtTokenProvider jwtTokenProvider, HttpSessionOAuth2AuthorizationRequestRepository httpSessionOAuth2AuthorizationRequestRepository, OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler, Oauth2AuthenticationFailureHandler oauth2AuthenticationFailureHandler, JwtAuthFilter jwtAuthFilter) {
        this.userService = userService;
        this.customOauth2UserService = customOauth2UserService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.unauthorizedHandler = unauthorizedHandler;
        this.httpSessionOAuth2AuthorizationRequestRepository = httpSessionOAuth2AuthorizationRequestRepository;
        this.oAuth2AuthenticationSuccessHandler = oAuth2AuthenticationSuccessHandler;
        this.oauth2AuthenticationFailureHandler = oauth2AuthenticationFailureHandler;
        this.jwtAuthFilter = jwtAuthFilter;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .userDetailsService(userService)
                .passwordEncoder(bCryptPasswordEncoder);
    }

    @Override
    @Bean(name = BeanIds.AUTHENTICATION_MANAGER)
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors().and().csrf().disable()
                .exceptionHandling().authenticationEntryPoint(unauthorizedHandler)
                .and()

                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()

                .authorizeRequests()
                .antMatchers(
                        "/",
                        "/favicon.ico",
                        "/**/*.png",
                        "/**/*.gif",
                        "/**/*.svg",
                        "/**/*.jpg",
                        "/**/*.html",
                        "/**/*.css",
                        "/**/*.js"
                ).permitAll()
                .antMatchers(SIGN_UP_URLS).permitAll()
                .antMatchers(OAUTH2_URLS, "/api/test").permitAll()
                .anyRequest().authenticated()
                .and()

                .oauth2Login()
                .authorizationEndpoint()
                .baseUri("/api/oauth2/authorize")
                .authorizationRequestRepository(httpSessionOAuth2AuthorizationRequestRepository)
                .and()

                .redirectionEndpoint()
                .baseUri("/api/oauth2/callback/*")
                .and()

                .userInfoEndpoint()
                .userService(customOauth2UserService)
                .and()

                .successHandler(oAuth2AuthenticationSuccessHandler)
                .failureHandler(oauth2AuthenticationFailureHandler);

        // add in jwt filter
        http.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);


    }
}
