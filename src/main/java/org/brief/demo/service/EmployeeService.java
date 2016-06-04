package org.brief.demo.service;


import org.brief.demo.vo.Employee;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by Administrator on 2015/10/17.
 */
@Component(value = "employeeService")
public interface EmployeeService {
    Employee findEmployeeByName(String name);

    Employee login(String name, String passwd);

    List<Employee> queryList(int page, int rows);
}
