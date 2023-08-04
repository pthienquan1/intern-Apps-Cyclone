package com.example.demo.form;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Created by quan0
 * Date 7/29/2023 - 4:14 PM
 * Description: ...
 */

public class DepartmentFormCreate {
    private String name;


    public DepartmentFormCreate() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


}
