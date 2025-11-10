/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

/**
 * Validate file type for resume upload
 */
export const isValidResumeFile = (file: File): boolean => {
  const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  const validExtensions = ['.pdf', '.docx'];

  const hasValidType = validTypes.includes(file.type);
  const hasValidExtension = validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));

  return hasValidType || hasValidExtension;
};

/**
 * Validate file size (max 5MB)
 */
export const isValidFileSize = (file: File, maxSizeMB: number = 5): boolean => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
};

/**
 * Validate job description
 */
export const validateJobDescription = (jd: any): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!jd.title || jd.title.trim().length === 0) {
    errors.push('Job title is required');
  }

  if (!jd.description || jd.description.trim().length < 50) {
    errors.push('Job description must be at least 50 characters');
  }

  if (!jd.skills || jd.skills.length === 0) {
    errors.push('At least one skill is required');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};
