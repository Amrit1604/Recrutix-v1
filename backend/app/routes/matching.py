from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from app.models.job import MatchRequest, MatchResult
from app.services.ai_matcher import ai_matcher
from app.database.mock_db import db

router = APIRouter()


@router.post("")
async def match_candidates(request: MatchRequest):
    """
    Match candidates to job description using AI

    Returns top N candidates ranked by match score
    """
    try:
        # Get all candidates from database
        candidates = db.get_all_candidates()

        if not candidates:
            return JSONResponse(
                status_code=200,
                content={
                    "success": True,
                    "data": [],
                    "message": "No candidates found in database"
                }
            )

        # Perform matching
        results = ai_matcher.match_candidates(
            candidates=candidates,
            job_description=request.jobDescription,
            top_n=request.topN
        )

        # Update candidates with match scores in database
        for result in results:
            candidate_id = result.candidate['id']
            candidate = db.get_candidate_by_id(candidate_id)
            if candidate:
                candidate.matchScore = result.matchScore
                # Note: In a real DB, we'd update here

        return JSONResponse(
            status_code=200,
            content={
                "success": True,
                "data": [r.model_dump() for r in results]
            }
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error matching candidates: {str(e)}"
        )


@router.post("/analyze/{candidate_id}")
async def analyze_candidate(candidate_id: str):
    """
    Analyze resume quality and provide recommendations

    FUTURE: Use AI to provide detailed feedback
    """
    try:
        candidate = db.get_candidate_by_id(candidate_id)

        if not candidate:
            raise HTTPException(status_code=404, detail="Candidate not found")

        # Mock analysis for prototype
        analysis = {
            "overallScore": 85,
            "strengths": [
                "Strong technical skills portfolio",
                "Diverse work experience",
                "Clear education background"
            ],
            "improvements": [
                "Add more specific project details",
                "Include quantifiable achievements",
                "Update with recent certifications"
            ],
            "recommendations": [
                "Highlight leadership experiences",
                "Add links to portfolio/GitHub",
                "Include relevant keywords"
            ]
        }

        return JSONResponse(
            status_code=200,
            content={
                "success": True,
                "data": analysis
            }
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
