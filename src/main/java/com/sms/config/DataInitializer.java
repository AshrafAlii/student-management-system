package com.sms.config;

import com.sms.entity.Student;
import com.sms.repository.StudentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final StudentRepository studentRepository;

    public DataInitializer(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public void run(String... args) {
        if (studentRepository.count() == 0) {
            List<Student> students = Arrays.asList(
                createStudent("John", "Doe", "john.doe@example.com", "9876543210",
                        LocalDate.of(2002, 5, 15), "Male", "123 Main St, New York, NY",
                        "Computer Science", 2),
                        
                createStudent("Jane", "Smith", "jane.smith@example.com", "9876543211",
                        LocalDate.of(2001, 8, 22), "Female", "456 Oak Ave, Los Angeles, CA",
                        "Electrical Engineering", 3),
                        
                createStudent("Michael", "Johnson", "michael.j@example.com", "9876543212",
                        LocalDate.of(2003, 3, 10), "Male", "789 Pine Rd, Chicago, IL",
                        "Mechanical Engineering", 1),
                        
                createStudent("Emily", "Williams", "emily.w@example.com", "9876543213",
                        LocalDate.of(2002, 11, 5), "Female", "321 Elm St, Houston, TX",
                        "Computer Science", 2),
                        
                createStudent("David", "Brown", "david.brown@example.com", "9876543214",
                        LocalDate.of(2001, 7, 18), "Male", "654 Maple Dr, Phoenix, AZ",
                        "Civil Engineering", 3),
                        
                createStudent("Sarah", "Davis", "sarah.davis@example.com", "9876543215",
                        LocalDate.of(2003, 1, 25), "Female", "987 Cedar Ln, Philadelphia, PA",
                        "Information Technology", 1),
                        
                createStudent("James", "Miller", "james.miller@example.com", "9876543216",
                        LocalDate.of(2002, 9, 12), "Male", "147 Birch St, San Antonio, TX",
                        "Computer Science", 2),
                        
                createStudent("Jessica", "Wilson", "jessica.w@example.com", "9876543217",
                        LocalDate.of(2001, 4, 30), "Female", "258 Willow Ave, San Diego, CA",
                        "Electronics Engineering", 4),
                        
                createStudent("Robert", "Moore", "robert.moore@example.com", "9876543218",
                        LocalDate.of(2003, 6, 8), "Male", "369 Spruce Rd, Dallas, TX",
                        "Mechanical Engineering", 1),
                        
                createStudent("Jennifer", "Taylor", "jennifer.t@example.com", "9876543219",
                        LocalDate.of(2002, 12, 20), "Female", "741 Ash Dr, San Jose, CA",
                        "Computer Science", 2)
            );
            
            studentRepository.saveAll(students);
            System.out.println("Sample data initialized successfully with " + students.size() + " students");
        }
    }

    private Student createStudent(String firstName, String lastName, String email, String phone,
                                 LocalDate dob, String gender, String address, String course, int year) {
        Student student = new Student();
        student.setFirstName(firstName);
        student.setLastName(lastName);
        student.setEmail(email);
        student.setPhone(phone);
        student.setDateOfBirth(dob);
        student.setGender(gender);
        student.setAddress(address);
        student.setCourse(course);
        student.setYear(year);
        student.setEnrollmentDate(LocalDate.now().minusYears(year - 1));
        student.setStatus("Active");
        return student;
    }
}
