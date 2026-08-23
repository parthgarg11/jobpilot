package jobpilot.backend.service;

import jobpilot.backend.entity.JobApplication;
import jobpilot.backend.entity.User;
import jobpilot.backend.repository.JobApplicationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class JobApplicationService {

    private final JobApplicationRepository jobApplicationRepository;

    public JobApplicationService(JobApplicationRepository jobApplicationRepository) {
        this.jobApplicationRepository = jobApplicationRepository;
    }

    public JobApplication createApplication(JobApplication application) {
        return jobApplicationRepository.save(application);
    }


    public List<JobApplication> getAllApplicationsByUser(User user) {
        return jobApplicationRepository.findByUser(user);
    }


    public Optional<JobApplication> getApplicationById(UUID id) {
        return jobApplicationRepository.findById(id);
    }


    public JobApplication updateApplication(UUID id, JobApplication updated) {
        JobApplication existing = jobApplicationRepository.findById(id).orElseThrow(() -> new RuntimeException("No job application found"));

        existing.setCompanyName(updated.getCompanyName());
        existing.setRoleName(updated.getRoleName());
        existing.setJobDescriptionUrl(updated.getJobDescriptionUrl());
        existing.setJobDescriptionText(updated.getJobDescriptionText());
        existing.setStatus(updated.getStatus());
        existing.setAppliedDate(updated.getAppliedDate());
        existing.setNotes(updated.getNotes());

        return jobApplicationRepository.save(existing);
    }

    public void deleteApplication(UUID id) {
        if (!jobApplicationRepository.existsById(id)) {
            throw new RuntimeException("Application not found");
        }
        jobApplicationRepository.deleteById(id);
    }
}