package com.eagles.springreactcrud.service;

import com.eagles.springreactcrud.entity.Student;
import com.eagles.springreactcrud.repository.StudentRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import com.eagles.springreactcrud.entity.Gender;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class StudentService {
    private StudentRepository mStudentRepository;

    public StudentService(StudentRepository mStudentRepository) {
        this.mStudentRepository = mStudentRepository;
    }

    public List<Student> getStudents() {
        return mStudentRepository.findAll();
    }

    public Student getStudent(long id) {
        return mStudentRepository.findById(id).orElse(null);
    }

    public Student getStudentByPRN(UUID prn) {
        return mStudentRepository.findByPrn(prn).orElse(null);
    }

    public Student SaveStudent(Student student) {
        if (student.getPrn() == null) {
            student.setPrn(UUID.randomUUID());
        }
        return mStudentRepository.save(student);
    }

    public List<Student> getStudentByMajor(String major) {
        return mStudentRepository.findByMajor(major);
    }

    public List<Student> getStudentsByGender(Gender gender) {
        return mStudentRepository.findByGender(gender);
    }

    public Student updateStudent(long id, Student studentDetails) {
        return mStudentRepository.findById(id).map(existingStudent -> {
            existingStudent.setFirstName(studentDetails.getFirstName());
            existingStudent.setLastName(studentDetails.getLastName());
            existingStudent.setDob(studentDetails.getDob());
            existingStudent.setGender(studentDetails.getGender());
            existingStudent.setMajor(studentDetails.getMajor());
            return mStudentRepository.save(existingStudent);
        }).orElse(null);
    }

    public void deleteStudent(long id) {
        mStudentRepository.deleteById(id);
    }
}

