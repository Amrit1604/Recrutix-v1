import React, { useState } from 'react';
import { Target } from 'lucide-react';
import JobDescriptionInput from '../components/match/JobDescriptionInput';
import CandidateCard from '../components/match/CandidateCard';
import Loader from '../components/common/Loader';
import { JobDescription, MatchResult } from '../types/job.types';
import matchService from '../services/match.service';

/**
 * Match Page - AI-powered candidate matching
 */
const MatchPage: React.FC = () => {
  const [isMatching, setIsMatching] = useState(false);
  const [matchResults, setMatchResults] = useState<MatchResult[]>([]);
  const [error, setError] = useState<string>('');

  const handleJobDescriptionSubmit = async (jd: JobDescription) => {
    setIsMatching(true);
    setError('');
    setMatchResults([]);

    try {
      const results = await matchService.matchCandidates({
        jobDescription: jd,
        topN: 10,
      });

      setMatchResults(results);

      if (results.length === 0) {
        setError('No candidates found matching this job description. Try uploading more resumes first.');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to match candidates. Please try again.');
    } finally {
      setIsMatching(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
          <Target className="h-8 w-8 text-primary-600" />
        </div>
        <h1 className="text-4xl font-bold text-dark-900 mb-4">AI Candidate Matching</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Input your job description and let our AI find the best candidates from your database.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Job Description Input - Left Sidebar */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-card p-6 sticky top-20">
            <JobDescriptionInput
              onSubmit={handleJobDescriptionSubmit}
              isLoading={isMatching}
            />
          </div>
        </div>

        {/* Match Results - Main Content */}
        <div className="lg:col-span-3">
          {isMatching && (
            <Loader text="Analyzing candidates and calculating match scores..." />
          )}

          {error && (
            <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 font-medium">{error}</p>
            </div>
          )}

          {matchResults.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-dark-900">
                  Top Matches ({matchResults.length})
                </h2>
                <div className="text-sm text-gray-600">
                  Sorted by match score
                </div>
              </div>

              {matchResults.map((result, index) => (
                <div key={result.candidate.id} className="relative">
                  <div className="absolute -left-4 top-4 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <CandidateCard matchResult={result} />
                </div>
              ))}
            </div>
          )}

          {!isMatching && matchResults.length === 0 && !error && (
            <div className="text-center py-16 bg-white rounded-xl shadow-card">
              <Target className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Results Yet
              </h3>
              <p className="text-gray-600">
                Fill out the job description form to find matching candidates.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchPage;
