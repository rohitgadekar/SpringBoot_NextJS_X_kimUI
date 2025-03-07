package com.eagles.springreactcrud.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "student")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "first_name")
    @Size(min = 3, max = 50, message = "First Name should have at least 3 characters")
    @NotNull(message = "First Name should not be null")
    @NotEmpty(message = "First Name should not be empty")
    private String firstName;

    @Column(name = "last_name")
    @Size(min = 3, max = 50, message = "Last Name should have at least 3 characters")
    @NotNull(message = "Last Name should not be null")
    @NotEmpty(message = "Last Name should not be empty")
    private String lastName;

    @Column(name = "dob")
    @NotNull(message = "Date of Birth should not be null")
    private LocalDate dob;

    @Column(name = "prn", unique = true, updatable = false)
    private UUID prn;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    @NotNull(message = "Gender should not be null")
    private Gender gender;

    @Column(name = "major")
    @NotNull(message = "Major should not be null")
    @NotEmpty(message = "Major should not be empty")
    private String major;

    public Student() {
    }

    public Student(Long id, String firstName, String lastName, LocalDate dob, UUID prn, Gender gender, String major) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = dob;
        this.prn = prn;
        this.gender = gender;
        this.major = major;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public UUID getPrn() {
        return prn;
    }

    public void setPrn(UUID prn) {
        this.prn = prn;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
    }
}

