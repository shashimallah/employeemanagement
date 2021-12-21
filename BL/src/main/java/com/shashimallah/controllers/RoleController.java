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
import com.shashimallah.models.Role;
import com.shashimallah.services.RoleService;

@RestController
@RequestMapping("/api/role")
public class RoleController {

	@Autowired
	private RoleService roleService;

	private static final Logger logger = LoggerFactory.getLogger(RoleController.class);

	@PostMapping("/save")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<Map<String, Object>> saveRole(@RequestBody(required = true) Role role) {
		logger.debug("Inside method saveRole()");
		if (role == null || role.getName() == null || role.getName().isEmpty()) {
			logger.error("Role object is not a valid object.");
			throw new BasicInputException(MessageConstant.CREATE_ERROR_MESSAGE);
		}
		role = roleService.saveRole(role);
		Map<String, Object> hmap = new HashMap<>();
		hmap.put("message", MessageConstant.CREATE_SUCCESS_MESSAGE);
		return new ResponseEntity<Map<String, Object>>(hmap, HttpStatus.CREATED);
	}

	@PutMapping("/update")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<Map<String, Object>> updateRole(@RequestBody(required = true) Role role) {
		logger.debug("Inside method updateRole()");
		if (role == null || role.getId() == null || role.getName() == null || role.getName().isEmpty()) {
			logger.error("Role object is not a valid object.");
			throw new BasicInputException(MessageConstant.UPDATE_ERROR_MESSAGE);
		}
		role = roleService.updateRole(role);
		Map<String, Object> hmap = new HashMap<>();
		hmap.put("message", MessageConstant.UPDATE_SUCCESS_MESSAGE);
		return new ResponseEntity<Map<String, Object>>(hmap, HttpStatus.OK);
	}

	@GetMapping("/find/{roleId}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<Role> findRole(@PathVariable(required = true) Integer roleId) {
		logger.debug("Inside method findRole()");
		if (roleId == null) {
			logger.error("Supplid Id is not valid.");
			throw new BasicInputException(MessageConstant.FIND_ERROR_MESSAGE);
		}
		Role role = roleService.findRoleById(roleId);
		return new ResponseEntity<Role>(role, HttpStatus.OK);
	}

	@GetMapping("/find/all")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<List<Role>> findAllRoles() {
		logger.debug("Inside method findAllRoles()");
		List<Role> allRoles = roleService.findAll();
		return new ResponseEntity<List<Role>>(allRoles, HttpStatus.OK);
	}

	@DeleteMapping("/delete/{roleId}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<Map<String, Object>> deleteRole(@PathVariable(required = true) Integer roleId) {
		logger.debug("Inside method deleteRole()");
		if (roleId == null) {
			logger.error("Supplid Id is not valid.");
			throw new BasicInputException(MessageConstant.DELETE_ERROR_MESSAGE);
		}
		roleService.deleteRoleById(roleId);
		Map<String, Object> hmap = new HashMap<>();
		hmap.put("message", MessageConstant.DELETE_SUCCESS_MESSAGE);
		return new ResponseEntity<Map<String, Object>>(hmap, HttpStatus.OK);
	}

}
