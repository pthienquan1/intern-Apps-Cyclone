package com.example.demo.entity;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * Created by quan0
 * Date 7/29/2023 - 3:12 PM
 * Description: ...
 */
@Entity
@Table(name = "`Account`")
public class Account implements Serializable {
    @Column(name = "AccountID")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private short id;

    @Column(name = "Email",nullable = false,length = 50,unique = true)
    private String email;

    @Column(name = "Username",nullable = false,length = 50,unique = true)
    private String userName;

    @Column(name = "Password", length = 200, nullable = false)
    private String password;
    @Column(name="FirstName",length = 50,nullable = false)
    private String firstName;

    @Column(name="LastName",length = 50,nullable = false)
    private String lastName;
    @Formula(" concat(FirstName, ' ', LastName) ")
    private String fullName;

    @Column(name="CreateDate")
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date createDate;

    @ManyToOne
    @JoinColumn(name="DepartmentID",nullable = false)
    private Department department;

//    @OneToMany(mappedBy = "author")
//    private List<Department> createdDepartment;

    public Account(){}

    public short getId() {
        return id;
    }

    public void setId(short id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

//    public List<Department> getCreatedDepartment() {
//        return createdDepartment;
//    }
//
//    public void setCreatedDepartment(List<Department> createdDepartment) {
//        this.createdDepartment = createdDepartment;
//    }
}
