package jobpilot.backend.service;


import jobpilot.backend.dto.UserProfileRequest;
import jobpilot.backend.entity.User;
import jobpilot.backend.entity.UserProfile;
import jobpilot.backend.repository.UserProfileRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserProfileService {

    private final UserProfileRepository userProfileRepository;

    public UserProfileService(UserProfileRepository userProfileRepository){
        this.userProfileRepository=userProfileRepository;
    }

    public Optional<UserProfile> getProfile(User user){
        return userProfileRepository.findByUser(user);
    }

    public UserProfile saveProfile(User user , UserProfileRequest request){
        UserProfile profile = userProfileRepository.findByUser(user).orElse(new UserProfile());

        profile.setBio(request.getBio());
        profile.setSkills(request.getSkills());
        profile.setLinkedinUrl(request.getLinkedinUrl());
        profile.setGithubUrl(request.getGithubUrl());
        profile.setUser(user);


        return userProfileRepository.save(profile);
    }
}
