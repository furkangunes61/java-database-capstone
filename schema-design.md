# Database Schema Design - Smart Clinic System

This document defines the hybrid database architecture for the **Smart Clinic Management System**, using **MySQL** for structured data and **MongoDB** for unstructured or flexible data.

---

## 🧩 MySQL Database Design

The relational database stores structured data such as patients, doctors, appointments, and admin details.  
Relationships among these entities ensure data consistency and referential integrity.

### 1. patients Table

| Column Name | Data Type | Constraints | Description |
|--------------|------------|--------------|--------------|
| patient_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique ID for each patient |
| full_name | VARCHAR(100) | NOT NULL | Patient’s full name |
| email | VARCHAR(100) | UNIQUE, NOT NULL | Patient’s email address |
| phone | VARCHAR(20) | NOT NULL | Contact number |
| date_of_birth | DATE | NOT NULL | Patient’s birth date |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation time |

---

### 2. doctors Table

| Column Name | Data Type | Constraints | Description |
|--------------|------------|--------------|--------------|
| doctor_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique ID for each doctor |
| full_name | VARCHAR(100) | NOT NULL | Doctor’s name |
| specialization | VARCHAR(100) | NOT NULL | Medical field specialization |
| email | VARCHAR(100) | UNIQUE, NOT NULL | Doctor’s email |
| phone | VARCHAR(20) | NOT NULL | Contact number |
| availability_status | BOOLEAN | DEFAULT TRUE | Indicates if doctor is available |

---

### 3. appointments Table

| Column Name | Data Type | Constraints | Description |
|--------------|------------|--------------|--------------|
| appointment_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique appointment ID |
| patient_id | INT | FOREIGN KEY REFERENCES patients(patient_id) | Linked patient |
| doctor_id | INT | FOREIGN KEY REFERENCES doctors(doctor_id) | Linked doctor |
| appointment_date | DATETIME | NOT NULL | Scheduled appointment time |
| status | ENUM('Scheduled', 'Completed', 'Cancelled') | DEFAULT 'Scheduled' | Appointment state |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record timestamp |

---

### 4. admin Table

| Column Name | Data Type | Constraints | Description |
|--------------|------------|--------------|--------------|
| admin_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique admin ID |
| username | VARCHAR(50) | UNIQUE, NOT NULL | Admin login name |
| password | VARCHAR(255) | NOT NULL | Encrypted password |
| role | ENUM('SuperAdmin', 'Staff') | DEFAULT 'Staff' | Role type |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation timestamp |

---

### 🔗 Relationships Summary

- **patients** → **appointments**: One-to-Many  
- **doctors** → **appointments**: One-to-Many  
- **admin** manages doctors and patients (logical relationship)

---

## 🧠 MongoDB Collection Design

MongoDB stores flexible data such as **prescriptions** and **feedback logs** that can vary in structure and contain nested fields.

### 📘 Collection: `prescriptions`

Each document represents a prescription assigned by a doctor to a patient after an appointment.

```json
{
  "_id": "64f1b2a73c9a2b7f8a12d3f5",
  "appointment_id": 101,
  "patient": {
    "id": 12,
    "name": "Jane Doe"
  },
  "doctor": {
    "id": 5,
    "name": "Dr. Ahmed Kaya",
    "specialization": "Cardiology"
  },
  "prescribed_date": "2025-10-20T10:30:00Z",
  "medications": [
    { "name": "Atorvastatin", "dosage": "10mg", "duration_days": 30 },
    { "name": "Aspirin", "dosage": "75mg", "duration_days": 15 }
  ],
  "notes": "Take after meals. Follow up in 2 weeks."
}
