// Add/Edit Student JavaScript

let editMode = false;
let studentId = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    checkEditMode();
    setupFormValidation();
    setupDateRestriction();
});

// Check if in edit mode
const checkEditMode = () => {
    const urlParams = new URLSearchParams(window.location.search);
    studentId = urlParams.get('id');
    
    if (studentId) {
        editMode = true;
        loadStudentData(studentId);
        updateFormForEditMode();
    }
};

// Update Form for Edit Mode
const updateFormForEditMode = () => {
    document.getElementById('formTitle').textContent = 'Edit Student';
    document.getElementById('submitBtnText').textContent = 'Update Student';
    document.getElementById('statusGroup').style.display = 'block';
};

// Load Student Data for Editing
const loadStudentData = async (id) => {
    try {
        const response = await apiRequest(API_ENDPOINTS.studentById(id));
        
        if (response.success) {
            const student = response.data;
            
            document.getElementById('studentId').value = student.id;
            document.getElementById('firstName').value = student.firstName;
            document.getElementById('lastName').value = student.lastName;
            document.getElementById('email').value = student.email;
            document.getElementById('phone').value = student.phone;
            document.getElementById('dateOfBirth').value = student.dateOfBirth;
            document.getElementById('gender').value = student.gender;
            document.getElementById('address').value = student.address;
            document.getElementById('course').value = student.course;
            document.getElementById('year').value = student.year;
            document.getElementById('status').value = student.status;
        }
    } catch (error) {
        console.error('Error loading student data:', error);
        showError('Failed to load student data');
        setTimeout(() => {
            window.location.href = 'students.html';
        }, 2000);
    }
};

// Setup Form Validation
const setupFormValidation = () => {
    const form = document.getElementById('studentForm');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            showError('Please fill in all required fields correctly');
            return;
        }
        
        const studentData = collectFormData();
        
        if (editMode) {
            await updateStudent(studentId, studentData);
        } else {
            await createStudent(studentData);
        }
    });
    
    // Reset validation on form reset
    form.addEventListener('reset', () => {
        form.classList.remove('was-validated');
    });
};

// Setup Date Restriction (no future dates)
const setupDateRestriction = () => {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('dateOfBirth').setAttribute('max', today);
};

// Collect Form Data
const collectFormData = () => {
    return {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        dateOfBirth: document.getElementById('dateOfBirth').value,
        gender: document.getElementById('gender').value,
        address: document.getElementById('address').value.trim(),
        course: document.getElementById('course').value,
        year: parseInt(document.getElementById('year').value),
        status: editMode ? document.getElementById('status').value : 'Active'
    };
};

// Create Student
const createStudent = async (studentData) => {
    try {
        const response = await apiRequest(API_ENDPOINTS.students, {
            method: 'POST',
            body: JSON.stringify(studentData)
        });
        
        if (response.success) {
            showSuccess('Student added successfully');
            
            setTimeout(() => {
                window.location.href = 'students.html';
            }, 1500);
        }
    } catch (error) {
        console.error('Error creating student:', error);
    }
};

// Update Student
const updateStudent = async (id, studentData) => {
    try {
        const response = await apiRequest(API_ENDPOINTS.studentById(id), {
            method: 'PUT',
            body: JSON.stringify(studentData)
        });
        
        if (response.success) {
            showSuccess('Student updated successfully');
            
            setTimeout(() => {
                window.location.href = 'students.html';
            }, 1500);
        }
    } catch (error) {
        console.error('Error updating student:', error);
    }
};

// Phone number validation (only digits)
document.getElementById('phone').addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
});

// Real-time validation feedback
const fields = ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'gender', 'address', 'course', 'year'];

fields.forEach(fieldId => {
    const field = document.getElementById(fieldId);
    
    field.addEventListener('blur', () => {
        if (field.value.trim()) {
            if (field.checkValidity()) {
                field.classList.remove('is-invalid');
                field.classList.add('is-valid');
            } else {
                field.classList.remove('is-valid');
                field.classList.add('is-invalid');
            }
        }
    });
    
    field.addEventListener('input', () => {
        if (field.classList.contains('is-invalid') || field.classList.contains('is-valid')) {
            if (field.checkValidity()) {
                field.classList.remove('is-invalid');
                field.classList.add('is-valid');
            } else {
                field.classList.remove('is-valid');
                field.classList.add('is-invalid');
            }
        }
    });
});
