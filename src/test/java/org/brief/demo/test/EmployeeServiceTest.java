package org.brief.demo.test;

import org.apache.log4j.Logger;
import org.brief.demo.service.EmployeeService;
import org.brief.demo.vo.Employee;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * Created by wangsy on 15/11/21.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:spring-mvc.xml")
public class EmployeeServiceTest {
    private Logger logger = Logger.getLogger(EmployeeServiceTest.class);
    @Autowired
    protected EmployeeService employeeService;

    @Test
    public void testFindEmployeeByName() {
        String name = "wangsy33";
        Employee employeeByName = employeeService.findEmployeeByName(name);
        logger.info(employeeByName);
        Assert.assertNotNull(employeeByName);
    }
}
