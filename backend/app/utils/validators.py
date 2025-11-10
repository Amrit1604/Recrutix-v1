import re
from typing import Optional


def validate_email(email: str) -> bool:
    """Validate email format"""
    email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(email_pattern, email))


def validate_phone(phone: str) -> bool:
    """Validate phone number format"""
    # Remove common separators
    cleaned = re.sub(r'[\s\-\(\)\.]', '', phone)
    # Check if it's all digits and has reasonable length
    return cleaned.isdigit() and 10 <= len(cleaned) <= 15


def validate_file_size(file_size: int, max_size_mb: int = 5) -> bool:
    """Validate file size"""
    max_bytes = max_size_mb * 1024 * 1024
    return file_size <= max_bytes
