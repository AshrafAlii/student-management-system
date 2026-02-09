// API Configuration
const API_BASE_URL = 'http://localhost:8080/api';

const API_ENDPOINTS = {
    students: `${API_BASE_URL}/students`,
    studentById: (id) => `${API_BASE_URL}/students/${id}`,
    search: `${API_BASE_URL}/students/search`,
    status: (status) => `${API_BASE_URL}/students/status/${status}`,
    course: (course) => `${API_BASE_URL}/students/course/${course}`,
    year: (year) => `${API_BASE_URL}/students/year/${year}`,
    stats: `${API_BASE_URL}/students/stats`
};

// Utility Functions
const showToast = (message, type = 'success') => {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3`;
    alertDiv.style.zIndex = '9999';
    alertDiv.style.minWidth = '300px';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
};

const showError = (message) => {
    showToast(message, 'danger');
};

const showSuccess = (message) => {
    showToast(message, 'success');
};

const showInfo = (message) => {
    showToast(message, 'info');
};

const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age;
};

const handleApiError = (error) => {
    console.error('API Error:', error);
    
    if (error.response) {
        const message = error.response.data?.message || 'An error occurred';
        showError(message);
    } else if (error.request) {
        showError('Unable to connect to the server. Please check if the server is running.');
    } else {
        showError('An unexpected error occurred');
    }
};

// HTTP Request Helper
const apiRequest = async (url, options = {}) => {
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw {
                response: {
                    status: response.status,
                    data: data
                }
            };
        }
        
        return data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};
