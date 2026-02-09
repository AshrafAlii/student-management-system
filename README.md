# Student Management System

A complete, production-ready Student Management System built with **Java 17**, **Spring Boot 3.2.0**, **MySQL**, **HTML**, **CSS**, **JavaScript**, and **Bootstrap 5**.

## 🎯 Features

### Backend Features
- ✅ RESTful API with Spring Boot
- ✅ Complete CRUD operations (Create, Read, Update, Delete)
- ✅ MySQL database integration with JPA/Hibernate
- ✅ Layered architecture (Controller, Service, Repository)
- ✅ Entity validation with Bean Validation
- ✅ Global exception handling
- ✅ Custom error responses
- ✅ Search functionality
- ✅ Filter by status, course, and year
- ✅ Dashboard statistics API
- ✅ Auto-database creation
- ✅ Sample data initialization

### Frontend Features
- ✅ Responsive UI with Bootstrap 5
- ✅ Dashboard with statistics
- ✅ Student list with search and filter
- ✅ Add new student form
- ✅ Edit existing student
- ✅ Delete student with confirmation
- ✅ View student details modal
- ✅ Real-time form validation
- ✅ Toast notifications
- ✅ Modern, professional design

## 📋 Prerequisites

Before running this application, make sure you have:

1. **Java 17** or higher installed
   - Check: `java -version`
   - Download: https://www.oracle.com/java/technologies/downloads/

2. **Maven 3.6+** installed
   - Check: `mvn -version`
   - Download: https://maven.apache.org/download.cgi

3. **MySQL 8.0+** installed and running
   - Check: `mysql --version`
   - Download: https://dev.mysql.com/downloads/mysql/

## 🚀 Installation & Setup

### Step 1: Clone or Download the Project

If you have this as a ZIP file, extract it to your desired location.

### Step 2: Start MySQL Server

Make sure your MySQL server is running on `localhost:3306` with:
- Username: `root`
- Password: *(no password)*

**Note:** If you have a different MySQL configuration, update `src/main/resources/application.properties`

### Step 3: The Database Will Be Created Automatically

The application is configured to automatically create the `student_db` database if it doesn't exist. You don't need to create it manually.

### Step 4: Run the Application

Open a terminal/command prompt in the project directory and run:

```bash
mvn spring-boot:run
```

**Alternative:** You can also run from your IDE:
1. Import the project as a Maven project
2. Run the `StudentManagementSystemApplication.java` class

### Step 5: Access the Application

Once the application starts successfully, you'll see:

```
========================================
Student Management System Started!
Access the application at: http://localhost:8080
========================================
```

Open your browser and navigate to: **http://localhost:8080**

## 📁 Project Structure

```
student-management-system/
├── src/
│   ├── main/
│   │   ├── java/com/sms/
│   │   │   ├── config/              # Configuration classes
│   │   │   │   ├── DataInitializer.java
│   │   │   │   └── WebConfig.java
│   │   │   ├── controller/          # REST Controllers
│   │   │   │   └── StudentController.java
│   │   │   ├── dto/                 # Data Transfer Objects
│   │   │   │   ├── ApiResponse.java
│   │   │   │   └── StudentDTO.java
│   │   │   ├── entity/              # JPA Entities
│   │   │   │   └── Student.java
│   │   │   ├── exception/           # Custom Exceptions
│   │   │   │   ├── DuplicateResourceException.java
│   │   │   │   ├── GlobalExceptionHandler.java
│   │   │   │   └── ResourceNotFoundException.java
│   │   │   ├── repository/          # JPA Repositories
│   │   │   │   └── StudentRepository.java
│   │   │   ├── service/             # Service Layer
│   │   │   │   ├── StudentService.java
│   │   │   │   └── impl/
│   │   │   │       └── StudentServiceImpl.java
│   │   │   └── StudentManagementSystemApplication.java
│   │   └── resources/
│   │       ├── application.properties
│   │       └── static/              # Frontend Files
│   │           ├── css/
│   │           │   └── style.css
│   │           ├── js/
│   │           │   ├── add-student.js
│   │           │   ├── config.js
│   │           │   ├── dashboard.js
│   │           │   └── students.js
│   │           ├── add-student.html
│   │           ├── index.html
│   │           └── students.html
├── pom.xml
└── README.md
```

