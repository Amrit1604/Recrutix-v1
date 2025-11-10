import os
from typing import Optional


def ensure_dir_exists(dir_path: str) -> None:
    """Ensure directory exists, create if not"""
    os.makedirs(dir_path, exist_ok=True)


def get_file_extension(filename: str) -> str:
    """Get file extension"""
    return os.path.splitext(filename)[1].lower()


def is_valid_resume_file(filename: str) -> bool:
    """Check if file is a valid resume format"""
    valid_extensions = ['.pdf', '.docx']
    return get_file_extension(filename) in valid_extensions


def sanitize_filename(filename: str) -> str:
    """Sanitize filename to prevent path traversal"""
    # Remove any directory path
    filename = os.path.basename(filename)

    # Remove any potentially dangerous characters
    dangerous_chars = ['..', '/', '\\', '\0']
    for char in dangerous_chars:
        filename = filename.replace(char, '')

    return filename
