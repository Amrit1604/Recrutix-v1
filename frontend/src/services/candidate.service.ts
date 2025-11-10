import apiService from './api.service';
import { Candidate, CandidateStats } from '@types/candidate.types';
import { UploadResponse } from '@types/api.types';

/**
 * Candidate service - handles all candidate-related API calls
 */
class CandidateService {
  private readonly BASE_URL = '/api/candidates';

  /**
   * Upload resume file and extract candidate information
   */
  async uploadResume(file: File): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiService.uploadFile<UploadResponse>(
      '/api/upload',
      formData
    );
    return response.data!;
  }

  /**
   * Get all candidates
   */
  async getAllCandidates(): Promise<Candidate[]> {
    const response = await apiService.get<Candidate[]>(this.BASE_URL);
    return response.data || [];
  }

  /**
   * Get candidate by ID
   */
  async getCandidateById(id: string): Promise<Candidate> {
    const response = await apiService.get<Candidate>(`${this.BASE_URL}/${id}`);
    return response.data!;
  }

  /**
   * Delete candidate by ID
   */
  async deleteCandidate(id: string): Promise<void> {
    await apiService.delete(`${this.BASE_URL}/${id}`);
  }

  /**
   * Get candidate statistics
   */
  async getCandidateStats(): Promise<CandidateStats> {
    const response = await apiService.get<CandidateStats>(`${this.BASE_URL}/stats`);
    return response.data!;
  }

  /**
   * Search candidates by skills or name
   */
  async searchCandidates(query: string): Promise<Candidate[]> {
    const response = await apiService.get<Candidate[]>(`${this.BASE_URL}/search`, {
      q: query,
    });
    return response.data || [];
  }
}

export default new CandidateService();
