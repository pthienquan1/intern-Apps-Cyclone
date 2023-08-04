package com.example.demo.service;

import com.example.demo.entity.Account;
import com.example.demo.entity.Department;
import com.example.demo.form.DepartmentFormCreate;
import com.example.demo.form.DepartmentFormUpdate;
import com.example.demo.repository.IAccountRepository;
import com.example.demo.repository.IDepartmentRepository;
import com.example.demo.specification.DepartmentSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

/**
 * Created by quan0
 * Date 7/29/2023 - 5:02 PM
 * Description: ...
 */
@Service
public class DepartmentService implements IDepartmentService{
    @Autowired
    private IDepartmentRepository departmentRepository;

    @Autowired
    private IAccountRepository accountRepository;


    @Override
    public Page<Department> getAllDepartments(Pageable pageable, String search) {
        Specification<Department> where = null;
        if(!StringUtils.isEmpty(search)){
            DepartmentSpecification nameSpecification = new DepartmentSpecification("departmentName","LIKE",search);

            where = Specification.where(nameSpecification);

        }
        return departmentRepository.findAll(where,pageable);
    }

    @Override
    public Department getDepartmentById(short id) {
        return departmentRepository.findById(id).get();
    }

    @Override
    public Department getDepartmentByName(String name) {
        return departmentRepository.findByDepartmentName(name);
    }

    @Override
    public void createDepartment(DepartmentFormCreate departmentFormCreate) {

        Department department = new Department();

        department.setDepartmentName(departmentFormCreate.getName());

        departmentRepository.save(department);
    }

    @Override
    public void updateDepartment(short id, DepartmentFormUpdate departmentFormUpdate) {
        Department dept = getDepartmentById(id);
        dept.setDepartmentName(departmentFormUpdate.getName());
        departmentRepository.save(dept);
    }

    @Override
    public void deleteDepartment(short id) {
        departmentRepository.deleteById(id);
    }
}
