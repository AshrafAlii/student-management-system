// Students List JavaScript

let allStudents = [];
let deleteStudentId = null;

// Load students on page load
document.addEventListener('DOMContentLoaded', () => {
    loadAllStudents();
    setupEventListeners();
});

// Setup Event Listeners
const setupEventListeners = () => {
    // Search on Enter key
    document.getElementById('searchInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchStudents();
        }
    });
    
    // Status filter change
    document.getElementById('statusFilter').addEventListener('change', () => {
        filterByStatus();
    });
    
    // Delete confirmation
    document.getElementById('confirmDeleteBtn').addEventListener('click', () => {
        confirmDelete();
    });
};

// Load All Students
const loadAllStudents = async () => {
    try {
        const response = await apiRequest(API_ENDPOINTS.students);
        
        if (response.success) {
            allStudents = response.data;
            displayStudents(allStudents);
        }
    } catch (error) {
        console.error('Error loading students:', error);
        document.getElementById('studentsTableBody').innerHTML = `
            <tr>
                <td colspan="8" class="text-center text-danger">
                    <i class="fas fa-exclamation-triangle"></i> Error loading students
                </td>
            </tr>
        `;
    }
};

// Display Students in Table
const displayStudents = (students) => {
    const tbody = document.getElementById('studentsTableBody');
    const countBadge = document.getElementById('studentCount');
    
    countBadge.textContent = `${students.length} Student${students.length !== 1 ? 's' : ''}`;
    
    if (students.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" class="text-center text-muted">
                    <i class="fas fa-info-circle"></i> No students found
                </td>
            </tr>
        `;
        return;
    }
    
    let html = '';
    students.forEach(student => {
        const statusClass = student.status === 'Active' ? 'success' : 'danger';
        const statusIcon = student.status === 'Active' ? 'check-circle' : 'times-circle';
        
        html += `
            <tr class="fade-in">
                <td>${student.id}</td>
                <td>
                    <strong>${student.firstName} ${student.lastName}</strong>
                </td>
                <td>
                    <i class="fas fa-envelope text-primary"></i> ${student.email}
                </td>
                <td>
                    <i class="fas fa-phone text-success"></i> ${student.phone}
                </td>
                <td>
                    <span class="badge bg-info">${student.course}</span>
                </td>
                <td>
                    <span class="badge bg-secondary">Year ${student.year}</span>
                </td>
                <td>
                    <span class="badge bg-${statusClass}">
                        <i class="fas fa-${statusIcon}"></i> ${student.status}
                    </span>
                </td>
                <td>
                    <div class="btn-group" role="group">
                        <button class="btn btn-sm btn-info" onclick="viewStudent(${student.id})"
                                title="View Details">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-sm btn-warning" onclick="editStudent(${student.id})"
                                title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="deleteStudent(${student.id})"
                                title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html;
};

// Search Students
const searchStudents = async () => {
    const keyword = document.getElementById('searchInput').value.trim();
    
    if (!keyword) {
        loadAllStudents();
        return;
    }
    
    try {
        const response = await apiRequest(`${API_ENDPOINTS.search}?keyword=${encodeURIComponent(keyword)}`);
        
        if (response.success) {
            displayStudents(response.data);
            showInfo(`Found ${response.data.length} student(s) matching "${keyword}"`);
        }
    } catch (error) {
        console.error('Error searching students:', error);
    }
};

// Filter by Status
const filterByStatus = async () => {
    const status = document.getElementById('statusFilter').value;
    
    if (!status) {
        loadAllStudents();
        return;
    }
    
    try {
        const response = await apiRequest(API_ENDPOINTS.status(status));
        
        if (response.success) {
            displayStudents(response.data);
        }
    } catch (error) {
        console.error('Error filtering students:', error);
    }
};

// View Student Details
const viewStudent = (id) => {
    const student = allStudents.find(s => s.id === id);
    
    if (!student) {
        showError('Student not found');
        return;
    }
    
    const age = calculateAge(student.dateOfBirth);
    
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'viewStudentModal';
    modal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header bg-primary text-white">
                    <h5 class="modal-title">
                        <i class="fas fa-user"></i> Student Details
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="row g-3">
                        <div class="col-md-6">
                            <strong>Name:</strong><br>
                            ${student.firstName} ${student.lastName}
                        </div>
                        <div class="col-md-6">
                            <strong>Email:</strong><br>
                            ${student.email}
                        </div>
                        <div class="col-md-6">
                            <strong>Phone:</strong><br>
                            ${student.phone}
                        </div>
                        <div class="col-md-6">
                            <strong>Date of Birth:</strong><br>
                            ${formatDate(student.dateOfBirth)} (${age} years)
                        </div>
                        <div class="col-md-6">
                            <strong>Gender:</strong><br>
                            ${student.gender}
                        </div>
                        <div class="col-md-6">
                            <strong>Status:</strong><br>
                            <span class="badge bg-${student.status === 'Active' ? 'success' : 'danger'}">
                                ${student.status}
                            </span>
                        </div>
                        <div class="col-md-12">
                            <strong>Address:</strong><br>
                            ${student.address}
                        </div>
                        <div class="col-md-6">
                            <strong>Course:</strong><br>
                            ${student.course}
                        </div>
                        <div class="col-md-6">
                            <strong>Year:</strong><br>
                            Year ${student.year}
                        </div>
                        <div class="col-md-6">
                            <strong>Enrollment Date:</strong><br>
                            ${formatDate(student.enrollmentDate)}
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
    
    modal.addEventListener('hidden.bs.modal', () => {
        modal.remove();
    });
};

// Edit Student
const editStudent = (id) => {
    window.location.href = `add-student.html?id=${id}`;
};

// Delete Student
const deleteStudent = (id) => {
    const student = allStudents.find(s => s.id === id);
    
    if (!student) {
        showError('Student not found');
        return;
    }
    
    deleteStudentId = id;
    document.getElementById('deleteStudentInfo').textContent = 
        `${student.firstName} ${student.lastName} (${student.email})`;
    
    const modal = new bootstrap.Modal(document.getElementById('deleteModal'));
    modal.show();
};

// Confirm Delete
const confirmDelete = async () => {
    if (!deleteStudentId) return;
    
    try {
        const response = await apiRequest(API_ENDPOINTS.studentById(deleteStudentId), {
            method: 'DELETE'
        });
        
        if (response.success) {
            showSuccess('Student deleted successfully');
            
            const modal = bootstrap.Modal.getInstance(document.getElementById('deleteModal'));
            modal.hide();
            
            deleteStudentId = null;
            loadAllStudents();
        }
    } catch (error) {
        console.error('Error deleting student:', error);
    }
};
