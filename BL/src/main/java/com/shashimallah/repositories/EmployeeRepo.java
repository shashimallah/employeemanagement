package com.shashimallah.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shashimallah.models.Employee;

@Repository
public interface EmployeeRepo extends JpaRepository<Employee, Integer> {

	public Employee findByUsername(String username);

	public boolean existsByUsername(String username);
	
	public Employee findByUsernameAndPassword(String username, String password);

}
