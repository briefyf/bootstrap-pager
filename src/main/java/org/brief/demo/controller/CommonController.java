package org.brief.demo.controller;


import org.brief.demo.service.EmployeeService;
import org.brief.demo.vo.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Controller
@RequestMapping("/common")
public class CommonController {
    @Autowired
    EmployeeService service;

    @RequestMapping("index")
    public ModelAndView home() {
        System.out.println("hehe");
        ModelAndView mv = new ModelAndView("index");
        return mv;
    }

    @RequestMapping("list")
    @ResponseBody
    public List<Employee> list(@RequestParam("offset") Integer offset, @RequestParam("limit") Integer limit, @RequestParam("order") String order) {
        List<Employee> list = service.queryList(offset * limit, limit);
        return list;
    }
}
