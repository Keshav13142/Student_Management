package com.examly.springapp.Models;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "marks")
public class MarksModel {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String entryId;
    private int entryNumber;
    @Lob
    private byte[] image;
    private int marks;
    private Date datedOn;
    private String remark;
    private String description;
    private String status = "pending";
    @OneToOne
    @JoinColumn(name = "id")
    private UserModel claimedBy;
    private String reviewedBy;

    public MarksModel() {
    }

    public MarksModel(String entryId, int entryNumber, byte[] image, int marks, Date datedOn, String remark,
                      String status, UserModel claimedBy, String reviewedBy) {
        this.entryId = entryId;
        this.entryNumber = entryNumber;
        this.image = image;
        this.marks = marks;
        this.datedOn = datedOn;
        this.remark = remark;
        this.status = status;
        this.claimedBy = claimedBy;
        this.reviewedBy = reviewedBy;
    }

    public String getEntryId() {
        return entryId;
    }

    public void setEntryId(String expenseId) {
        this.entryId = expenseId;
    }

    public int getEntryNumber() {
        return entryNumber;
    }

    public void setEntryNumber(int billNumber) {
        this.entryNumber = billNumber;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] billImage) {
        this.image = billImage;
    }

    public int getMarks() {
        return marks;
    }

    public void setMarks(int billCost) {
        this.marks = billCost;
    }

    public Date getDatedOn() {
        return datedOn;
    }

    public void setDatedOn(Date datedOn) {
        this.datedOn = datedOn;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public UserModel getClaimedBy() {
        return claimedBy;
    }

    public String getReviewedBy() {
        return reviewedBy;
    }

    public void setReviewedBy(String reviewedBy) {
        this.reviewedBy = reviewedBy;
    }


    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setClaimedBy(UserModel claimedBy) {
        this.claimedBy = claimedBy;
    }

}
