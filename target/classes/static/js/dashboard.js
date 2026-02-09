// Dashboard JavaScript

// Load dashboard statistics on page load
document.addEventListener('DOMContentLoaded', () => {
    loadDashboardStats();
});

// Load Dashboard Statistics
const loadDashboardStats = async () => {
    try {
        const response = await apiRequest(API_ENDPOINTS.stats);
        
        if (response.success) {
            const stats = response.data;
            
            // Update stat cards
            document.getElementById('totalStudents').textContent = stats.totalStudents || 0;
            document.getElementById('activeStudents').textContent = stats.activeStudents || 0;
            document.getElementById('inactiveStudents').textContent = stats.inactiveStudents || 0;
            document.getElementById('totalCourses').textContent = 
                Object.keys(stats.courseDistribution || {}).length;
            
            // Update course distribution table
            displayCourseDistribution(stats.courseDistribution, stats.totalStudents);
        }
    } catch (error) {
        console.error('Error loading dashboard stats:', error);
    }
};

// Display Course Distribution
const displayCourseDistribution = (courseDistribution, totalStudents) => {
    const tbody = document.getElementById('courseDistributionBody');
    
    if (!courseDistribution || Object.keys(courseDistribution).length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="3" class="text-center text-muted">No course data available</td>
            </tr>
        `;
        return;
    }
    
    let html = '';
    
    // Sort courses by student count (descending)
    const sortedCourses = Object.entries(courseDistribution)
        .sort(([, a], [, b]) => b - a);
    
    sortedCourses.forEach(([course, count]) => {
        const percentage = totalStudents > 0 
            ? ((count / totalStudents) * 100).toFixed(1) 
            : 0;
        
        html += `
            <tr>
                <td>
                    <strong>${course}</strong>
                </td>
                <td>
                    <span class="badge bg-primary">${count}</span>
                </td>
                <td>
                    <div class="d-flex align-items-center">
                        <div class="progress flex-grow-1 me-2" style="height: 20px;">
                            <div class="progress-bar bg-success" role="progressbar" 
                                 style="width: ${percentage}%"
                                 aria-valuenow="${percentage}" aria-valuemin="0" aria-valuemax="100">
                                ${percentage}%
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html;
};
