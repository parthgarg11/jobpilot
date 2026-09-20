package jobpilot.backend.service;

import jobpilot.backend.dto.WorkExperienceRequest;
import jobpilot.backend.entity.User;
import jobpilot.backend.entity.WorkExperience;
import jobpilot.backend.repository.WorkExperienceRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class WorkExperienceService {

    private final WorkExperienceRepository workExperienceRepository;

    public WorkExperienceService(WorkExperienceRepository workExperienceRepository){
        this.workExperienceRepository=workExperienceRepository;
    }


    public List<WorkExperience> getAllExperiences(User user){
        return workExperienceRepository.findByUserOrderByStartDateDesc(user);
    }

    public WorkExperience addExperience(User user , WorkExperienceRequest request){
        WorkExperience workExperience = new WorkExperience();

        workExperience.setUser(user);
        workExperience.setCompanyName(request.getCompanyName());
        workExperience.setEndDate(request.getEndDate());
        workExperience.setIsCurrent(request.getIsCurrent());
        workExperience.setDescription(request.getDescription());
        workExperience.setStartDate(request.getStartDate());
        workExperience.setRoleName(request.getRoleName());

        return workExperienceRepository.save(workExperience);

    }

    public WorkExperience updateExperience(UUID id, WorkExperienceRequest request){

        WorkExperience workExperience = workExperienceRepository.findById(id).orElseThrow(()->new RuntimeException("No such Experience found"));
        workExperience.setCompanyName(request.getCompanyName());
        workExperience.setEndDate(request.getEndDate());
        workExperience.setIsCurrent(request.getIsCurrent());
        workExperience.setDescription(request.getDescription());
        workExperience.setStartDate(request.getStartDate());
        workExperience.setRoleName(request.getRoleName());

        return  workExperienceRepository.save(workExperience);
    }

    public void deleteExperience(UUID id){

        WorkExperience workExperience = workExperienceRepository.findById(id).orElseThrow(()->new RuntimeException("No such Experience found"));
        workExperienceRepository.delete(workExperience);
    }




}
