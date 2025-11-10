import React, { useState } from 'react';
import { JobDescription } from '@/types/job.types';
import Input from '../common/Input';
import Button from '../common/Button';
import { FileText, Plus, X } from 'lucide-react';

interface JobDescriptionInputProps {
  onSubmit: (jd: JobDescription) => void;
  isLoading?: boolean;
}

/**
 * Job description input form
 */
const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<JobDescription>({
    title: '',
    company: '',
    description: '',
    requirements: [],
    skills: [],
    experience: '',
    location: '',
  });

  const [skillInput, setSkillInput] = useState('');
  const [requirementInput, setRequirementInput] = useState('');

  const handleChange = (field: keyof JobDescription, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    if (skillInput.trim()) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const addRequirement = () => {
    if (requirementInput.trim()) {
      setFormData(prev => ({
        ...prev,
        requirements: [...prev.requirements, requirementInput.trim()]
      }));
      setRequirementInput('');
    }
  };

  const removeRequirement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <FileText className="h-6 w-6 text-primary-500" />
        <h2 className="text-2xl font-bold text-dark-900">Job Description</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Job Title *"
          placeholder="e.g. Senior Full Stack Developer"
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          required
        />

        <Input
          label="Company"
          placeholder="e.g. TechCorp Inc"
          value={formData.company}
          onChange={(e) => handleChange('company', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-dark-800 mb-2">
          Job Description *
        </label>
        <textarea
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 transition-all duration-200 outline-none"
          rows={6}
          placeholder="Describe the role, responsibilities, and expectations..."
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Experience Required"
          placeholder="e.g. 3-5 years"
          value={formData.experience}
          onChange={(e) => handleChange('experience', e.target.value)}
        />

        <Input
          label="Location"
          placeholder="e.g. Remote, San Francisco, etc."
          value={formData.location}
          onChange={(e) => handleChange('location', e.target.value)}
        />
      </div>

      {/* Skills */}
      <div>
        <label className="block text-sm font-medium text-dark-800 mb-2">
          Required Skills *
        </label>
        <div className="flex space-x-2 mb-3">
          <Input
            placeholder="Add a skill (e.g. React, Python)"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
          />
          <Button type="button" onClick={addSkill} size="md">
            <Plus className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.skills.map((skill, index) => (
            <span key={index} className="inline-flex items-center badge-primary">
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="ml-2 hover:text-primary-900"
              >
                <X className="h-4 w-4" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Requirements */}
      <div>
        <label className="block text-sm font-medium text-dark-800 mb-2">
          Requirements (Optional)
        </label>
        <div className="flex space-x-2 mb-3">
          <Input
            placeholder="Add a requirement"
            value={requirementInput}
            onChange={(e) => setRequirementInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
          />
          <Button type="button" onClick={addRequirement} size="md">
            <Plus className="h-5 w-5" />
          </Button>
        </div>
        <ul className="space-y-2">
          {formData.requirements.map((req, index) => (
            <li key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
              <span className="flex-1 text-sm text-gray-700">{req}</span>
              <button
                type="button"
                onClick={() => removeRequirement(index)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isLoading}
        className="w-full"
        disabled={!formData.title || !formData.description || formData.skills.length === 0}
      >
        Find Best Matches
      </Button>
    </form>
  );
};

export default JobDescriptionInput;
