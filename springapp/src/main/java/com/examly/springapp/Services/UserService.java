package com.examly.springapp.Services;

import com.examly.springapp.Models.UserModel;
import com.examly.springapp.Repository.MarksRepository;
import com.examly.springapp.Repository.LoginRepository;
import com.examly.springapp.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class UserService {
    @Autowired
    private MarksRepository marksRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private LoginRepository loginRepository;
    public UserModel getEmployee(String email)
    {
        return this.userRepository.findUserByEmail(email);
    }
    public List<UserModel> getStudent()
    {
        return this.userRepository.findAll();
    }
    public List<UserModel> getAllStudents()
    {
        return this.userRepository.getEmployeeList();
    }
    public String updateStudent(UserModel user){
       this.userRepository.save(user);
       return "Updated";
    }
    public String deleteStudent(String email){
        UserModel user=this.userRepository.findUserByEmail(email);
        this.loginRepository.deleteLoginByEmail(user.getEmail());
        this.marksRepository.deleteMarksByClaimedBy(user);
        this.userRepository.deleteById(email);
        return "Employee Deleted";
    }
    public UserModel getStudentById(String email){
        return this.userRepository.findUserByEmail(email);
    }
    public String addStudent(UserModel user)
    {
        this.userRepository.save(user);
        return "Student Added";
    }
    public boolean checkStudent(String email)
    {
        return this.userRepository.existsById(email);
    }
}
