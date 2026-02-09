package com.sms.controller;

import com.sms.dto.ApiResponse;
import com.sms.dto.StudentDTO;
import com.sms.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<StudentDTO>> createStudent(@Valid @RequestBody StudentDTO studentDTO) {
        StudentDTO createdStudent = studentService.createStudent(studentDTO);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success("Student created successfully", createdStudent));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<StudentDTO>> updateStudent(
            @PathVariable Long id,
            @Valid @RequestBody StudentDTO studentDTO) {
        StudentDTO updatedStudent = studentService.updateStudent(id, studentDTO);
        return ResponseEntity.ok(ApiResponse.success("Student updated successfully", updatedStudent));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return ResponseEntity.ok(ApiResponse.success("Student deleted successfully", null));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<StudentDTO>> getStudentById(@PathVariable Long id) {
        StudentDTO student = studentService.getStudentById(id);
        return ResponseEntity.ok(ApiResponse.success(student));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<StudentDTO>>> getAllStudents() {
        List<StudentDTO> students = studentService.getAllStudents();
        return ResponseEntity.ok(ApiResponse.success(students));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<StudentDTO>>> searchStudents(@RequestParam String keyword) {
        List<StudentDTO> students = studentService.searchStudents(keyword);
        return ResponseEntity.ok(ApiResponse.success(students));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<ApiResponse<List<StudentDTO>>> getStudentsByStatus(@PathVariable String status) {
        List<StudentDTO> students = studentService.getStudentsByStatus(status);
        return ResponseEntity.ok(ApiResponse.success(students));
    }

    @GetMapping("/course/{course}")
    public ResponseEntity<ApiResponse<List<StudentDTO>>> getStudentsByCourse(@PathVariable String course) {
        List<StudentDTO> students = studentService.getStudentsByCourse(course);
        return ResponseEntity.ok(ApiResponse.success(students));
    }

    @GetMapping("/year/{year}")
    public ResponseEntity<ApiResponse<List<StudentDTO>>> getStudentsByYear(@PathVariable Integer year) {
        List<StudentDTO> students = studentService.getStudentsByYear(year);
        return ResponseEntity.ok(ApiResponse.success(students));
    }

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getDashboardStats() {
        Map<String, Object> stats = studentService.getDashboardStats();
        return ResponseEntity.ok(ApiResponse.success(stats));
    }
}
