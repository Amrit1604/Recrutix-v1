from typing import List
import random
from app.models.job import JobDescription, MatchResult
from app.models.candidate import Candidate


class AIMatcher:
    """
    AI-powered candidate matching service

    PROTOTYPE VERSION: Uses rule-based matching
    FUTURE: Integrate OpenAI embeddings or HuggingFace models
    """

    def __init__(self):
        self.use_ai = False  # Set to True when API keys are configured

    def calculate_skill_match(
        self,
        candidate_skills: List[str],
        required_skills: List[str]
    ) -> tuple[float, List[str], List[str]]:
        """Calculate skill match score"""
        candidate_skills_lower = [s.lower() for s in candidate_skills]
        required_skills_lower = [s.lower() for s in required_skills]

        # Find matched and missing skills
        matched = []
        missing = []

        for req_skill in required_skills:
            found = False
            for cand_skill in candidate_skills:
                if req_skill.lower() in cand_skill.lower() or cand_skill.lower() in req_skill.lower():
                    matched.append(req_skill)
                    found = True
                    break
            if not found:
                missing.append(req_skill)

        # Calculate score (percentage of matched skills)
        if len(required_skills) == 0:
            return 0.5, matched, missing

        score = len(matched) / len(required_skills)
        return score, matched, missing

    def calculate_experience_match(
        self,
        candidate: Candidate,
        required_experience: str
    ) -> float:
        """Calculate experience match (simplified)"""
        # Count years of experience
        exp_years = len(candidate.experience) * 2  # Rough estimate

        # Extract required years from string (e.g., "3-5 years")
        import re
        numbers = re.findall(r'\d+', required_experience)

        if not numbers:
            return 0.7  # Default moderate match

        required_years = int(numbers[0])

        if exp_years >= required_years:
            return 1.0
        elif exp_years >= required_years * 0.7:
            return 0.8
        else:
            return 0.5

    def generate_reasoning(
        self,
        candidate: Candidate,
        matched_skills: List[str],
        missing_skills: List[str],
        overall_score: float
    ) -> str:
        """Generate match reasoning"""
        if overall_score >= 0.8:
            return f"Excellent match! {candidate.name} has {len(matched_skills)} out of {len(matched_skills) + len(missing_skills)} required skills and strong relevant experience."
        elif overall_score >= 0.6:
            return f"Good match. {candidate.name} possesses most key skills ({len(matched_skills)} matched) but may need training in {len(missing_skills)} areas."
        else:
            return f"Moderate match. {candidate.name} has some relevant skills but is missing several key requirements. Consider for roles with training opportunities."

    def match_candidates(
        self,
        candidates: List[Candidate],
        job_description: JobDescription,
        top_n: int = 10
    ) -> List[MatchResult]:
        """
        Match candidates to job description

        PROTOTYPE: Uses rule-based scoring
        FUTURE: Use embeddings for semantic matching
        """
        results = []

        for candidate in candidates:
            # Calculate skill match
            skill_score, matched_skills, missing_skills = self.calculate_skill_match(
                candidate.skills,
                job_description.skills
            )

            # Calculate experience match
            exp_score = self.calculate_experience_match(
                candidate,
                job_description.experience
            )

            # Overall score (weighted average)
            overall_score = (skill_score * 0.7) + (exp_score * 0.3)

            # Add small random factor for prototype (simulates AI nuance)
            overall_score = min(1.0, overall_score + random.uniform(-0.05, 0.05))

            # Generate reasoning
            reasoning = self.generate_reasoning(
                candidate,
                matched_skills,
                missing_skills,
                overall_score
            )

            # Create match result
            result = MatchResult(
                candidate=candidate.model_dump(),
                matchScore=round(overall_score, 2),
                matchedSkills=matched_skills,
                missingSkills=missing_skills,
                reasoning=reasoning
            )

            results.append(result)

        # Sort by match score (descending)
        results.sort(key=lambda x: x.matchScore, reverse=True)

        # Return top N
        return results[:top_n]

    def match_with_openai(self, candidates: List[Candidate], job_description: JobDescription):
        """
        Use OpenAI for semantic matching (future implementation)

        TODO:
        1. Generate embeddings for candidate profiles
        2. Generate embedding for job description
        3. Calculate cosine similarity
        4. Use GPT for reasoning generation
        """
        # from openai import OpenAI
        # client = OpenAI(api_key=settings.OPENAI_API_KEY)
        # ... implementation ...
        pass

    def match_with_huggingface(self, candidates: List[Candidate], job_description: JobDescription):
        """
        Use HuggingFace models for matching (future implementation)

        TODO:
        1. Load sentence-transformers model
        2. Generate embeddings
        3. Calculate similarity scores
        """
        # from sentence_transformers import SentenceTransformer
        # model = SentenceTransformer('all-MiniLM-L6-v2')
        # ... implementation ...
        pass


# Create matcher instance
ai_matcher = AIMatcher()
