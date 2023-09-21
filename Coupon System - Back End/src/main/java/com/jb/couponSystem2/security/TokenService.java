package com.jb.couponSystem2.security;

import java.util.UUID;

public interface TokenService {
    UUID addToken(int clientID, ClientType clientType);
    boolean authorized(ClientType clientType, UUID token);
    int getIdByToken(UUID token);
    void clearExpiredTokens();
}
