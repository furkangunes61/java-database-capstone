# Schema Design – Smart Clinic Management System

This document describes the **database schema design** for the **Smart Clinic Management System**, which uses both **MySQL** (relational) and **MongoDB** (document-based) databases to store structured and unstructured data.

---

## 🧩 MySQL Database Design

The MySQL database stores structured data such as patients, doctors, appointments, and admin information.  
This schema ensures data consistency, relationships, and easy querying.

### 1. Table: patients
| Column Name | Data Type | Constraints | Description |
|--------------|------------|--------------|--------------|
| patient_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique ID for each patient |
| full_name | VARCHAR(100) | NOT NULL | Patient’s full name |
| email | VARCHAR(100) | UNIQUE, NOT NULL | Patient’s email address |
| phone | VARCHAR(20) | NOT NULL | Contact number |
| date_of_birth | DATE | NOT NULL | Date of birth |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation time |

---

### 2. Table: doctors
| Column Name | Data Type | Constraints | Description |
|--------------|------------|--------------|--------------|
| doctor_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique doctor ID |
| full_name | VARCHAR(100) | NOT NULL | Doctor’s name |
| specialization | VARCHAR(100) | NOT NULL | Area of specialization |
| email | VARCHAR(100) | UNIQUE, NOT NULL | Doctor’s email |
| phone | VARCHAR(20) | NOT NULL | Contact number |
| availability_status | BOOLEAN | DEFAULT TRUE | Indicates doctor availability |

---

### 3. Table: appointments
| Column Name | Data Type | Constraints | Description |
|--------------|------------|--------------|--------------|
| appointment_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique appointment ID |
| patient_id | INT | FOREIGN KEY REFERENCES patients(patient_id) | Linked patient |
| doctor_id | INT | FOREIGN KEY REFERENCES doctors(doctor_id) | Linked doctor |
| appointment_time | DATETIME | NOT NULL | Scheduled appointment time |
| status | ENUM('Scheduled','Completed','Cancelled') | DEFAULT 'Scheduled' | Appointment status |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation time |

---

### 4. Table: admin
| Column Name | Data Type | Constraints | Description |
|--------------|------------|--------------|--------------|
| admin_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique admin ID |
| username | VARCHAR(50) | UNIQUE, NOT NULL | Admin login username |
| password | VARCHAR(255) | NOT NULL | Encrypted password |
| role | ENUM('SuperAdmin','Staff') | DEFAULT 'Staff' | Admin role |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation timestamp |

---

### 🔗 Relationships Summary
- **patients → appointments:** One-to-Many  
- **doctors → appointments:** One-to-Many  
- **admin** manages doctors and patients logically (no direct FK)  

---

## 🍃 MongoDB Collection Design

MongoDB is used for unstructured, flexible data such as **prescriptions**, **feedback**, and **activity logs**.

### Collection: prescriptions
Stores prescriptions created by doctors for patients after appointments.

```json
{
  "_id": "ObjectId('64f1a2c73b2a4e1f9d123456')",
  "appointment_id": 45,
  "patient": {
    "id": 12,
    "name": "Jane Doe"
  },
  "doctor": {
    "id": 4,
    "name": "Dr. Murat Kaya",
    "specialization": "Cardiology"
  },
  "prescribed_date": "2025-10-21T09:00:00Z",
  "medications": [
    { "name": "Paracetamol", "dosage": "500mg", "duration_days": 5 },
    { "name": "Vitamin D", "dosage": "1000 IU", "duration_days": 30 }
  ],
  "notes": "Take after meals. Stay hydrated.",
  "follow_up_required": true
}
