package jobpilot.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorkExperienceResponse {


    private UUID id;

    private String companyName;

    private String roleName;

    private LocalDate startDate;

    private LocalDate endDate;

    private String description;

    private Boolean isCurrent;


}
