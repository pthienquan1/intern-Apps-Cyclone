package com.example.demo.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

/**
 * Created by quan0
 * Date 7/29/2023 - 3:34 PM
 * Description: ...
 */
public class DepartmentDTO {
    private short id;
    private String name;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date createDate;

    public DepartmentDTO(short id, String name, Date createDate) {
        this.id = id;
        this.name = name;

        this.createDate = createDate;
    }

    public short getId() {
        return id;
    }

    public void setId(short id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }



    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }
}
