from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from typing import List, Optional
from app.models.candidate import Candidate, CandidateStats
from app.database.mock_db import db

router = APIRouter()


@router.get("")
async def get_all_candidates():
    """Get all candidates from database"""
    try:
        candidates = db.get_all_candidates()
        return JSONResponse(
            status_code=200,
            content={
                "success": True,
                "data": [c.model_dump() for c in candidates]
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/stats")
async def get_candidate_stats():
    """Get candidate statistics"""
    try:
        stats = db.get_stats()
        return JSONResponse(
            status_code=200,
            content={
                "success": True,
                "data": stats.model_dump()
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/search")
async def search_candidates(q: str):
    """Search candidates by name or skills"""
    try:
        if not q:
            raise HTTPException(status_code=400, detail="Query parameter 'q' is required")

        candidates = db.search_candidates(q)
        return JSONResponse(
            status_code=200,
            content={
                "success": True,
                "data": [c.model_dump() for c in candidates]
            }
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{candidate_id}")
async def get_candidate_by_id(candidate_id: str):
    """Get candidate by ID"""
    try:
        candidate = db.get_candidate_by_id(candidate_id)

        if not candidate:
            raise HTTPException(status_code=404, detail="Candidate not found")

        return JSONResponse(
            status_code=200,
            content={
                "success": True,
                "data": candidate.model_dump()
            }
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/{candidate_id}")
async def delete_candidate(candidate_id: str):
    """Delete candidate by ID"""
    try:
        success = db.delete_candidate(candidate_id)

        if not success:
            raise HTTPException(status_code=404, detail="Candidate not found")

        return JSONResponse(
            status_code=200,
            content={
                "success": True,
                "message": "Candidate deleted successfully"
            }
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
