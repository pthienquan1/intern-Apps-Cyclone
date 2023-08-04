package com.example.demo.repository;

import com.example.demo.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

/**
 * Created by quan0
 * Date 7/29/2023 - 4:19 PM
 * Description: ...
 */
@Repository
public interface IDepartmentRepository extends JpaRepository<Department,Short>, JpaSpecificationExecutor<Department> {
    public Department findByDepartmentName(String name);
}

