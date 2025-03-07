package com.eagles.springreactcrud.repository;

import com.eagles.springreactcrud.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import com.eagles.springreactcrud.entity.Gender;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByPrn(UUID prn);
    List<Student> findByMajor(String major);
    List<Student> findByGender(Gender gender);
}
