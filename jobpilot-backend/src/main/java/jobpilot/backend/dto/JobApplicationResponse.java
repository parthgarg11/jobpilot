package jobpilot.backend.dto;

import jobpilot.backend.entity.ApplicationStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class JobApplicationResponse {

    private UUID id;
    private String companyName;
    private String roleName;
    private String jobDescriptionUrl;
    private String jobDescriptionText;
    private ApplicationStatus status;
    private LocalDate appliedDate;
    private String notes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;


}
