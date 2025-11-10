from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from app.config import settings
from app.routes import upload, candidates, matching

# Create FastAPI app
app = FastAPI(
    title="HireMind API",
    description="AI-powered recruitment system backend",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ensure upload directory exists
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
os.makedirs("data", exist_ok=True)

# Include routers
app.include_router(upload.router, prefix="/api", tags=["Upload"])
app.include_router(candidates.router, prefix="/api/candidates", tags=["Candidates"])
app.include_router(matching.router, prefix="/api/match", tags=["Matching"])


@app.get("/")
def read_root():
    """Root endpoint"""
    return {
        "message": "Welcome to Recrutix API - The Future of Recruitment",
        "version": "2.0.0",
        "docs": "/docs",
        "status": "operational"
    }


@app.get("/api/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "environment": settings.ENV}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app.main:app",
        host=settings.API_HOST,
        port=settings.API_PORT,
        reload=settings.DEBUG,
    )
