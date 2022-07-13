package com.examly.springapp.Repository;

import com.examly.springapp.Models.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<UserModel,String> {
    List<UserModel> getEmployeeList();
    UserModel findUserByEmail(String email);
    
}
