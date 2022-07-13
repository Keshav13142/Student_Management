package com.examly.springapp.Controllers;

import com.examly.springapp.Models.MarksModel;
import com.examly.springapp.Services.MarksService;
import com.examly.springapp.message.ResponseMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")

public class TeacherController {

    @Autowired
    private MarksService marksService;

    @GetMapping("/teacher")
    public ResponseEntity<List<MarksModel>> getMarks()
    {
         List<MarksModel> list= this.marksService.findAll();
         return new ResponseEntity<>(list,HttpStatus.OK);
    }

    @PutMapping("/teacher/mark/{email}")
    public ResponseEntity<ResponseMessage> marksEditSave(@RequestBody MarksModel marks)
    {
         String result=this.marksService.updateMarks(marks);
         return new ResponseEntity<>(new ResponseMessage(result),HttpStatus.OK);
    }

    @DeleteMapping("/teacher/mark/{id}")
    public ResponseEntity<ResponseMessage> expenseDelete(@PathVariable String id)
    {
         this.marksService.deleteMarks(id);
         return new ResponseEntity<>(new ResponseMessage("Marks deleted"),HttpStatus.OK);
    }
    
    @GetMapping("/teacher/mark/{id}")
    public ResponseEntity<MarksModel> expenseEditData(@PathVariable String id) throws Exception
    {
         MarksModel marks= this.marksService.findByMarksId(id);
         return new ResponseEntity<>(marks,HttpStatus.OK);
    }    
}