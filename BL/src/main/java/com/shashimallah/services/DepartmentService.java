package com.shashimallah.services;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.shashimallah.models.Department;
import com.shashimallah.repositories.DepartmentRepo;

@Service
@Transactional
public class DepartmentService {

	@Autowired
	private DepartmentRepo deptRepo;

	private static final Logger logger = LoggerFactory.getLogger(DepartmentService.class);

	public Department saveDepartment(Department dept) {
		logger.debug("Inside method saveDepartment()");
		return deptRepo.save(dept);
	}

	public Department updateDepartment(Department dept) {
		logger.debug("Inside method updateDepartment()");
		return deptRepo.save(dept);
	}

	public Department findDeptById(Integer deptId) {
		logger.debug("Inside method findDeptById()");
		return deptRepo.findById(deptId).get();
	}

	public List<Department> findAll() {
		logger.debug("Inside method findAll()");
		return deptRepo.findAll();
	}

	public void removeDeptById(Integer deptId) {
		logger.debug("Inside method removeDeptById()");
		deptRepo.deleteById(deptId);
	}

}
