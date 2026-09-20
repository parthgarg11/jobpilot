package jobpilot.backend.repository;

import jobpilot.backend.entity.User;
import jobpilot.backend.entity.WorkExperience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface WorkExperienceRepository extends JpaRepository<WorkExperience, UUID> {

    List<WorkExperience> findByUserOrderByStartDateDesc(User user);
}
