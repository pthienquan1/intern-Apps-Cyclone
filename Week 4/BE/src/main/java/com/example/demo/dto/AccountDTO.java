package com.example.demo.dto;

/**
 * Created by quan0
 * Date 7/29/2023 - 3:37 PM
 * Description: ...
 */
public class AccountDTO {
    private short id;
    private String fullName;

    public AccountDTO(short id, String fullName) {
        this.id = id;
        this.fullName = fullName;
    }

    public short getId() {
        return id;
    }

    public void setId(short id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
}
