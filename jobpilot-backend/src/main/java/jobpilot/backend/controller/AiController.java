package jobpilot.backend.controller;

import jakarta.validation.Valid;
import jobpilot.backend.dto.AiRequest;
import jobpilot.backend.dto.AiResponse;
import jobpilot.backend.repository.JobApplicationRepository;
import jobpilot.backend.service.GeminiService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ai")
public class AiController {

    private final GeminiService geminiService;
    private final JobApplicationRepository jobApplicationRepository;

    public AiController(GeminiService geminiService , JobApplicationRepository jobApplicationRepository){
        this.geminiService=geminiService;
        this.jobApplicationRepository=jobApplicationRepository;
    }

    @PostMapping("/extract-skills")
    public AiResponse skillsPrompt(@RequestBody @Valid AiRequest aiRequest){
        String prompt = "Analyze the following job description and extract a structured list of required skills.\n\n" +
                "Categorize them as:\n" +
                "1. Must-have technical skills\n" +
                "2. Nice-to-have technical skills\n" +
                "3. Soft skills\n\n" +
                "Job Description:\n" +
                aiRequest.getJobDescriptionText() + "\n\n" +
                "Return the result in a clean, readable format.";
        String result = geminiService.generateContent(prompt);
        AiResponse response = new AiResponse();
        response.setResult(result);
        return response;
    }

    @PostMapping("/generate-cover-letter")
    public AiResponse generateCoverLetterPrompt(@RequestBody @Valid AiRequest aiRequest){
        String prompt = "Write a professional cover letter for the following job description.\n" +
                "The cover letter should:\n" +
                "- Be concise (3-4 paragraphs)\n" +
                "- Highlight relevant technical skills\n" +
                "- Show enthusiasm for the role\n" +
                "- End with a call to action\n" +
                "\n" +
                "Job Description:\n" +
                aiRequest.getJobDescriptionText() +
                "\n" +
                "Write the cover letter now.";
        String result = geminiService.generateContent(prompt);
        AiResponse response = new AiResponse();
        response.setResult(result);
        return response;
    }

    @PostMapping("/interview-prep")
    public AiResponse interviewPrompt(@RequestBody @Valid AiRequest aiRequest){
        String prompt = "Based on the following job description, generate a list of likely interview questions.\n" +
                "\n" +
                "Include:\n" +
                "1. Technical questions (5-7 questions)\n" +
                "2. System design questions (2-3 questions)\n" +
                "3. Behavioral questions (3-4 questions)\n" +
                "\n" +
                "For each question, provide a brief note on what the interviewer is looking for.\n" +
                "\n" +
                "Job Description:\n" +
                aiRequest.getJobDescriptionText();
        String result = geminiService.generateContent(prompt);
        AiResponse response = new AiResponse();
        response.setResult(result);
        return response;
    }
}
