package com.shashimallah.services;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.shashimallah.models.Role;
import com.shashimallah.repositories.RoleRepo;

@Service
@Transactional
public class RoleService {

	@Autowired
	private RoleRepo roleRepo;

	private static final Logger logger = LoggerFactory.getLogger(RoleService.class);

	public Role saveRole(Role role) {
		logger.debug("Inside method saveRole()");
		return roleRepo.save(role);
	}

	public Role findRoleById(Integer roleId) {
		logger.debug("Inside method findRoleById()");
		return roleRepo.findById(roleId).get();
	}

	public List<Role> findAll() {
		logger.debug("Inside method findAll()");
		return roleRepo.findAll();
	}

	public void deleteRoleById(Integer roleId) {
		logger.debug("Inside method removeRoleById()");
		roleRepo.deleteById(roleId);
	}

	public Role updateRole(Role role) {
		logger.debug("Inside method updateRole()");
		return roleRepo.save(role);
	}

}
