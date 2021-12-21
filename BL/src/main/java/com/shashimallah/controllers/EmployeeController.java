package com.shashimallah.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shashimallah.constants.MessageConstant;
import com.shashimallah.exceptions.BasicInputException;
import com.shashimallah.models.Employee;
import com.shashimallah.services.EmployeeService;

@RestController
@RequestMapping("/api/employee")
public class EmployeeController {

	@Autowired
	private EmployeeService empService;

	@Autowired
	private PasswordEncoder passwordEncoder;

	private static final Logger logger = LoggerFactory.getLogger(EmployeeController.class);

	@PostMapping("/save")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<Map<String, Object>> saveEmployee(@RequestBody(required = true) Employee employee) {
		logger.debug("Inside method saveEmployee()");
		if (employee == null || employee.getName() == null || employee.getName().isEmpty()) {
			logger.error("Employee object is not a valid object.");
			throw new BasicInputException(MessageConstant.CREATE_ERROR_MESSAGE);
		}
		employee.setPassword(passwordEncoder.encode(employee.getPassword()));
		employee = empService.saveEmployee(employee);
		Map<String, Object> hmap = new HashMap<>();
		hmap.put("message", MessageConstant.CREATE_SUCCESS_MESSAGE);
		return new ResponseEntity<Map<String, Object>>(hmap, HttpStatus.CREATED);
	}

	@PutMapping("/update")
	public ResponseEntity<Map<String, Object>> updateEmployee(@RequestBody(required = true) Employee employee) {
		logger.debug("Inside method updateEmployee()");
		if (employee == null || employee.getId() == null || employee.getName() == null
				|| employee.getName().isEmpty()) {
			logger.error("Employee object is not a valid object.");
			throw new BasicInputException(MessageConstant.UPDATE_ERROR_MESSAGE);
		}
		employee = empService.updateEmployee(employee);
		Map<String, Object> hmap = new HashMap<>();
		hmap.put("message", MessageConstant.UPDATE_SUCCESS_MESSAGE);
		return new ResponseEntity<Map<String, Object>>(hmap, HttpStatus.OK);
	}

	@DeleteMapping("/delete/{employeeId}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<Map<String, Object>> deleteEmployee(@PathVariable(required = true) Integer employeeId) {
		logger.debug("Inside method deleteEmployee()");
		if (employeeId == null) {
			logger.error("employeeId is null.");
			throw new BasicInputException(MessageConstant.DELETE_ERROR_MESSAGE);
		}
		empService.deleteEmployee(employeeId);
		Map<String, Object> hmap = new HashMap<>();
		hmap.put("message", MessageConstant.DELETE_SUCCESS_MESSAGE);
		return new ResponseEntity<Map<String, Object>>(hmap, HttpStatus.OK);
	}

	@GetMapping("/find/{employeeId}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<Employee> findEmployee(@PathVariable(required = true) Integer employeeId) {
		logger.debug("Inside method findEmployee()");
		if (employeeId == null) {
			logger.error("employeeId is null.");
			throw new BasicInputException(MessageConstant.FIND_ERROR_MESSAGE);
		}
		Employee employee = empService.findEmpById(employeeId);
		return new ResponseEntity<Employee>(employee, HttpStatus.OK);
	}

	@GetMapping("/find/all")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<List<Employee>> findAllEmployees() {
		logger.debug("Inside method findAllEmployees()");
		List<Employee> employees = empService.findAll();
		return new ResponseEntity<List<Employee>>(employees, HttpStatus.OK);
	}

}
