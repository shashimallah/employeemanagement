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
import com.shashimallah.models.Department;
import com.shashimallah.services.DepartmentService;

@RestController
@RequestMapping("/api/department")
public class DepartmentController {

	@Autowired
	private DepartmentService deptService;

	private static final Logger logger = LoggerFactory.getLogger(DepartmentController.class);

	@PostMapping("/save")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<Map<String, Object>> saveDepartment(@RequestBody(required = true) Department dept) {
		logger.debug("Inside method saveDepartment()");
		if (dept == null || dept.getName() == null || dept.getName().isEmpty()) {
			logger.error("Department object is not a valid object.");
			throw new BasicInputException(MessageConstant.CREATE_ERROR_MESSAGE);
		}
		dept = deptService.saveDepartment(dept);
		Map<String, Object> hmap = new HashMap<>();
		hmap.put("message", MessageConstant.CREATE_SUCCESS_MESSAGE);
		return new ResponseEntity<Map<String, Object>>(hmap, HttpStatus.OK);
	}

	@PutMapping("/update")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<Map<String, Object>> updateDepartment(@RequestBody(required = true) Department dept) {
		logger.debug("Inside method updateDepartment()");
		if (dept == null || dept.getId() == null || dept.getName() == null || dept.getName().isEmpty()) {
			logger.error("Department object is not a valid object.");
			throw new BasicInputException(MessageConstant.UPDATE_ERROR_MESSAGE);
		}
		dept = deptService.updateDepartment(dept);
		Map<String, Object> hmap = new HashMap<>();
		hmap.put("message", MessageConstant.UPDATE_SUCCESS_MESSAGE);
		return new ResponseEntity<Map<String, Object>>(hmap, HttpStatus.OK);
	}

	@GetMapping("/find/{deptId}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<Department> findDepartment(@PathVariable(required = true) Integer deptId) {
		logger.debug("Inside method findDepartment()");
		if (deptId == null) {
			logger.error("Supplid Id is not valid.");
			throw new BasicInputException(MessageConstant.FIND_ERROR_MESSAGE);
		}
		Department department = deptService.findDeptById(deptId);
		return new ResponseEntity<Department>(department, HttpStatus.OK);
	}

	@GetMapping("/find/all")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<List<Department>> findAllRoles() {
		logger.debug("Inside method findAllRoles()");
		List<Department> allDept = deptService.findAll();
		return new ResponseEntity<List<Department>>(allDept, HttpStatus.OK);
	}

	@DeleteMapping("/delete/{deptId}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<Map<String, Object>> deleteDepartment(@PathVariable(required = true) Integer deptId) {
		logger.debug("Inside method deleteDepartment()");
		if (deptId == null) {
			logger.error("Supplid Id is not valid.");
			throw new BasicInputException(MessageConstant.DELETE_ERROR_MESSAGE);
		}
		deptService.removeDeptById(deptId);
		Map<String, Object> hmap = new HashMap<>();
		hmap.put("message", MessageConstant.DELETE_SUCCESS_MESSAGE);
		return new ResponseEntity<Map<String, Object>>(hmap, HttpStatus.OK);
	}

}
