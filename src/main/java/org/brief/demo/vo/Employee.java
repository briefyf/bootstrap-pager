package org.brief.demo.vo;

import lombok.Data;

import java.io.Serializable;

/**
 * 用户表
 */

@Data
//@Entity(name = "employee")
public class Employee  implements Serializable{
    private Integer id;//主键ID
    private String name;//用户名
    private String password;//密码
    private String email;//电子邮箱
    private String role;//角色
    private Employee manager;//自联外键约束表示当前员工的上级管理

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Employee getManager() {
        return manager;
    }

    public void setManager(Employee manager) {
        this.manager = manager;
    }
}

