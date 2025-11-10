from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
import os
import shutil
from app.services.resume_parser import resume_parser
from app.database.mock_db import db
from app.config import settings

router = APIRouter()


@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):
    """
    Upload and parse resume

    Accepts PDF or DOCX files, extracts candidate information,
    and stores in database
    """

    # Validate file type
    if not file.filename.endswith(('.pdf', '.docx')):
        raise HTTPException(
            status_code=400,
            detail="Invalid file type. Only PDF and DOCX files are allowed."
        )

    # Validate file size
    file_content = await file.read()
    if len(file_content) > settings.MAX_UPLOAD_SIZE:
        raise HTTPException(
            status_code=400,
            detail=f"File too large. Maximum size is {settings.MAX_UPLOAD_SIZE / (1024*1024)}MB."
        )

    # Save file temporarily
    file_path = os.path.join(settings.UPLOAD_DIR, file.filename)

    try:
        with open(file_path, 'wb') as f:
            f.write(file_content)

        # Parse resume
        candidate = resume_parser.parse_resume(file_path, file.filename)

        # Store in database
        db.add_candidate(candidate)

        return JSONResponse(
            status_code=200,
            content={
                "success": True,
                "data": {
                    "candidateId": candidate.id,
                    "candidate": candidate.model_dump(),
                    "message": "Resume uploaded and parsed successfully"
                }
            }
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing resume: {str(e)}"
        )

    finally:
        # Clean up uploaded file
        if os.path.exists(file_path):
            os.remove(file_path)
