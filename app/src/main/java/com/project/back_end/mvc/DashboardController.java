package com.project.back_end.mvc;

import com.project.back_end.services.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Map;

@Controller
public class DashboardController {

    @Autowired
    private Service service;

    // 2️⃣ Admin Dashboard Metodu
    @GetMapping("/adminDashboard/{token}")
    public String adminDashboard(@PathVariable String token) {

        Map<String, Object> validationResult = service.validateToken(token, "admin");

        if (validationResult.isEmpty()) {
            return "admin/adminDashboard";
        } else {
            return "redirect:/";
        }
    }

    @GetMapping("/doctorDashboard/{token}")
    public String doctorDashboard(@PathVariable String token) {

        Map<String, Object> validationResult = service.validateToken(token, "doctor");

        if (validationResult.isEmpty()) {
            return "doctor/doctorDashboard";
        } else {
            return "redirect:/";
        }
    }
}