## 🔌 API Endpoints

### Student Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/students` | Get all students |
| GET | `/api/students/{id}` | Get student by ID |
| POST | `/api/students` | Create new student |
| PUT | `/api/students/{id}` | Update student |
| DELETE | `/api/students/{id}` | Delete student |
| GET | `/api/students/search?keyword={keyword}` | Search students |
| GET | `/api/students/status/{status}` | Filter by status |
| GET | `/api/students/course/{course}` | Filter by course |
| GET | `/api/students/year/{year}` | Filter by year |
| GET | `/api/students/stats` | Get dashboard statistics |

### Sample API Request

**Create Student:**
```bash
curl -X POST http://localhost:8080/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "9876543210",
    "dateOfBirth": "2002-05-15",
    "gender": "Male",
    "address": "123 Main St, New York, NY",
    "course": "Computer Science",
    "year": 2
  }'
```

## 🎨 Frontend Pages

1. **Dashboard (index.html)**
   - Total students count
   - Active/Inactive students
   - Course distribution
   - Quick actions

2. **View Students (students.html)**
   - List all students in a table
   - Search functionality
   - Filter by status
   - View, Edit, Delete actions

3. **Add/Edit Student (add-student.html)**
   - Form to add new student
   - Form to edit existing student
   - Real-time validation
   - All required fields marked

## 🗃️ Database Schema

The `students` table is automatically created with the following structure:

```sql
CREATE TABLE students (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(10) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(10) NOT NULL,
    address VARCHAR(200) NOT NULL,
    course VARCHAR(100) NOT NULL,
    year INT NOT NULL,
    enrollment_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);
```

## 📊 Sample Data

The application automatically loads 10 sample students on first run:
- Mix of different courses (Computer Science, Engineering, IT, etc.)
- Different years (1st to 4th year)
- All with Active status
- Realistic data for testing

## ⚙️ Configuration

### MySQL Configuration

Edit `src/main/resources/application.properties` if needed:

```properties
# Database URL (database will be created automatically)
spring.datasource.url=jdbc:mysql://localhost:3306/student_db?createDatabaseIfNotExist=true

# MySQL credentials
spring.datasource.username=root
spring.datasource.password=

# JPA/Hibernate settings
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### Port Configuration

Default port is **8080**. To change:

```properties
server.port=8081
```

## 🛠️ Troubleshooting

### Issue: Port 8080 already in use
**Solution:** Either stop the application using port 8080 or change the port in `application.properties`

### Issue: Unable to connect to MySQL
**Solution:** 
- Make sure MySQL is running
- Check username/password in `application.properties`
- Verify MySQL is listening on port 3306

### Issue: Build fails
**Solution:**
```bash
mvn clean install
```

### Issue: Database connection error
**Solution:** Make sure you can connect to MySQL manually:
```bash
mysql -u root
```

## 🧪 Testing

The application includes sample data for testing. You can:

1. View all students on the dashboard
2. Search for students
3. Add new students
4. Edit existing students
5. Delete students
6. Filter by status, course, or year

## 📝 Technologies Used

### Backend
- Java 17
- Spring Boot 3.2.0
- Spring Data JPA
- Hibernate
- MySQL Connector
- Lombok
- Bean Validation

### Frontend
- HTML5
- CSS3
- JavaScript (ES6+)
- Bootstrap 5.3.2
- Font Awesome 6.4.2

## 🎓 Learning Resources

This project demonstrates:
- RESTful API design
- Layered architecture
- JPA/Hibernate ORM
- Spring Boot best practices
- Responsive web design
- AJAX/Fetch API
- Form validation
- Error handling

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

Created as a beginner-to-intermediate level Student Management System project.

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements.

## 📧 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the console logs
3. Check MySQL connection
4. Verify all dependencies are installed

---

**Happy Coding! 🚀**
