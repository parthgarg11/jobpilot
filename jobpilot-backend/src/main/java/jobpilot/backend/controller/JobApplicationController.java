package jobpilot.backend.controller;


import jakarta.validation.Valid;
import jobpilot.backend.dto.JobApplicationRequest;
import jobpilot.backend.dto.JobApplicationResponse;
import jobpilot.backend.entity.JobApplication;
import jobpilot.backend.entity.User;
import jobpilot.backend.repository.UserRepository;
import jobpilot.backend.service.JobApplicationService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/applications")
public class JobApplicationController {


    private final JobApplicationService jobApplicationService;
    private final UserRepository userRepository;

    public JobApplicationController(JobApplicationService jobApplicationService , UserRepository userRepository){
        this.jobApplicationService=jobApplicationService;
        this.userRepository=userRepository;
    }

    private User getCurrentUser() {
        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Authenticated user not found"));
    }

    private JobApplicationResponse mappingResponse(JobApplication jobApplication){
        return JobApplicationResponse.builder()
                .id(jobApplication.getId())
                .companyName(jobApplication.getCompanyName())
                .roleName(jobApplication.getRoleName())
                .jobDescriptionText(jobApplication.getJobDescriptionText())
                .jobDescriptionUrl(jobApplication.getJobDescriptionUrl())
                .appliedDate(jobApplication.getAppliedDate())
                .status(jobApplication.getStatus())
                .notes(jobApplication.getNotes())
                .createdAt(jobApplication.getCreatedAt())
                .updatedAt(jobApplication.getUpdatedAt())
                .build();
    }

    @PostMapping("/")
    @ResponseStatus(HttpStatus.CREATED)
    public JobApplicationResponse createApplication(@RequestBody @Valid JobApplicationRequest jobApplicationRequest){
        User user = getCurrentUser();

        JobApplication application = JobApplication.builder()
                .companyName(jobApplicationRequest.getCompanyName())
                .appliedDate(jobApplicationRequest.getAppliedDate())
                .roleName(jobApplicationRequest.getRoleName())
                .status(jobApplicationRequest.getStatus())
                .jobDescriptionText(jobApplicationRequest.getJobDescriptionText())
                .jobDescriptionUrl(jobApplicationRequest.getJobDescriptionUrl())
                .notes(jobApplicationRequest.getNotes())
                .user(user)
                .build();

        JobApplication createdApplication = jobApplicationService.createApplication(application);

        return mappingResponse(createdApplication);
    }

    @GetMapping("/")
    public List<JobApplicationResponse> listAllApplications(){
        return jobApplicationService.getAllApplicationsByUser(getCurrentUser())
                .stream()
                .map(this::mappingResponse)
                .toList();
    }

    @GetMapping("/{id}")
    public JobApplicationResponse getJobApplicationById(@PathVariable UUID id) {
        JobApplication application = jobApplicationService.getApplicationById(id).orElseThrow( () -> new RuntimeException("No Application Found"));
        return mappingResponse(application);
    }

    @PutMapping("/{id}")
    public JobApplicationResponse updateJobApplication(@PathVariable UUID id , @RequestBody @Valid JobApplicationRequest jobApplicationRequest){
        JobApplication application = JobApplication.builder()
                .companyName(jobApplicationRequest.getCompanyName())
                .appliedDate(jobApplicationRequest.getAppliedDate())
                .roleName(jobApplicationRequest.getRoleName())
                .status(jobApplicationRequest.getStatus())
                .jobDescriptionText(jobApplicationRequest.getJobDescriptionText())
                .jobDescriptionUrl(jobApplicationRequest.getJobDescriptionUrl())
                .notes(jobApplicationRequest.getNotes())
                .build();

        return mappingResponse(jobApplicationService.updateApplication(id,application));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteApplication(@PathVariable UUID id) {
        jobApplicationService.deleteApplication(id);
    }


}
