import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X } from 'lucide-react';
import { isValidResumeFile, isValidFileSize } from '@/utils/validators';
import { formatFileSize } from '@/utils/formatters';

interface DragDropZoneProps {
  onFileSelect: (file: File) => void;
}

/**
 * Drag and drop zone for resume uploads
 */
const DragDropZone: React.FC<DragDropZoneProps> = ({ onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError('');

    if (acceptedFiles.length === 0) {
      setError('No file selected');
      return;
    }

    const file = acceptedFiles[0];

    if (!isValidResumeFile(file)) {
      setError('Please upload a PDF or DOCX file');
      return;
    }

    if (!isValidFileSize(file)) {
      setError('File size must be less than 5MB');
      return;
    }

    setSelectedFile(file);
    onFileSelect(file);
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
    multiple: false,
  });

  const removeFile = () => {
    setSelectedFile(null);
    setError('');
  };

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-xl p-12 text-center cursor-pointer
          transition-all duration-300
          ${isDragActive
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
          }
          ${error ? 'border-red-500 bg-red-50' : ''}
        `}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center">
          <div className={`
            p-4 rounded-full mb-4
            ${isDragActive ? 'bg-primary-100' : 'bg-gray-100'}
          `}>
            <Upload className={`h-12 w-12 ${isDragActive ? 'text-primary-500' : 'text-gray-400'}`} />
          </div>

          <h3 className="text-lg font-semibold text-dark-900 mb-2">
            {isDragActive ? 'Drop your resume here' : 'Upload Resume'}
          </h3>

          <p className="text-gray-600 mb-4">
            Drag & drop or click to browse
          </p>

          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span className="badge bg-gray-100 text-gray-700">PDF</span>
            <span className="badge bg-gray-100 text-gray-700">DOCX</span>
            <span className="text-gray-400">•</span>
            <span>Max 5MB</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600 font-medium">{error}</p>
        </div>
      )}

      {selectedFile && !error && (
        <div className="mt-4 p-4 bg-primary-50 border border-primary-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="h-8 w-8 text-primary-500" />
              <div>
                <p className="font-medium text-dark-900">{selectedFile.name}</p>
                <p className="text-sm text-gray-600">{formatFileSize(selectedFile.size)}</p>
              </div>
            </div>
            <button
              onClick={removeFile}
              className="p-2 hover:bg-red-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-red-500" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DragDropZone;
