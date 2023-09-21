package com.jb.couponSystem2.security;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.Objects;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class TokenInformation {
    private int id;
    private Timestamp timestamp;
    private ClientType clientType;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TokenInformation that = (TokenInformation) o;
        return id == that.id && clientType == that.clientType;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, clientType);
    }
}
