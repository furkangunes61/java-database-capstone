import { getAllAppointments } from '../services/appointmentRecordService.js';
import { createPatientRow } from '../components/patientRows.js';
import { renderContent } from '../render.js';

const tableBody = document.getElementById('patientTableBody');
let selectedDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
const token = localStorage.getItem('token');
let patientName = null;

const searchInput = document.getElementById('searchBar');
if (searchInput) {
    searchInput.addEventListener('input', async (e) => {
        const value = e.target.value.trim();
        patientName = value !== '' ? value : 'null';
        await loadAppointments();
    });
}

const todayBtn = document.getElementById('todayBtn');
if (todayBtn) {
    todayBtn.addEventListener('click', async () => {
        selectedDate = new Date().toISOString().split('T')[0];
        const datePicker = document.getElementById('datePicker');
        if (datePicker) datePicker.value = selectedDate;
        await loadAppointments();
    });
}

const datePicker = document.getElementById('datePicker');
if (datePicker) {
    datePicker.addEventListener('change', async (e) => {
        selectedDate = e.target.value;
        await loadAppointments();
    });
}

async function loadAppointments() {
    try {
        const data = await getAllAppointments(selectedDate, patientName, token);

        tableBody.innerHTML = '';

        if (!data || !data.appointments || data.appointments.length === 0) {
            const noDataRow = document.createElement('tr');
            noDataRow.innerHTML = `
        <td colspan="5" class="text-center">No Appointments found for today.</td>
      `;
            tableBody.appendChild(noDataRow);
            return;
        }

        data.appointments.forEach((appointment) => {
            const patient = {
                id: appointment.id,
                name: appointment.patientName,
                phone: appointment.patientPhone,
                email: appointment.patientEmail,
                time: appointment.appointmentTime,
            };

            const row = createPatientRow(patient);
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading appointments:', error);
        tableBody.innerHTML = `
      <tr><td colspan="5" class="text-center text-danger">
      Error loading appointments. Try again later.
      </td></tr>`;
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    renderContent();
    await loadAppointments();
});
