import React, { useState } from 'react';
import { Upload, CheckCircle } from 'lucide-react';
import DragDropZone from '../components/upload/DragDropZone';
import ExtractedPreview from '../components/upload/ExtractedPreview';
import Loader from '../components/common/Loader';
import Button from '../components/common/Button';
import candidateService from '../services/candidate.service';
import { Candidate } from '../types/candidate.types';

/**
 * Upload Page - Resume upload and extraction
 */
const UploadPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [extractedCandidate, setExtractedCandidate] = useState<Candidate | null>(null);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState(false);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setExtractedCandidate(null);
    setError('');
    setSuccess(false);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setError('');

    try {
      const response = await candidateService.uploadResume(selectedFile);
      setExtractedCandidate(response.candidate);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to upload resume. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setExtractedCandidate(null);
    setError('');
    setSuccess(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
          <Upload className="h-8 w-8 text-primary-600" />
        </div>
        <h1 className="text-4xl font-bold text-dark-900 mb-4">Upload Resume</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Upload a candidate's resume and let our AI extract all relevant information automatically.
        </p>
      </div>

      {/* Upload Section */}
      {!extractedCandidate && (
        <div className="max-w-3xl mx-auto">
          <DragDropZone onFileSelect={handleFileSelect} />

          {selectedFile && (
            <div className="mt-6 flex justify-center">
              <Button
                variant="primary"
                size="lg"
                onClick={handleUpload}
                isLoading={isUploading}
              >
                Extract Information
              </Button>
            </div>
          )}

          {isUploading && (
            <div className="mt-8">
              <Loader text="Analyzing resume and extracting information..." />
            </div>
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 font-medium">{error}</p>
            </div>
          )}
        </div>
      )}

      {/* Success and Preview Section */}
      {extractedCandidate && success && (
        <div className="space-y-6">
          {/* Success Message */}
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-green-900">
                  Resume Processed Successfully!
                </h3>
                <p className="text-sm text-green-700">
                  Candidate information has been extracted and saved.
                </p>
              </div>
              <Button variant="secondary" onClick={handleReset}>
                Upload Another
              </Button>
            </div>
          </div>

          {/* Extracted Information Preview */}
          <div>
            <h2 className="text-2xl font-bold text-dark-900 mb-4">Extracted Information</h2>
            <ExtractedPreview candidate={extractedCandidate} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadPage;
