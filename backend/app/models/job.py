from pydantic import BaseModel
from typing import List, Optional


class JobDescription(BaseModel):
    """Job description data model"""
    id: Optional[str] = None
    title: str
    company: Optional[str] = None
    description: str
    requirements: List[str] = []
    skills: List[str]
    experience: str
    location: Optional[str] = None
    salary: Optional[str] = None
    createdAt: Optional[str] = None


class MatchResult(BaseModel):
    """Match result with candidate and score"""
    candidate: dict
    matchScore: float
    matchedSkills: List[str]
    missingSkills: List[str]
    reasoning: str


class MatchRequest(BaseModel):
    """Request for matching candidates"""
    jobDescription: JobDescription
    topN: int = 10
