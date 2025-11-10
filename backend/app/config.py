from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    """Application settings"""

    # Environment
    ENV: str = "development"

    # API Configuration
    API_HOST: str = "0.0.0.0"
    API_PORT: int = 8000
    DEBUG: bool = True

    # CORS - Allow all origins for production deployment
    CORS_ORIGINS: List[str] = ["*"]

    # OpenAI
    OPENAI_API_KEY: str = ""
    OPENAI_MODEL: str = "gpt-4o-mini"

    # HuggingFace
    HF_TOKEN: str = ""

    # Database
    DATABASE_URL: str = "postgresql://user:password@localhost:5432/hiremind"

    # File Upload
    MAX_UPLOAD_SIZE: int = 5242880  # 5MB
    UPLOAD_DIR: str = "uploads"

    # Mock Database
    MOCK_DB_PATH: str = "data/candidates.json"

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
