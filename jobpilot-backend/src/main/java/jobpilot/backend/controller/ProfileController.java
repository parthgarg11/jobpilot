package jobpilot.backend.controller;

import jakarta.validation.Valid;
import jobpilot.backend.dto.UserProfileRequest;
import jobpilot.backend.dto.UserProfileResponse;
import jobpilot.backend.dto.WorkExperienceRequest;
import jobpilot.backend.dto.WorkExperienceResponse;
import jobpilot.backend.entity.User;
import jobpilot.backend.entity.UserProfile;
import jobpilot.backend.entity.WorkExperience;
import jobpilot.backend.repository.UserProfileRepository;
import jobpilot.backend.repository.UserRepository;
import jobpilot.backend.service.UserProfileService;
import jobpilot.backend.service.WorkExperienceService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final UserProfileService userProfileService;
    private final WorkExperienceService workExperienceService;
    private final UserRepository userRepository;

    public ProfileController(UserProfileService userProfileService , WorkExperienceService workExperienceService , UserRepository userRepository){
        this.userProfileService=userProfileService;
        this.userRepository=userRepository;
        this.workExperienceService=workExperienceService;
    }

    private User getCurrentUser() {
        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Authenticated user not found"));
    }

    private UserProfileResponse buildUserProfileResponse(UserProfile userProfile){
        return UserProfileResponse.builder()
                .bio(userProfile.getBio())
                .id(userProfile.getId())
                .skills(userProfile.getSkills())
                .githubUrl(userProfile.getGithubUrl())
                .linkedinUrl(userProfile.getLinkedinUrl())
                .build();
    }

    private WorkExperienceResponse buildWorkExperienceResponse(WorkExperience workExperience){
        return WorkExperienceResponse.builder()
                .id(workExperience.getId())
                .companyName(workExperience.getCompanyName())
                .description(workExperience.getDescription())
                .endDate(workExperience.getEndDate())
                .isCurrent(workExperience.getIsCurrent())
                .roleName(workExperience.getRoleName())
                .startDate(workExperience.getStartDate())
                .build();
    }

    //Method	Endpoint	Request	Response
    //GET	/api/profile	nothing	UserProfileResponse
    //PUT	/api/profile	@RequestBody @Valid UserProfileRequest	UserProfileResponse
    //GET	/api/profile/experience	nothing	List<WorkExperienceResponse>
    //POST	/api/profile/experience	@RequestBody @Valid WorkExperienceRequest	WorkExperienceResponse
    //PUT	/api/profile/experience/{id}	@PathVariable UUID id + @RequestBody @Valid WorkExperienceRequest	WorkExperienceResponse
    //DELETE	/api/profile/experience/{id}	@PathVariable UUID id	void, 204

    @GetMapping("")
    public UserProfileResponse getProfile(){
        User user = getCurrentUser();
        UserProfile userProfile= userProfileService.getProfile(user).orElse(new UserProfile());
        return buildUserProfileResponse(userProfile);
    }

    @PutMapping("")
    public UserProfileResponse updateProfile(@RequestBody @Valid UserProfileRequest userProfileRequest){
        User user = getCurrentUser();
        UserProfile userProfile = userProfileService.saveProfile(user,userProfileRequest);
        return buildUserProfileResponse(userProfile);
    }

    @GetMapping("/experience")
    public List<WorkExperienceResponse> getAllExperience(){
        return workExperienceService.getAllExperiences(getCurrentUser())
                .stream()
                .map(this::buildWorkExperienceResponse)
                .toList();
    }

    @PostMapping("/experience")
    public WorkExperienceResponse addExperience(@RequestBody @Valid WorkExperienceRequest workExperienceRequest){
        User user = getCurrentUser();
        return buildWorkExperienceResponse(workExperienceService.addExperience(user,workExperienceRequest));
    }

    @PutMapping("/experience/{id}")
    public WorkExperienceResponse updateExperience(@PathVariable UUID id , @RequestBody @Valid WorkExperienceRequest workExperienceRequest){
        return buildWorkExperienceResponse(workExperienceService.updateExperience(id,workExperienceRequest));
    }

    @DeleteMapping("/experience/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteExperience(@PathVariable UUID id){
        workExperienceService.deleteExperience(id);
    }



}
