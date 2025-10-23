import { openModal } from '../components/modals.js';
import { getDoctors, filterDoctors, saveDoctor } from '../services/doctorService.js';
import { createDoctorCard } from '../components/doctorCard.js';

const addDoctorBtn = document.getElementById('addDoctorBtn');
if (addDoctorBtn) {
    addDoctorBtn.addEventListener('click', () => {
        openModal('addDoctor');
    });
}

window.addEventListener('DOMContentLoaded', async () => {
    await loadDoctorCards();

    // Attach filter listeners
    const searchInput = document.getElementById('searchBar');
    const timeFilter = document.getElementById('timeFilter');
    const specialtyFilter = document.getElementById('specialtyFilter');

    if (searchInput) searchInput.addEventListener('input', filterDoctorsOnChange);
    if (timeFilter) timeFilter.addEventListener('change', filterDoctorsOnChange);
    if (specialtyFilter) specialtyFilter.addEventListener('change', filterDoctorsOnChange);
});

async function loadDoctorCards() {
    try {
        const contentDiv = document.getElementById('content');
        if (!contentDiv) return;

        contentDiv.innerHTML = '<p>Loading doctors...</p>';
        const doctors = await getDoctors();

        renderDoctorCards(doctors);
    } catch (error) {
        console.error('Error loading doctors:', error);
    }
}

async function filterDoctorsOnChange() {
    try {
        const name = document.getElementById('searchBar')?.value.trim() || null;
        const time = document.getElementById('timeFilter')?.value || null;
        const specialty = document.getElementById('specialtyFilter')?.value || null;

        const result = await filterDoctors(name, time, specialty);
        const doctors = result.doctors || [];

        if (doctors.length > 0) {
            renderDoctorCards(doctors);
        } else {
            const contentDiv = document.getElementById('content');
            contentDiv.innerHTML = '<p>No doctors found with the given filters.</p>';
        }
    } catch (error) {
        console.error('Filter error:', error);
        alert('An error occurred while filtering doctors.');
    }
}

function renderDoctorCards(doctors) {
    const contentDiv = document.getElementById('content');
    if (!contentDiv) return;

    contentDiv.innerHTML = ''; // Clear existing content
    doctors.forEach((doctor) => {
        const card = createDoctorCard(doctor);
        contentDiv.appendChild(card);
    });
}

window.adminAddDoctor = async function () {
    try {
        const name = document.getElementById('doctorName').value.trim();
        const email = document.getElementById('doctorEmail').value.trim();
        const phone = document.getElementById('doctorPhone').value.trim();
        const password = document.getElementById('doctorPassword').value.trim();
        const specialty = document.getElementById('doctorSpecialty').value.trim();
        const availableTimes = document.getElementById('doctorTimes').value.trim();

        const token = localStorage.getItem('token');
        if (!token) {
            alert('Authentication token not found. Please log in again.');
            return;
        }

        const doctor = {
            name,
            email,
            phone,
            password,
            specialty,
            availableTimes,
        };

        const result = await saveDoctor(doctor, token);

        if (result.success) {
            alert('Doctor added successfully!');
            const modal = document.getElementById('addDoctorModal');
            if (modal) modal.style.display = 'none';
            location.reload();
        } else {
            alert(`Error: ${result.message}`);
        }
    } catch (error) {
        console.error('Error adding doctor:', error);
        alert('An unexpected error occurred while adding the doctor.');
    }
};
