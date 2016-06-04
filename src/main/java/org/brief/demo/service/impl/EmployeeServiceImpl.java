package org.brief.demo.service.impl;


import org.brief.demo.dao.EmployeeMapper;
import org.brief.demo.vo.Employee;
import org.brief.demo.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    private EmployeeMapper employeeDao;

    /**
     * 使用用户名作为查询条件，查询用户对象
     */
    @Override
    public Employee findEmployeeByName(String name) {
        Employee employee = employeeDao.findEmployeeByName(name);
        return employee;
    }

    @Override
    public Employee login(String name, String passwd) {
        Employee employee = employeeDao.findEmployee4login(name, passwd);
        if (employee != null) {
            //这个用户是存在的

        } else {
            //这个用户不能存在
        }
        return employee;
    }

    @Override
    public List<Employee> queryList(int page, int rows) {
        return employeeDao.queryList(page, rows);
    }

}
