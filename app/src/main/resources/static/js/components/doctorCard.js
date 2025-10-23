import { showBookingOverlay } from "../loggedPatient.js"; // overlay function for booking appointments
import { deleteDoctor } from "../services/doctorServices.js"; // API call to delete doctor (admin)
import { getPatientData } from "../services/patientServices.js"; // fetch patient details (logged-in patients)

export function createDoctorCard(doctor) {
    const card = document.createElement("div");
    card.classList.add("doctor-card");

    const role = localStorage.getItem("userRole");

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("doctor-info");

    const name = document.createElement("h3");
    name.textContent = doctor.name;

    const specialization = document.createElement("p");
    specialization.textContent = `Specialization: ${doctor.specialization || "N/A"}`;

    const email = document.createElement("p");
    email.textContent = `Email: ${doctor.email || "Not provided"}`;

    const availability = document.createElement("p");
    if (doctor.available_times && doctor.available_times.length > 0) {
        availability.textContent = `Available: ${doctor.available_times.join(", ")}`;
    } else {
        availability.textContent = "Availability: Not specified";
    }

    infoDiv.appendChild(name);
    infoDiv.appendChild(specialization);
    infoDiv.appendChild(email);
    infoDiv.appendChild(availability);

    const actionsDiv = document.createElement("div");
    actionsDiv.classList.add("card-actions");

    if (role === "admin") {
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Delete";
        removeBtn.classList.add("adminBtn");

        removeBtn.addEventListener("click", async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Unauthorized action. Please log in again.");
                return;
            }

            const confirmDelete = confirm(`Are you sure you want to delete Dr. ${doctor.name}?`);
            if (!confirmDelete) return;

            try {
                const result = await deleteDoctor(doctor.id, token);
                if (result.success) {
                    alert("Doctor deleted successfully!");
                    card.remove();
                } else {
                    alert("Failed to delete doctor. Please try again.");
                }
            } catch (error) {
                console.error(error);
                alert("An error occurred while deleting the doctor.");
            }
        });

        actionsDiv.appendChild(removeBtn);
    }

    else if (role === "patient") {
        const bookNow = document.createElement("button");
        bookNow.textContent = "Book Now";
        bookNow.classList.add("dashboard-btn");

        bookNow.addEventListener("click", () => {
            alert("Please log in to book an appointment.");
        });

        actionsDiv.appendChild(bookNow);
    }

    else if (role === "loggedPatient") {
        const bookNow = document.createElement("button");
        bookNow.textContent = "Book Now";
        bookNow.classList.add("dashboard-btn");

        bookNow.addEventListener("click", async (e) => {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Session expired. Please log in again.");
                window.location.href = "/";
                return;
            }

            try {
                const patientData = await getPatientData(token);
                showBookingOverlay(e, doctor, patientData);
            } catch (error) {
                console.error(error);
                alert("Could not load booking form. Please try again.");
            }
        });

        actionsDiv.appendChild(bookNow);
    }

    card.appendChild(infoDiv);
    card.appendChild(actionsDiv);

    return card;
}
