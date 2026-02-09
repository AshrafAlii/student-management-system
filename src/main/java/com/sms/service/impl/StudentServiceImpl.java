package com.sms.service.impl;

import com.sms.dto.StudentDTO;
import com.sms.entity.Student;
import com.sms.exception.DuplicateResourceException;
import com.sms.exception.ResourceNotFoundException;
import com.sms.repository.StudentRepository;
import com.sms.service.StudentService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;

    public StudentServiceImpl(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public StudentDTO createStudent(StudentDTO studentDTO) {
        if (studentRepository.existsByEmail(studentDTO.getEmail())) {
            throw new DuplicateResourceException("Student with email " + studentDTO.getEmail() + " already exists");
        }
        
        Student student = convertToEntity(studentDTO);
        student.setEnrollmentDate(LocalDate.now());
        student.setStatus("Active");
        
        Student savedStudent = studentRepository.save(student);
        
        return convertToDTO(savedStudent);
    }

    @Override
    public StudentDTO updateStudent(Long id, StudentDTO studentDTO) {
        Student existingStudent = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with ID: " + id));
        
        if (studentRepository.existsByEmailAndIdNot(studentDTO.getEmail(), id)) {
            throw new DuplicateResourceException("Student with email " + studentDTO.getEmail() + " already exists");
        }
        
        existingStudent.setFirstName(studentDTO.getFirstName());
        existingStudent.setLastName(studentDTO.getLastName());
        existingStudent.setEmail(studentDTO.getEmail());
        existingStudent.setPhone(studentDTO.getPhone());
        existingStudent.setDateOfBirth(studentDTO.getDateOfBirth());
        existingStudent.setGender(studentDTO.getGender());
        existingStudent.setAddress(studentDTO.getAddress());
        existingStudent.setCourse(studentDTO.getCourse());
        existingStudent.setYear(studentDTO.getYear());
        
        if (studentDTO.getStatus() != null) {
            existingStudent.setStatus(studentDTO.getStatus());
        }
        
        Student updatedStudent = studentRepository.save(existingStudent);
        
        return convertToDTO(updatedStudent);
    }

    @Override
    public void deleteStudent(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with ID: " + id));
        
        studentRepository.delete(student);
    }

    @Override
    @Transactional(readOnly = true)
    public StudentDTO getStudentById(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with ID: " + id));
        
        return convertToDTO(student);
    }

    @Override
    @Transactional(readOnly = true)
    public List<StudentDTO> getAllStudents() {
        return studentRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<StudentDTO> searchStudents(String keyword) {
        return studentRepository.searchStudents(keyword).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<StudentDTO> getStudentsByStatus(String status) {
        return studentRepository.findByStatus(status).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<StudentDTO> getStudentsByCourse(String course) {
        return studentRepository.findByCourse(course).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<StudentDTO> getStudentsByYear(Integer year) {
        return studentRepository.findByYear(year).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        
        long totalStudents = studentRepository.count();
        long activeStudents = studentRepository.countActiveStudents();
        long inactiveStudents = totalStudents - activeStudents;
        
        List<Object[]> courseCounts = studentRepository.countStudentsByCourse();
        Map<String, Long> courseDistribution = new HashMap<>();
        for (Object[] row : courseCounts) {
            courseDistribution.put((String) row[0], (Long) row[1]);
        }
        
        stats.put("totalStudents", totalStudents);
        stats.put("activeStudents", activeStudents);
        stats.put("inactiveStudents", inactiveStudents);
        stats.put("courseDistribution", courseDistribution);
        
        return stats;
    }

    private StudentDTO convertToDTO(Student student) {
        StudentDTO dto = new StudentDTO();
        dto.setId(student.getId());
        dto.setFirstName(student.getFirstName());
        dto.setLastName(student.getLastName());
        dto.setEmail(student.getEmail());
        dto.setPhone(student.getPhone());
        dto.setDateOfBirth(student.getDateOfBirth());
        dto.setGender(student.getGender());
        dto.setAddress(student.getAddress());
        dto.setCourse(student.getCourse());
        dto.setYear(student.getYear());
        dto.setEnrollmentDate(student.getEnrollmentDate());
        dto.setStatus(student.getStatus());
        return dto;
    }

    private Student convertToEntity(StudentDTO dto) {
        Student student = new Student();
        student.setFirstName(dto.getFirstName());
        student.setLastName(dto.getLastName());
        student.setEmail(dto.getEmail());
        student.setPhone(dto.getPhone());
        student.setDateOfBirth(dto.getDateOfBirth());
        student.setGender(dto.getGender());
        student.setAddress(dto.getAddress());
        student.setCourse(dto.getCourse());
        student.setYear(dto.getYear());
        return student;
    }
}
