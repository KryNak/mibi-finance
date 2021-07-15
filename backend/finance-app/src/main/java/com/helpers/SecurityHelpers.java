package com.helpers;

import com.google.common.base.Strings;
import com.sun.org.apache.xerces.internal.impl.dv.util.Base64;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;
import java.util.concurrent.TimeUnit;

public class SecurityHelpers {

    public static String generateRefreshToken(){
        byte[] bytes = new byte[64];
        ThreadLocalRandom.current().nextBytes(bytes);
        return Base64.encode(bytes);
    }

    public static String generateJwtToken(String login, String secret){
        return Jwts.builder()
                .addClaims(
                        new HashMap<String, Object>() {
                            {
                                put("Name", login);
                                put("Role", "User");
                            }
                        }
                )
                .setAudience("http://localhost:8080")
                .setIssuer("http://localhost:8080")
                .setExpiration(new Date(System.currentTimeMillis() + TimeUnit.MINUTES.toMillis(1)))
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();
    }

    public static boolean isTokenValid(String username, String token, String secret){
        try {
            Jwts.parser()
                    .requireIssuer("http://lcoalhost:8080")
                    .requireAudience("http://localhost:8080")
                    .setSigningKey(secret)
                    .parseClaimsJwt(token);

            return true;
        } catch (ExpiredJwtException e) {

            Claims claims = e.getClaims();

            if(Objects.isNull(claims)){
                return false;
            }

            if(!Strings.isNullOrEmpty(Optional.ofNullable(claims.get("Name")).map(Object::toString).orElse(""))){
                return claims.get("Name").toString().equals(username);
            }

            return false;
        } catch (Exception e){
            return false;
        }
    }



}
