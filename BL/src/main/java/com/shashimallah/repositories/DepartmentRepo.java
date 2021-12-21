package com.shashimallah.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shashimallah.models.Department;

@Repository
public interface DepartmentRepo extends JpaRepository<Department, Integer> {

}
