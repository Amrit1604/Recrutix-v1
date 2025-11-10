import json
import os
from typing import List, Optional
from datetime import datetime, timedelta
from app.models.candidate import Candidate, CandidateStats
from app.config import settings


class MockDatabase:
    """Mock database using JSON file storage"""

    def __init__(self):
        self.db_path = settings.MOCK_DB_PATH
        self._ensure_db_exists()

    def _ensure_db_exists(self):
        """Ensure database file exists"""
        if not os.path.exists(self.db_path):
            os.makedirs(os.path.dirname(self.db_path), exist_ok=True)
            with open(self.db_path, 'w') as f:
                json.dump([], f)

    def _read_db(self) -> List[dict]:
        """Read database"""
        with open(self.db_path, 'r') as f:
            return json.load(f)

    def _write_db(self, data: List[dict]):
        """Write to database"""
        with open(self.db_path, 'w') as f:
            json.dump(data, f, indent=2)

    def add_candidate(self, candidate: Candidate) -> Candidate:
        """Add new candidate"""
        candidates = self._read_db()
        candidate_dict = candidate.model_dump()
        candidates.append(candidate_dict)
        self._write_db(candidates)
        return candidate

    def get_all_candidates(self) -> List[Candidate]:
        """Get all candidates"""
        candidates = self._read_db()
        return [Candidate(**c) for c in candidates]

    def get_candidate_by_id(self, candidate_id: str) -> Optional[Candidate]:
        """Get candidate by ID"""
        candidates = self._read_db()
        for c in candidates:
            if c['id'] == candidate_id:
                return Candidate(**c)
        return None

    def delete_candidate(self, candidate_id: str) -> bool:
        """Delete candidate"""
        candidates = self._read_db()
        filtered = [c for c in candidates if c['id'] != candidate_id]

        if len(filtered) < len(candidates):
            self._write_db(filtered)
            return True
        return False

    def search_candidates(self, query: str) -> List[Candidate]:
        """Search candidates by name or skills"""
        candidates = self.get_all_candidates()
        query_lower = query.lower()

        results = []
        for candidate in candidates:
            if query_lower in candidate.name.lower():
                results.append(candidate)
            elif any(query_lower in skill.lower() for skill in candidate.skills):
                results.append(candidate)

        return results

    def get_stats(self) -> CandidateStats:
        """Get candidate statistics"""
        candidates = self.get_all_candidates()

        now = datetime.now()
        week_ago = now - timedelta(days=7)
        month_ago = now - timedelta(days=30)

        this_week = sum(
            1 for c in candidates
            if datetime.fromisoformat(c.uploadedAt) >= week_ago
        )

        this_month = sum(
            1 for c in candidates
            if datetime.fromisoformat(c.uploadedAt) >= month_ago
        )

        # Calculate average match score
        scores = [c.matchScore for c in candidates if c.matchScore is not None]
        avg_score = sum(scores) / len(scores) if scores else 0.0

        return CandidateStats(
            total=len(candidates),
            thisWeek=this_week,
            thisMonth=this_month,
            avgMatchScore=avg_score
        )


# Create database instance
db = MockDatabase()
