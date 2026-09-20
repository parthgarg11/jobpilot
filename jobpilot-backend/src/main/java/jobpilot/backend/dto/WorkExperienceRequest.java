package jobpilot.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class WorkExperienceRequest {

    @NotBlank
    private String companyName;

    @NotBlank
    private String roleName;

    @NotNull
    private LocalDate startDate;

    private LocalDate endDate;

    private String description;

    @NotNull
    private Boolean isCurrent;

}
