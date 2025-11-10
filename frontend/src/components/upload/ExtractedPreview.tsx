import React from 'react';
import { Candidate } from '@/types/candidate.types';
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Code } from 'lucide-react';
import Card from '../common/Card';

interface ExtractedPreviewProps {
  candidate: Candidate;
}

/**
 * Preview of extracted candidate information
 */
const ExtractedPreview: React.FC<ExtractedPreviewProps> = ({ candidate }) => {
  return (
    <Card className="animate-slide-up">
      <div className="space-y-6">
        {/* Header */}
        <div className="border-b border-gray-200 pb-4">
          <h2 className="text-2xl font-bold text-dark-900">{candidate.name}</h2>
          <div className="mt-2 space-y-1">
            {candidate.email && (
              <div className="flex items-center text-gray-600">
                <Mail className="h-4 w-4 mr-2" />
                <span className="text-sm">{candidate.email}</span>
              </div>
            )}
            {candidate.phone && (
              <div className="flex items-center text-gray-600">
                <Phone className="h-4 w-4 mr-2" />
                <span className="text-sm">{candidate.phone}</span>
              </div>
            )}
            {candidate.location && (
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="text-sm">{candidate.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        {candidate.summary && (
          <div>
            <h3 className="text-lg font-semibold text-dark-900 mb-2">Summary</h3>
            <p className="text-gray-700 leading-relaxed">{candidate.summary}</p>
          </div>
        )}

        {/* Skills */}
        {candidate.skills && candidate.skills.length > 0 && (
          <div>
            <div className="flex items-center mb-3">
              <Code className="h-5 w-5 mr-2 text-primary-500" />
              <h3 className="text-lg font-semibold text-dark-900">Skills</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {candidate.skills.map((skill, index) => (
                <span key={index} className="badge-primary">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {candidate.experience && candidate.experience.length > 0 && (
          <div>
            <div className="flex items-center mb-3">
              <Briefcase className="h-5 w-5 mr-2 text-primary-500" />
              <h3 className="text-lg font-semibold text-dark-900">Experience</h3>
            </div>
            <div className="space-y-4">
              {candidate.experience.map((exp, index) => (
                <div key={index} className="pl-4 border-l-2 border-primary-500">
                  <h4 className="font-semibold text-dark-900">{exp.position}</h4>
                  <p className="text-sm text-gray-600">{exp.company} • {exp.duration}</p>
                  {exp.description && (
                    <p className="text-sm text-gray-700 mt-1">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {candidate.education && candidate.education.length > 0 && (
          <div>
            <div className="flex items-center mb-3">
              <GraduationCap className="h-5 w-5 mr-2 text-primary-500" />
              <h3 className="text-lg font-semibold text-dark-900">Education</h3>
            </div>
            <div className="space-y-3">
              {candidate.education.map((edu, index) => (
                <div key={index} className="pl-4 border-l-2 border-gray-300">
                  <h4 className="font-semibold text-dark-900">{edu.degree}</h4>
                  <p className="text-sm text-gray-600">
                    {edu.institution} • {edu.year}
                  </p>
                  {edu.field && (
                    <p className="text-sm text-gray-700">{edu.field}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ExtractedPreview;
