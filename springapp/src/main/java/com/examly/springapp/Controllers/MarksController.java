package com.examly.springapp.Controllers;

import com.examly.springapp.Models.MarksModel;
import com.examly.springapp.Models.UserModel;
import com.examly.springapp.Services.UserService;
import com.examly.springapp.Services.MarksService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.examly.springapp.message.ResponseMessage;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;

@RestController
@CrossOrigin("*")
public class MarksController {
     @Autowired
     private MarksService marksService;
     @Autowired
     private UserService userService;

     @GetMapping("/mark")
     public ResponseEntity<List<MarksModel>> getExpense() {
          List<MarksModel> list = this.marksService.findAll();
          return new ResponseEntity<>(list, HttpStatus.OK);
     }

     @GetMapping("/mark/{email}")
     public ResponseEntity<MarksModel[]> expenseEditData(@PathVariable String email) throws Exception {
          UserModel user = this.userService.getStudentById(email);
          MarksModel[] marks = this.marksService.findById(user);
          return new ResponseEntity<>(marks, HttpStatus.OK);
     }

     @PostMapping("/mark")
     public MarksModel marksSave(@RequestBody MarksModel marksModel) {
           return this.marksService.addMarksTest(marksModel);
     }
     @PostMapping("/mark/v1")
     public ResponseEntity<ResponseMessage> marksSave(@RequestParam("marks") String exp,
               @RequestParam("file") MultipartFile file) throws JsonMappingException, JsonProcessingException {
          String message;
          MarksModel marks = new ObjectMapper().readValue(exp, MarksModel.class);
          try {
               this.marksService.addMarks(marks, file);
               message = "Marks Added";
               return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
          } catch (Exception e) {
               message = "Could not upload the file!";
               return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
          }
     }

     @PutMapping("/mark/{email}")
     public ResponseEntity<ResponseMessage> marksEditSave(@RequestBody MarksModel marks) {
          String result = this.marksService.updateMarks(marks);
          return new ResponseEntity<>(new ResponseMessage(result), HttpStatus.OK);
     }

//     @GetMapping("/expense/sum-month/{email}")
//     public ResponseEntity<Long> sumOfExpenses(@PathVariable String email) {
//          UserModel user = this.employeeService.getEmpById(email);
//          return new ResponseEntity<>(this.expenseService.getSumOfExpenses(user), HttpStatus.OK);
//     }

//     @GetMapping("/expense/curr-month/{email}")
//     public ResponseEntity<List<MarksModel>> currentMonthExpense(@PathVariable String email) {
//          UserModel user = this.employeeService.getEmpById(email);
//          return new ResponseEntity<>(this.expenseService.getCurrentExpense(user), HttpStatus.OK);
//     }
}
