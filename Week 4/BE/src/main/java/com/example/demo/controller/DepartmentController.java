package com.example.demo.controller;

import com.example.demo.dto.AccountDTO;
import com.example.demo.dto.DepartmentDTO;
import com.example.demo.entity.Department;
import com.example.demo.form.DepartmentFormCreate;
import com.example.demo.form.DepartmentFormUpdate;
import com.example.demo.service.IDepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.function.Function;

/**
 * Created by quan0
 * Date 7/29/2023 - 5:29 PM
 * Description: ...
 */
@RestController
@RequestMapping(value="api/v1/departments")
@CrossOrigin("*")
public class DepartmentController {
    @Autowired
    private IDepartmentService departmentService;

    @GetMapping()
    public ResponseEntity<?> getAllDepartments(Pageable pageable, @RequestParam(required = false) String search){
        Page<Department> deptPage = departmentService.getAllDepartments(pageable,search);
        Page<DepartmentDTO> dtoDeptPage = deptPage.map(new Function<Department, DepartmentDTO>() {
            @Override
            public DepartmentDTO apply(Department department) {
                DepartmentDTO deptDto = new DepartmentDTO(department.getId(),department.getDepartmentName(),department.getCreateDate());
                return deptDto;
            }

        });
        return new ResponseEntity<>(dtoDeptPage, HttpStatus.OK);
    }
    @GetMapping(value = "name/{id}")
    public ResponseEntity<?> getDepartmentById(@PathVariable(name="id") short id){
        return new ResponseEntity<Department>(departmentService.getDepartmentById(id),HttpStatus.OK);
    }
    @GetMapping(value = "name/{name}")
    public ResponseEntity<?> getDepartmentByName(@PathVariable(name="name") String name){
        return new ResponseEntity<Department>(departmentService.getDepartmentByName(name),HttpStatus.OK);
    }
    @PostMapping()
    public ResponseEntity<?> createDepartment(@RequestBody DepartmentFormCreate formCreate){
        departmentService.createDepartment(formCreate);
        return new ResponseEntity<String>("Create department thành công !",HttpStatus.CREATED);
    }
    @PutMapping(value = "/{id}")
    public ResponseEntity<?> updateDepartment(@RequestBody DepartmentFormUpdate formUpdate, @PathVariable(name = "id") short id){
        departmentService.updateDepartment(id,formUpdate);
        return new ResponseEntity<String>("Update department thành công !",HttpStatus.OK);
    }
    @DeleteMapping(value="/{id}")
    public ResponseEntity<?> deleteDepartment(@PathVariable(name="id") short id){
        departmentService.deleteDepartment(id);
        return new ResponseEntity<String>("Delete department thành công !", HttpStatus.OK);
    }
}
