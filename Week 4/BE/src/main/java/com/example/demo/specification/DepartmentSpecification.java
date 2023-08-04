package com.example.demo.specification;

import com.example.demo.entity.Department;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

/**
 * Created by quan0
 * Date 7/29/2023 - 5:05 PM
 * Description: ...
 */
public class DepartmentSpecification implements Specification<Department> {
    private static final long serialVersionUID = 1L;

    private String field;
    private String operator;
    private Object value;

    public DepartmentSpecification(String field, String operator, Object value) {
        this.field = field;
        this.operator = operator;
        this.value = value;
    }

    public DepartmentSpecification(){}

    @Override
    public Predicate toPredicate(Root<Department> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        if ( operator != null && field != null && operator.equalsIgnoreCase("LIKE") ) {
            if ( field.equalsIgnoreCase("author.fullName") ) {
                return criteriaBuilder.like(root.get("author").get("fullName"), "%" + value.toString() + "%");
            } else {
                return criteriaBuilder.like(root.get(field), "%" + value.toString() + "%");
            }
        }
        return null;
    }
}
