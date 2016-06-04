package org.brief.demo.dao;


import org.apache.ibatis.annotations.Param;
import org.brief.demo.vo.Employee;

import java.util.List;

/**
 * Created by Administrator on 2015/10/17.
 */
public interface EmployeeMapper {
    Employee findEmployeeByName(@Param(value = "_name") String name);

    Employee findEmployee4login(@Param(value = "_name") String name, @Param("passwd") String passwd);

    List<Employee> queryList(@Param(value = "page") Integer page, @Param("rows") Integer rows);
}
