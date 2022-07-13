package com.examly.springapp.Services;

import com.examly.springapp.Models.MarksModel;
import com.examly.springapp.Models.UserModel;
import com.examly.springapp.Repository.MarksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class MarksService {
    
    @Autowired
    private MarksRepository marksRepository;
    public List<MarksModel> findAll(){
        return this.marksRepository.findAll();
    }
    public MarksModel[] findById(UserModel user)
    {
        return this.marksRepository.findMarksByEntryId(user);
    }
    public String deleteMarks(String id)
    {
        if(this.marksRepository.existsById((id)))
        {
            this.marksRepository.deleteById(id);
            return "Expense Deleted";
        }
        return "File doesn't exist";
        
    }
    public String updateMarks(MarksModel expense)
    {
        this.marksRepository.save(expense);
        return "Expense Updated";
    }
    public void addMarks(MarksModel expense, MultipartFile file) throws IOException
    {
        expense.setImage(file.getBytes());
        this.marksRepository.save(expense);
    }
//    public Long getSumOfExpenses(UserModel user)
//    {
//        return this.expenseRepository.findCurrentMonthExpenses(user);
//    }
//    public List <MarksModel> getCurrentExpense(UserModel user)
//    {
//        return this.expenseRepository.getCurrentMonthExpenses(user);
//    }
    public MarksModel findByMarksId(String expenseId) {
        return this.marksRepository.findMarksByEntryId(expenseId);
    }
    public MarksModel addMarksTest(MarksModel marksModel) {
        return this.marksRepository.save(marksModel);
    }
}
