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
        return null;
    }


    public List<JobApplication> getAllApplicationsByUser(User user) {
        return null;
    }


    public Optional<JobApplication> getApplicationById(UUID id) {
        return null;
    }


    public JobApplication updateApplication(UUID id, JobApplication updated) {
        return null;
    }

    public void deleteApplication(UUID id) {
    }
}