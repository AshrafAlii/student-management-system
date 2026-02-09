@echo off
echo ========================================
echo Student Management System
echo ========================================
echo.
echo Starting the application...
echo.
echo Please make sure:
echo 1. MySQL is running on localhost:3306
echo 2. MySQL username is 'root' with no password
echo.
echo Press Ctrl+C to stop the application
echo.

mvn spring-boot:run

pause
