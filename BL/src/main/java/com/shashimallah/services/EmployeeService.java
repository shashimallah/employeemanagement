package com.shashimallah.services;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.shashimallah.models.Employee;
import com.shashimallah.repositories.EmployeeRepo;

@Service
@Transactional
public class EmployeeService implements UserDetailsService {

	private static final Logger logger = LoggerFactory.getLogger(EmployeeService.class);

	@Autowired
	private EmployeeRepo empRepo;

	public Employee saveEmployee(Employee employee) {
		logger.debug("Inside method saveEmployee()");
		return empRepo.save(employee);
	}

	public void deleteEmployee(Integer employeeId) {
		logger.debug("Inside method removeEmployee()");
		empRepo.deleteById(employeeId);
	}

	public Employee findEmpById(Integer employeeId) {
		logger.debug("Inside method findEmpById()");
		return empRepo.findById(employeeId).get();
	}

	public List<Employee> findAll() {
		logger.debug("Inside method findAll()");
		return empRepo.findAll();
	}

	public Employee updateEmployee(Employee employee) {
		logger.debug("Inside method updateEmployee()");
		return empRepo.save(employee);
	}

	public Employee findEmployeeByUsername(String username) {
		logger.debug("Inside method findEmployeeByUsername()");
		return empRepo.findByUsername(username);
	}

	public Employee findEmployeeByUsernamePassword(String username, String password) {
		logger.debug("Inside method findEmployeeByUsernamePassword()");
		return empRepo.findByUsernameAndPassword(username, password);
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		logger.debug("Inside method loadUserByUsername()");
		Employee employee = empRepo.findByUsername(username);
		if (employee == null) {
			logger.error("Employee not found with username: ." + username);
			throw new UsernameNotFoundException(username);
		}
		return employee;
	}

}
