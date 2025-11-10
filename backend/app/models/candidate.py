from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import datetime


class ExperienceItem(BaseModel):
    """Work experience item"""
    company: str
    position: str
    duration: str
    description: Optional[str] = None
    startDate: Optional[str] = None
    endDate: Optional[str] = None


class EducationItem(BaseModel):
    """Education item"""
    institution: str
    degree: str
    field: Optional[str] = None
    year: str


class Candidate(BaseModel):
    """Candidate data model"""
    id: str = Field(default_factory=lambda: datetime.now().strftime("%Y%m%d%H%M%S%f"))
    name: str
    email: EmailStr
    phone: Optional[str] = None
    location: Optional[str] = None
    skills: List[str] = []
    experience: List[ExperienceItem] = []
    education: List[EducationItem] = []
    summary: Optional[str] = None
    resumeUrl: Optional[str] = None
    uploadedAt: str = Field(default_factory=lambda: datetime.now().isoformat())
    matchScore: Optional[float] = None


class CandidateStats(BaseModel):
    """Candidate statistics"""
    total: int
    thisWeek: int
    thisMonth: int
    avgMatchScore: float
