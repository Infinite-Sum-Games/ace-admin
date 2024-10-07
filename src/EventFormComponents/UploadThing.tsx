import React, { useCallback, useState } from 'react';
import { useDropzone, DropzoneOptions, Accept } from 'react-dropzone';
import { Upload } from 'lucide-react'; // Import the upload icon

interface UploadThingProps {
  file: string | undefined; // Store file URL as string or undefined
  setFile: (file: string | undefined) => void; // Set file as string or undefined
  maxFileSize?: number; // in MB, made optional for flexibility
  acceptedTypes: string[]; // accepted file types
  maxWidth?: number; // max width in pixels
  maxHeight?: number; // max height in pixels
  minWidth?: number; // min width in pixels
  minHeight?: number; // min height in pixels
}

const UploadThing: React.FC<UploadThingProps> = ({
  file,
  setFile,
  maxFileSize = 10,
  acceptedTypes,
  maxWidth,
  maxHeight,
  minWidth,
  minHeight,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error messages

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const selectedFile = acceptedFiles[0];
      if (selectedFile) {
        const fileSizeMB = selectedFile.size / (1024 * 1024);
        const fileType = selectedFile.type;

        // Reset error message
        setErrorMessage(null);

        // Check file size
        if (fileSizeMB > maxFileSize) {
          setErrorMessage(`File Size Doesn't Match: Add a file size within ${maxFileSize}MB`);
          return;
        }

        // Check file type
        if (!acceptedTypes.includes(fileType)) {
          setErrorMessage(`File Type Doesn't Match: Only accepted file types: ${acceptedTypes.join(', ')}`);
          return;
        }

        // Check dimensions if the file is an image
        if (fileType.startsWith('image/')) {
          const img = new Image();
          img.src = URL.createObjectURL(selectedFile);
          img.onload = () => {
            if (
              (maxWidth && img.width > maxWidth) ||
              (maxHeight && img.height > maxHeight) ||
              (minWidth && img.width < minWidth) ||
              (minHeight && img.height < minHeight)
            ) {
              setErrorMessage(`Dimensions Don't Match: Min dimension: ${minWidth}x${minHeight}, Max dimension: ${maxWidth}x${maxHeight}`);
              return;
            }

            // Create a temporary URL for the uploaded file
            const fileUrl = URL.createObjectURL(selectedFile);
            setFile(fileUrl);
          };
          img.onerror = () => {
            setErrorMessage('Error Loading Image: There was an error loading the image.');
          };
        } else {
          // Create a temporary URL for the uploaded file
          const fileUrl = URL.createObjectURL(selectedFile);
          setFile(fileUrl);
        }
      }
    },
    [maxFileSize, acceptedTypes, setFile, maxWidth, maxHeight, minWidth, minHeight]
  );

  // Convert acceptedTypes array to the appropriate 'Accept' format
  const accept: Accept = acceptedTypes.reduce<Accept>((acc, type) => {
    acc[type] = [];
    return acc;
  }, {});

  const options: DropzoneOptions = {
    onDrop,
    accept,
    maxSize: maxFileSize * 1024 * 1024,
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone(options);

  return (
    <div className="flex flex-col items-center w-full">
      <div
        {...getRootProps()}
        className={`w-full p-5 border-2 border-dashed rounded-lg transition-colors duration-200 ${
          isDragActive
            ? 'border-green-500 bg-gray-800'
            : isDragReject
            ? 'border-red-500 bg-gray-700'
            : 'border-gray-600 bg-gray-900'
        } cursor-pointer`}
      >
        <input {...getInputProps()} />
        <div className="flex items-center justify-center">
          <Upload className="mr-2 h-6 w-6 text-white" /> {/* Upload icon */}
          <p className="text-center text-lg text-white">
            {isDragActive
              ? 'Drop the file here...'
              : 'Drag & drop a file here, or click to select one'}
          </p>
        </div>
      </div>
      {errorMessage && (
        <div className="mt-2 text-red-500">
          <p>{errorMessage}</p>
        </div>
      )}
      {file && (
        <div className="mt-4 text-center">
          <p className="text-white">
            File uploaded: <span className="font-semibold">{file}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default UploadThing;
