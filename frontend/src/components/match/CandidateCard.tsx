import React from 'react';
import { MatchResult } from '@/types/job.types';
import { formatMatchScore } from '@/utils/formatters';
import { Mail, MapPin, Briefcase, TrendingUp, CheckCircle, XCircle } from 'lucide-react';
import Card from '../common/Card';

interface CandidateCardProps {
  matchResult: MatchResult;
  onClick?: () => void;
}

/**
 * Candidate card with match score
 */
const CandidateCard: React.FC<CandidateCardProps> = ({ matchResult, onClick }) => {
  const { candidate, matchScore, matchedSkills, missingSkills } = matchResult;

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 0.6) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 0.8) return 'Excellent Match';
    if (score >= 0.6) return 'Good Match';
    return 'Moderate Match';
  };

  return (
    <Card hoverable onClick={onClick} className="cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-dark-900 mb-1">{candidate.name}</h3>
          <div className="space-y-1">
            {candidate.email && (
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="h-4 w-4 mr-2" />
                {candidate.email}
              </div>
            )}
            {candidate.location && (
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                {candidate.location}
              </div>
            )}
          </div>
        </div>

        {/* Match Score Badge */}
        <div className={`px-4 py-2 rounded-lg border-2 ${getScoreColor(matchScore)}`}>
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <div className="text-center">
              <div className="text-2xl font-bold">{formatMatchScore(matchScore)}</div>
              <div className="text-xs font-medium">{getScoreLabel(matchScore)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Experience Summary */}
      {candidate.experience && candidate.experience.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <Briefcase className="h-4 w-4 mr-2" />
            <span className="font-medium">Recent Experience</span>
          </div>
          <div className="pl-6">
            <p className="text-sm font-semibold text-dark-900">
              {candidate.experience[0].position}
            </p>
            <p className="text-sm text-gray-600">
              {candidate.experience[0].company} • {candidate.experience[0].duration}
            </p>
          </div>
        </div>
      )}

      {/* Matched Skills */}
      {matchedSkills.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center text-sm font-medium text-green-600 mb-2">
            <CheckCircle className="h-4 w-4 mr-2" />
            Matched Skills ({matchedSkills.length})
          </div>
          <div className="flex flex-wrap gap-2">
            {matchedSkills.slice(0, 6).map((skill, index) => (
              <span key={index} className="badge bg-green-100 text-green-700">
                {skill}
              </span>
            ))}
            {matchedSkills.length > 6 && (
              <span className="badge bg-gray-100 text-gray-700">
                +{matchedSkills.length - 6} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Missing Skills */}
      {missingSkills.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center text-sm font-medium text-red-600 mb-2">
            <XCircle className="h-4 w-4 mr-2" />
            Missing Skills ({missingSkills.length})
          </div>
          <div className="flex flex-wrap gap-2">
            {missingSkills.slice(0, 6).map((skill, index) => (
              <span key={index} className="badge bg-red-100 text-red-700">
                {skill}
              </span>
            ))}
            {missingSkills.length > 6 && (
              <span className="badge bg-gray-100 text-gray-700">
                +{missingSkills.length - 6} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* AI Reasoning */}
      {matchResult.reasoning && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-700 italic">{matchResult.reasoning}</p>
        </div>
      )}
    </Card>
  );
};

export default CandidateCard;
