package com.sms.service;

import com.sms.dto.StudentDTO;
import com.sms.entity.Student;

import java.util.List;
import java.util.Map;

public interface StudentService {
    
    StudentDTO createStudent(StudentDTO studentDTO);
    
    StudentDTO updateStudent(Long id, StudentDTO studentDTO);
    
    void deleteStudent(Long id);
    
    StudentDTO getStudentById(Long id);
    
    List<StudentDTO> getAllStudents();
    
    List<StudentDTO> searchStudents(String keyword);
    
    List<StudentDTO> getStudentsByStatus(String status);
    
    List<StudentDTO> getStudentsByCourse(String course);
    
    List<StudentDTO> getStudentsByYear(Integer year);
    
    Map<String, Object> getDashboardStats();
}
