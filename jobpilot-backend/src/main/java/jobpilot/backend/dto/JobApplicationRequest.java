package jobpilot.backend.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jobpilot.backend.entity.ApplicationStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class JobApplicationRequest {

    @NotBlank
    private String companyName;

    @NotBlank
    private String roleName;

    private String jobDescriptionUrl;

    private String jobDescriptionText;

    @NotNull
    private ApplicationStatus status;

    private LocalDate appliedDate;

    private String notes;
}
