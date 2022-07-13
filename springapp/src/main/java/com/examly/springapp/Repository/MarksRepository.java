package com.examly.springapp.Repository;


import com.examly.springapp.Models.MarksModel;
import com.examly.springapp.Models.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
@Transactional
public interface MarksRepository extends JpaRepository<MarksModel, String> {

    @Query("select e from MarksModel e where  e.claimedBy=:student")
    MarksModel[] findMarksByEntryId(@Param("student") UserModel user);

    MarksModel findMarksByEntryId(String expenseId);

	void deleteMarksByClaimedBy(UserModel user);
}
