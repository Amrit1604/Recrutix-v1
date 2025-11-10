import PyPDF2
import docx
import re
from typing import Dict, List
from app.models.candidate import Candidate, ExperienceItem, EducationItem


class ResumeParser:
    """Parse resumes and extract candidate information"""

    def __init__(self):
        self.email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        self.phone_pattern = r'(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}'

    def parse_pdf(self, file_path: str) -> str:
        """Extract text from PDF"""
        text = ""
        try:
            with open(file_path, 'rb') as file:
                pdf_reader = PyPDF2.PdfReader(file)
                for page in pdf_reader.pages:
                    text += page.extract_text()
        except Exception as e:
            print(f"Error parsing PDF: {e}")
        return text

    def parse_docx(self, file_path: str) -> str:
        """Extract text from DOCX"""
        text = ""
        try:
            doc = docx.Document(file_path)
            for paragraph in doc.paragraphs:
                text += paragraph.text + "\n"
        except Exception as e:
            print(f"Error parsing DOCX: {e}")
        return text

    def extract_email(self, text: str) -> str:
        """Extract email address"""
        emails = re.findall(self.email_pattern, text)
        return emails[0] if emails else "noemail@example.com"

    def extract_phone(self, text: str) -> str:
        """Extract phone number"""
        phones = re.findall(self.phone_pattern, text)
        return phones[0] if phones else ""

    def extract_name(self, text: str) -> str:
        """Extract candidate name (first few lines usually contain name)"""
        lines = [line.strip() for line in text.split('\n') if line.strip()]

        # Name is usually in the first 3 lines
        for line in lines[:3]:
            # Skip lines with email or phone
            if '@' not in line and not re.search(self.phone_pattern, line):
                # Name should be relatively short
                if len(line) < 50 and len(line.split()) <= 4:
                    return line

        return lines[0] if lines else "Unknown"

    def extract_skills(self, text: str) -> List[str]:
        """Extract skills from resume text"""
        # Common tech skills (this is a simplified version)
        common_skills = [
            'Python', 'Java', 'JavaScript', 'TypeScript', 'React', 'Angular', 'Vue',
            'Node.js', 'Express', 'FastAPI', 'Django', 'Flask', 'Spring Boot',
            'SQL', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis',
            'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes',
            'Git', 'CI/CD', 'Agile', 'Scrum',
            'HTML', 'CSS', 'Tailwind', 'Bootstrap',
            'REST', 'GraphQL', 'Microservices',
            'Machine Learning', 'AI', 'Deep Learning', 'NLP',
            'Data Analysis', 'Pandas', 'NumPy', 'TensorFlow',
            'Leadership', 'Communication', 'Problem Solving'
        ]

        found_skills = []
        text_lower = text.lower()

        for skill in common_skills:
            if skill.lower() in text_lower:
                found_skills.append(skill)

        return found_skills[:15]  # Limit to top 15 skills

    def extract_experience(self, text: str) -> List[ExperienceItem]:
        """Extract work experience (basic extraction)"""
        # This is a simplified version - real implementation would use NLP
        experiences = []

        # Look for common experience patterns
        lines = text.split('\n')

        # Simple heuristic: find company/position patterns
        for i, line in enumerate(lines):
            line_lower = line.lower()
            if any(word in line_lower for word in ['engineer', 'developer', 'manager', 'lead', 'architect']):
                # Try to find company name nearby
                company = "Company Name"
                duration = "2020 - Present"

                if i + 1 < len(lines):
                    next_line = lines[i + 1].strip()
                    if len(next_line) < 50:
                        company = next_line

                experiences.append(ExperienceItem(
                    position=line.strip(),
                    company=company,
                    duration=duration,
                    description="Experience description"
                ))

                if len(experiences) >= 3:  # Limit to 3 experiences
                    break

        # If no experiences found, create mock one
        if not experiences:
            experiences.append(ExperienceItem(
                position="Software Engineer",
                company="Tech Company",
                duration="2020 - Present",
                description="Software development experience"
            ))

        return experiences

    def extract_education(self, text: str) -> List[EducationItem]:
        """Extract education information"""
        education_list = []

        # Look for degree keywords
        degrees = ['Bachelor', 'Master', 'PhD', 'B.S.', 'M.S.', 'B.Tech', 'M.Tech']
        lines = text.split('\n')

        for i, line in enumerate(lines):
            if any(degree in line for degree in degrees):
                institution = "University"
                year = "2020"

                # Try to extract year
                year_match = re.search(r'(19|20)\d{2}', line)
                if year_match:
                    year = year_match.group()

                education_list.append(EducationItem(
                    degree=line.strip(),
                    institution=institution,
                    year=year
                ))

                if len(education_list) >= 2:
                    break

        # Default education if none found
        if not education_list:
            education_list.append(EducationItem(
                degree="Bachelor's Degree",
                institution="University",
                year="2020"
            ))

        return education_list

    def parse_resume(self, file_path: str, filename: str) -> Candidate:
        """Main parsing method"""
        # Extract text based on file type
        if filename.endswith('.pdf'):
            text = self.parse_pdf(file_path)
        elif filename.endswith('.docx'):
            text = self.parse_docx(file_path)
        else:
            raise ValueError("Unsupported file format")

        # Extract information
        name = self.extract_name(text)
        email = self.extract_email(text)
        phone = self.extract_phone(text)
        skills = self.extract_skills(text)
        experience = self.extract_experience(text)
        education = self.extract_education(text)

        # Create summary (first paragraph after name)
        lines = [l.strip() for l in text.split('\n') if l.strip()]
        summary = ""
        for line in lines[1:5]:  # Look in first few lines
            if len(line) > 50 and '@' not in line:
                summary = line
                break

        # Create candidate object
        candidate = Candidate(
            name=name,
            email=email,
            phone=phone if phone else None,
            location="Location Not Specified",
            skills=skills,
            experience=experience,
            education=education,
            summary=summary if summary else "Professional with experience in software development",
            resumeUrl=filename
        )

        return candidate


# Create parser instance
resume_parser = ResumeParser()
