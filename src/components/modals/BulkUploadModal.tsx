import { useState, useRef } from 'react';
import { Upload, X, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { toast } from 'sonner';

interface BulkUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BulkUploadModal({ isOpen, onClose }: BulkUploadModalProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(selectedFiles);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      setFiles(droppedFiles);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error('No files selected', {
        description: 'Please select files to upload'
      });
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate upload
    setTimeout(() => {
      setUploading(false);
      toast.success('Upload Successful', {
        description: `${files.length} document${files.length > 1 ? 's' : ''} uploaded successfully`
      });
      setFiles([]);
      setUploadProgress(0);
      onClose();
    }, 2500);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Bulk Upload Documents</DialogTitle>
          <DialogDescription>
            Upload multiple documents at once. Supported formats: PDF, JPG, PNG, DOC, DOCX
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Drop Zone */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer"
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" strokeWidth={1.5} />
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">
              PDF, JPG, PNG, DOC, DOCX (Max 10MB per file)
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* File List */}
          {files.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-700">
                  Selected Files ({files.length})
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setFiles([])}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  Clear All
                </Button>
              </div>
              <div className="max-h-60 overflow-y-auto space-y-2 border border-gray-200 rounded-lg p-3">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="p-2 bg-white rounded-lg border border-gray-200">
                        <FileText className="w-5 h-5 text-blue-600" strokeWidth={1.5} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="p-1 hover:bg-red-100 rounded-lg transition-colors ml-2"
                      disabled={uploading}
                    >
                      <X className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload Progress */}
          {uploading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Uploading documents...</span>
                <span className="font-semibold text-gray-900">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-200">
            <div className="text-xs text-gray-500">
              {files.length > 0 && `${files.length} file${files.length > 1 ? 's' : ''} ready to upload`}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={onClose}
                disabled={uploading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpload}
                disabled={files.length === 0 || uploading}
                className="bg-green-600 hover:bg-green-700"
              >
                <Upload className="w-4 h-4 mr-2" />
                {uploading ? 'Uploading...' : 'Upload Files'}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
