package net.abbaspour.auth0.oauth2.resourceserver.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ApiController {

    @GetMapping("/public")
    public ResponseEntity<Map<String, Object>> publicEndpoint() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "This is a public endpoint (still requires authentication)");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/private")
    public ResponseEntity<Map<String, Object>> privateEndpoint() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "This is a private endpoint");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/data")
    public ResponseEntity<Map<String, Object>> dataEndpoint() {
        Map<String, Object> response = new HashMap<>();
        response.put("id", 1);
        response.put("name", "Sample Data");
        response.put("description", "This is a sample JSON response");
        response.put("created", System.currentTimeMillis());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/applications")
    @PreAuthorize("hasAuthority('SCOPE_read')")
    public ResponseEntity<List<Map<String, Object>>> getApplications() {
        List<Map<String, Object>> applications = new ArrayList<>();

        // Sample application 1
        Map<String, Object> application1 = new HashMap<>();
        application1.put("id", 1);
        application1.put("position", "Software Engineer");
        application1.put("company", "Tech Solutions Inc.");
        application1.put("applicant", "John Doe");
        application1.put("status", "In Review");
        application1.put("appliedDate", "2023-05-15");
        applications.add(application1);

        // Sample application 2
        Map<String, Object> application2 = new HashMap<>();
        application2.put("id", 2);
        application2.put("position", "Data Scientist");
        application2.put("company", "Data Analytics Co.");
        application2.put("applicant", "Jane Smith");
        application2.put("status", "Interview Scheduled");
        application2.put("appliedDate", "2023-05-10");
        applications.add(application2);

        // Sample application 3
        Map<String, Object> application3 = new HashMap<>();
        application3.put("id", 3);
        application3.put("position", "Product Manager");
        application3.put("company", "Innovative Products Ltd.");
        application3.put("applicant", "Michael Johnson");
        application3.put("status", "Offer Extended");
        application3.put("appliedDate", "2023-04-28");
        applications.add(application3);

        return ResponseEntity.ok(applications);
    }

    @GetMapping("/applications/{id}")
    @PreAuthorize("hasAuthority('SCOPE_read')")
    public ResponseEntity<Map<String, Object>> getApplicationById(@PathVariable int id) {
        // Create a sample application based on the provided ID
        Map<String, Object> application = new HashMap<>();

        // Check if the ID is valid (for this example, we'll consider IDs 1-3 as valid)
        if (id >= 1 && id <= 3) {
            application.put("id", id);

            // Set different values based on the ID to simulate different applications
            switch (id) {
                case 1:
                    application.put("position", "Software Engineer");
                    application.put("company", "Tech Solutions Inc.");
                    application.put("applicant", "John Doe");
                    application.put("status", "In Review");
                    application.put("appliedDate", "2023-05-15");
                    application.put("resume", "http://example.com/resumes/johndoe.pdf");
                    application.put("coverLetter", "http://example.com/coverletters/johndoe.pdf");
                    break;
                case 2:
                    application.put("position", "Data Scientist");
                    application.put("company", "Data Analytics Co.");
                    application.put("applicant", "Jane Smith");
                    application.put("status", "Interview Scheduled");
                    application.put("appliedDate", "2023-05-10");
                    application.put("resume", "http://example.com/resumes/janesmith.pdf");
                    application.put("coverLetter", "http://example.com/coverletters/janesmith.pdf");
                    application.put("interviewDate", "2023-05-25");
                    break;
                case 3:
                    application.put("position", "Product Manager");
                    application.put("company", "Innovative Products Ltd.");
                    application.put("applicant", "Michael Johnson");
                    application.put("status", "Offer Extended");
                    application.put("appliedDate", "2023-04-28");
                    application.put("resume", "http://example.com/resumes/michaeljohnson.pdf");
                    application.put("coverLetter", "http://example.com/coverletters/michaeljohnson.pdf");
                    application.put("offerDetails", "Salary: $120,000, Start Date: 2023-06-15");
                    break;
            }

            return ResponseEntity.ok(application);
        } else {
            // If the ID is not valid, return a 404 Not Found response
            return ResponseEntity.notFound().build();
        }
    }
}
