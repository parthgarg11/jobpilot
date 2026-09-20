package jobpilot.backend.dto;

import lombok.Data;

@Data
public class UserProfileRequest {

    private String bio;
    private String skills;
    private String linkedinUrl;
    private String githubUrl;
}
