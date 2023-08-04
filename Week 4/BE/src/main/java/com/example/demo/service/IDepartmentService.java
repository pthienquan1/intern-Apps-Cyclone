package com.example.demo.service;

import com.example.demo.entity.Department;
import com.example.demo.form.DepartmentFormCreate;
import com.example.demo.form.DepartmentFormUpdate;
import com.example.demo.repository.IDepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Created by quan0
 * Date 7/29/2023 - 4:55 PM
 * Description: ...
 */

public interface IDepartmentService {
    public Page<Department> getAllDepartments(Pageable pageable, String search);
    public Department getDepartmentById(short id);
    public Department getDepartmentByName(String name);
    public void createDepartment(DepartmentFormCreate departmentFormCreate);
    public void updateDepartment(short id, DepartmentFormUpdate departmentFormUpdate);
    public void deleteDepartment(short id);
}
