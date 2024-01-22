package com.devminds.rentify.config;

import com.devminds.rentify.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.codec.Hex;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.yaml.snakeyaml.Yaml;

import javax.crypto.spec.SecretKeySpec;
import java.io.IOException;
import java.io.InputStream;
import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
@NoArgsConstructor
public class JwtService {
    private  Key signInKey;

    private static final long TOKEN_VALIDITY_DURATION = 2000000L;

    private static final String secretKey = "21974a72b5ada4edad7a26657647bec67855af08ad10183d67f5cc4b0e31bce3" ;



//    @PostConstruct
//    private void init() {
//        try {
//            byte[] keyBytes = Hex.decode(this.secretKey);
//            this.signInKey = Keys.hmacShaKeyFor(keyBytes);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }

    @PostConstruct
    private void init() {
        try {
            byte[] keyBytes = Hex.decode(this.secretKey);
            this.signInKey = new SecretKeySpec(keyBytes, SignatureAlgorithm.HS256.getJcaName());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }



    private Key getSignInKeyFromConfig() throws IOException {
        if (signInKey == null) {
            throw new IllegalStateException("signInKey is null");
        }
        return signInKey;
    }


    private String loadSecretKeyFromConfig() {

        return secretKey;
    }




    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public String generateToken(User userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    public String generateToken(Map<String, Object> extraClaims, User userDetails) {
        Key key = Keys.hmacShaKeyFor(secretKey.getBytes());
        String token = Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + TOKEN_VALIDITY_DURATION))
                .signWith(signInKey, SignatureAlgorithm.HS256)
                .compact();

        // Log the generated token
        logGeneratedToken(token);

        return token;
    }
    private void logGeneratedToken(String token) {

        System.out.println("Generated Token: " + token);
    }

    private void logExceptionDuringTokenProcessing(Exception e) {
      ;
        e.printStackTrace();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        System.out.println("Signing Key for Token Generation: " + signInKey);
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }


    public String extractUsername(String token) {
        try {

            System.out.println("Received Token: " + token);
            Key verificationKey = getSignInKeyFromConfig();
            System.out.println("Verification Key for Token Extraction: " + verificationKey);
            // Extract claims and log the email value
            Claims claims = extractAllClaims(token);


            return extractClaim(token, Claims::getSubject);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private Claims extractAllClaims(String token) {
        try {
            System.out.println("Verification Key for Token Extraction: " + signInKey);


            return Jwts.parserBuilder().setSigningKey(signInKey).build().parseClaimsJws(token).getBody();
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Exception during extractAllClaims: " + e.getMessage());
            return null;
        }
    }


}
