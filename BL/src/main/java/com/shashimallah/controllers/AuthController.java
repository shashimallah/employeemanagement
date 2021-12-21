package com.shashimallah.controllers;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shashimallah.constants.MessageConstant;
import com.shashimallah.models.Employee;
import com.shashimallah.repositories.EmployeeRepo;
import com.shashimallah.services.EmployeeService;
import com.shashimallah.utils.JwtUtils;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtUtils jwtUtils;

	@Autowired
	private EmployeeRepo empRepo;

	@Autowired
	private EmployeeService empService;

	@Autowired
	private PasswordEncoder passEncoder;

	@PostMapping("/login")
	public ResponseEntity<Map<String, Object>> login(@RequestBody Employee uiEmployee) {
		logger.debug("Inside method login()");
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(uiEmployee.getUsername(), uiEmployee.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);
		logger.debug("Token is successfully created: " + jwt);
		Map<String, Object> hmap = new HashMap<>();
		hmap.put("token", jwt);
		Employee loginEmployee = empService.findEmployeeByUsername(uiEmployee.getUsername());
		hmap.put("username", loginEmployee.getUsername());
		hmap.put("name", loginEmployee.getName());
		hmap.put("contactNumber", loginEmployee.getContactNumber());
		hmap.put("email", loginEmployee.getEmail());
		hmap.put("salary", loginEmployee.getSalary());
		hmap.put("id", loginEmployee.getId());
		hmap.put("roles", loginEmployee.getRoles());
		return new ResponseEntity<Map<String, Object>>(hmap, HttpStatus.OK);
	}

	@PostMapping("/register")
	public ResponseEntity<Map<String, Object>> register(@RequestBody Employee uiEmployee) {
		logger.debug("Inside method register()");
		Map<String, Object> hmap = new HashMap<>();
		if (empRepo.existsByUsername(uiEmployee.getUsername())) {
			hmap.put("message", "Username already exist.");
			return new ResponseEntity<Map<String, Object>>(hmap, HttpStatus.BAD_REQUEST);
		}
		if (empRepo.existsByUsername(uiEmployee.getEmail())) {
			hmap.put("message", "Email already exist.");
			return new ResponseEntity<Map<String, Object>>(hmap, HttpStatus.BAD_REQUEST);
		}
		uiEmployee.setPassword(passEncoder.encode(uiEmployee.getPassword()));
		uiEmployee = empService.saveEmployee(uiEmployee);
		logger.debug("Employee is successfully created with Id: " + uiEmployee.getId());
		hmap.put("message", "Employee is successfully registered.");
		return new ResponseEntity<Map<String, Object>>(hmap, HttpStatus.OK);
	}

	@GetMapping("/profile")
	public ResponseEntity<Employee> getLoginUser() {
		logger.debug("Inside method getLoginUser()");
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		Employee employee = (Employee) auth.getPrincipal();
//		Employee employee = empService.findEmployeeByUsernamePassword(username, password);
		return new ResponseEntity<Employee>(employee, HttpStatus.OK);
	}

	@PostMapping("/logout")
	public ResponseEntity<Map<String, Object>> logout(HttpServletRequest request, HttpServletResponse response) {
		logger.debug("Inside method logout()");
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (auth != null) {
			SecurityContextLogoutHandler logoutHandler = new SecurityContextLogoutHandler();
			logoutHandler.setClearAuthentication(true);
			logoutHandler.setInvalidateHttpSession(true);
			logoutHandler.logout(request, response, auth);
			SecurityContextHolder.getContext().setAuthentication(null);
		}
		Map<String, Object> hmap = new HashMap<>();
		logger.debug("Employee is successfully logged out.");
		hmap.put("message", MessageConstant.LOGOUT_SUCCESS_MESSAGE);
		return new ResponseEntity<Map<String, Object>>(hmap, HttpStatus.OK);
	}

}
