# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Ensure Prerequisites

Make sure you have:
- ✅ Java 17+ installed
- ✅ Maven 3.6+ installed
- ✅ MySQL 8.0+ running on localhost:3306
- ✅ MySQL user 'root' with no password

### Step 2: Run the Application

**Option A: Using the run script (Recommended)**

Windows:
```
run.bat
```

Linux/Mac:
```
./run.sh
```

**Option B: Using Maven directly**
```
mvn spring-boot:run
```

### Step 3: Access the Application

Open your browser and go to:
```
http://localhost:8080
```

## 🎉 That's It!

You should now see the dashboard with:
- Total students: 10 (sample data)
- Student list
- Add/Edit/Delete functionality

## 📝 What to Try

1. **View Dashboard**: See statistics and course distribution
2. **View Students**: Click "View Students" to see all students
3. **Add Student**: Click "Add Student" to create a new student
4. **Search**: Try searching for "John" or "Computer"
5. **Edit**: Click the edit button on any student
6. **Delete**: Click the delete button (with confirmation)

## ⚠️ Common Issues

### MySQL Connection Error
- Make sure MySQL is running
- Check username is 'root' with no password
- Verify port 3306 is available

### Port 8080 in Use
- Stop other applications using port 8080
- Or change port in `src/main/resources/application.properties`

### Build Errors
- Run: `mvn clean install`
- Make sure Java 17+ is installed

## 📖 Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Explore the API endpoints
- Modify the code to add your features
- Learn from the well-structured codebase

---

**Enjoy building with the Student Management System! 🎓**
