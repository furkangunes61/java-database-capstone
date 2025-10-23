import { API_BASE_URL } from '../config/config.js';

const DOCTOR_API = API_BASE_URL + '/doctor';

export async function getDoctors() {
    try {
        const response = await fetch(DOCTOR_API);
        const data = await response.json();
        return data.doctors || [];
    } catch (error) {
        console.error('Error fetching doctors:', error);
        return [];
    }
}

export async function deleteDoctor(doctorId, token) {
    try {
        const response = await fetch(`${DOCTOR_API}/delete/${doctorId}/${token}`, {
            method: 'DELETE',
        });
        const data = await response.json();

        return {
            success: response.ok,
            message: data.message || 'Doctor deleted successfully',
        };
    } catch (error) {
        console.error('Error deleting doctor:', error);
        return {
            success: false,
            message: 'Failed to delete doctor. Please try again.',
        };
    }
}

export async function saveDoctor(doctor, token) {
    try {
        const response = await fetch(`${DOCTOR_API}/save/${token}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(doctor),
        });
        const data = await response.json();

        return {
            success: response.ok,
            message: data.message || 'Doctor saved successfully',
        };
    } catch (error) {
        console.error('Error saving doctor:', error);
        return {
            success: false,
            message: 'Failed to save doctor. Please try again later.',
        };
    }
}

export async function filterDoctors(name, time, specialty) {
    try {
        const response = await fetch(`${DOCTOR_API}/filter/${name}/${time}/${specialty}`);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error('Error filtering doctors:', response.statusText);
            return { doctors: [] };
        }
    } catch (error) {
        console.error('Unexpected error during filter:', error);
        alert('An error occurred while filtering doctors.');
        return { doctors: [] };
    }
}
