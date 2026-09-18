package jobpilot.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AiRequest {
    @NotBlank
    String jobDescriptionText;
}
