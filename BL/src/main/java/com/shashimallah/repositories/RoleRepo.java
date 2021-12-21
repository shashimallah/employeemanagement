package com.shashimallah.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shashimallah.models.Role;

@Repository
public interface RoleRepo extends JpaRepository<Role, Integer> {

}
