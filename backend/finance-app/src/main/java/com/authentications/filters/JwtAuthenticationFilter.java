package com.authentications.filters;

import com.properties.SecretProperty;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

public class JwtAuthenticationFilter extends BasicAuthenticationFilter {

    private SecretProperty secretProperty;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, SecretProperty secretProperty) {
        super(authenticationManager);
        this.secretProperty = secretProperty;
    }


    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {
        String tokenBearer = httpServletRequest.getHeader("Authorization");

        if(tokenBearer == null){
            filterChain.doFilter(httpServletRequest, httpServletResponse);
            return;
        }

        if(!tokenBearer.startsWith("Bearer ")){
            filterChain.doFilter(httpServletRequest, httpServletResponse);
            return;
        }

        tokenBearer = tokenBearer.replaceFirst("Bearer ", "").trim();

        try{
            Claims claims = Jwts.parser()
                    .setSigningKey(secretProperty.getSecret())
                    .parseClaimsJws(tokenBearer)
                    .getBody();

            String login = claims.get("Name").toString();
            GrantedAuthority role = new SimpleGrantedAuthority(String.format("ROLE_%s", claims.get("Role")));
            Authentication authenticate = getAuthenticationManager().authenticate(new UsernamePasswordAuthenticationToken(login, null, Collections.singleton(role)));
            SecurityContextHolder.getContext().setAuthentication(authenticate);

        }catch (ExpiredJwtException e){
            httpServletResponse.addHeader("isExpired", "true");
            filterChain.doFilter(httpServletRequest, httpServletResponse);
            return;
        }catch (Exception ex){
            filterChain.doFilter(httpServletRequest, httpServletResponse);
            return;
        }

        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }
}
