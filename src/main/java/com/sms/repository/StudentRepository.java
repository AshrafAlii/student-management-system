package com.sms.repository;

import com.sms.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    Optional<Student> findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByEmailAndIdNot(String email, Long id);

    List<Student> findByStatus(String status);

    List<Student> findByCourse(String course);

    List<Student> findByYear(Integer year);

    @Query("SELECT s FROM Student s WHERE " +
           "LOWER(s.firstName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(s.lastName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(s.email) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(s.course) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(s.phone) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Student> searchStudents(@Param("keyword") String keyword);

    @Query("SELECT COUNT(s) FROM Student s WHERE s.status = 'Active'")
    long countActiveStudents();

    @Query("SELECT s.course, COUNT(s) FROM Student s GROUP BY s.course")
    List<Object[]> countStudentsByCourse();
}
