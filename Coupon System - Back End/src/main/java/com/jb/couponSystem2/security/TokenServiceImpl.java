package com.jb.couponSystem2.security;

import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class TokenServiceImpl implements TokenService {
    private Map<UUID, TokenInformation> tokens = new HashMap<>();
    @Override
    public UUID addToken(int clientID, ClientType clientType) {
        UUID token = UUID.randomUUID();
        TokenInformation information = new TokenInformation(clientID, Timestamp.valueOf(LocalDateTime.now()), clientType);
        if (this.tokens.containsValue(information)) {
            this.tokens.values().remove(information);
        }
        this.tokens.put(token, information);
        return token;
    }
    @Override
    public boolean authorized(ClientType clientType, UUID token) {
        boolean authorized = false;
        TokenInformation tokenInformation = this.tokens.get(token);
        if (tokenInformation != null && tokenInformation.getClientType().equals(clientType)) {
            authorized = true;
        }
        return authorized;
    }
    @Override
    public int getIdByToken(UUID token) {
        return this.tokens.get(token).getId();
    }
    @Override
    public void clearExpiredTokens() {
        this.tokens.entrySet().removeIf(token -> token.getValue().getTimestamp().toLocalDateTime().isBefore(LocalDateTime.now().minusMinutes(30)));
    }
}
