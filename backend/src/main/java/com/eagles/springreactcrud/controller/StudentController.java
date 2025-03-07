package com.eagles.springreactcrud.controller;

import com.eagles.springreactcrud.entity.Student;
import com.eagles.springreactcrud.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.eagles.springreactcrud.entity.Gender; // Adjust package as needed

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v2/")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class StudentController {
    private final StudentService mStudentService;

    public StudentController(StudentService studentService) {
        this.mStudentService = studentService;
    }

    @GetMapping("/students")
    public ResponseEntity<ApiResponse<List<Student>>> getAllStudents() {
        List<Student> students = mStudentService.getStudents();
        ApiResponse<List<Student>> response = new ApiResponse<>(HttpStatus.OK.value(), "Students retrieved successfully", students);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/student/id/{id}")
    public ResponseEntity<ApiResponse<Student>> getStudentById(@PathVariable long id) {
        Student student = mStudentService.getStudent(id);
        if (student == null) {
            ApiResponse<Student> response = new ApiResponse<>(HttpStatus.NOT_FOUND.value(), "Student with id=" + id + " not found", null);
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
        ApiResponse<Student> response = new ApiResponse<>(HttpStatus.OK.value(), "Student found successfully", student);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/student/prn/{prn}")
    public ResponseEntity<ApiResponse<Student>> getStudentByPrn(@PathVariable UUID prn) {
        Student student = mStudentService.getStudentByPRN(prn);
        if (student == null) {
            ApiResponse<Student> response = new ApiResponse<>(HttpStatus.NOT_FOUND.value(), "Student with prn=" + prn + " not found", null); // Typo preserved as per your example
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
        ApiResponse<Student> response = new ApiResponse<>(HttpStatus.OK.value(), "Student found successfully", student);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/students/major/{major}")
    public ResponseEntity<ApiResponse<List<Student>>> getStudentByMajor(@PathVariable String major) {
        List<Student> students = mStudentService.getStudentByMajor(major);
        if (students == null || students.isEmpty()) {
            ApiResponse<List<Student>> response = new ApiResponse<>(HttpStatus.NOT_FOUND.value(), "Students with major=" + major + " not found", null);
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
        ApiResponse<List<Student>> response = new ApiResponse<>(HttpStatus.OK.value(), "Students with major=" + major + " found successfully", students);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/students/gender/{gender}")
    public ResponseEntity<ApiResponse<List<Student>>> getStudentsbyGender(@PathVariable Gender gender) {
        List<Student> students = mStudentService.getStudentsByGender(gender);
        if (students == null || students.isEmpty()) {
            ApiResponse<List<Student>> response = new ApiResponse<>(HttpStatus.NOT_FOUND.value(), "Students with gender=" + gender + " not found", null);
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
        ApiResponse<List<Student>> response = new ApiResponse<>(HttpStatus.OK.value(), "Students with gender=" + gender + " found successfully", students);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/student")
    public ResponseEntity<ApiResponse<Student>> createStudent(@Valid @RequestBody Student student) {
        Student savedStudent = mStudentService.SaveStudent(student);
        ApiResponse<Student> response = new ApiResponse<>(HttpStatus.OK.value(), "Student created successfully", savedStudent);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/student/{id}")
    public ResponseEntity<ApiResponse<Student>> updateStudent(@PathVariable long id, @Valid @RequestBody Student studentDetails) {
        Student updatedStudent = mStudentService.updateStudent(id, studentDetails);
        if (updatedStudent == null) {
            ApiResponse<Student> response = new ApiResponse<>(HttpStatus.NOT_FOUND.value(), "Student with id=" + id + " not found", null);
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
        ApiResponse<Student> response = new ApiResponse<>(HttpStatus.OK.value(), "Student updated successfully", updatedStudent);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/student/{id}")
    public ResponseEntity<ApiResponse<Student>> deleteStudent(@PathVariable long id) {
        Student student = mStudentService.getStudent(id);
        if (student == null) {
            ApiResponse<Student> response = new ApiResponse<>(HttpStatus.NOT_FOUND.value(), "Student with id=" + id + " not found", null);
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
        mStudentService.deleteStudent(id);
        ApiResponse<Student> response = new ApiResponse<>(HttpStatus.OK.value(), "Student deleted successfully", null);
        return ResponseEntity.ok(response);
    }

}

