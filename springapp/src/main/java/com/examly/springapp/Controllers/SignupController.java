package com.examly.springapp.Controllers;

import com.examly.springapp.Models.LoginModel;
import com.examly.springapp.Models.UserModel;
import com.examly.springapp.Services.LoginService;
import com.examly.springapp.Services.SignupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.Base64.Decoder;
import java.util.Base64.Encoder;

@RestController
@CrossOrigin("*")
public class SignupController {

    @Autowired
    private SignupService signupService;
    @Autowired
    private LoginService loginService;

    @PostMapping("/signup")
    public ResponseEntity<Boolean> saveUser(@RequestBody UserModel user) {
        Encoder encoder = Base64.getEncoder();
        String enc=encoder.encodeToString(user.getPassword().getBytes());
        user.setPassword(enc);
        LoginModel login = new LoginModel(user.getEmail(),enc);
        this.loginService.add(login);
        return new ResponseEntity<>(this.signupService.addUser(user), HttpStatus.OK);
    }

    @GetMapping("/student/{email}")
    public ResponseEntity<UserModel> getEmployee(@PathVariable String email) {
        UserModel user = this.signupService.getUser(email);
        Decoder decoder = Base64.getDecoder();
        byte[] bytes = decoder.decode(user.getPassword());
        user.setPassword(new String(bytes));
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}
