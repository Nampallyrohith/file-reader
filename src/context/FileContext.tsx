import React, { createContext, ReactNode, useContext, useState } from "react";

export interface FileType {
  id: string;
  fileName: string;
  file: string;
  fileType: string
}

interface FileTypeDetails {
  fileDetails: FileType[];
  currentFileId: string;
  updateFileDetails: (data: FileType) => void;
  handleCurrentFileId: (id: string) => void;
}

const FileContext = createContext<FileTypeDetails | undefined>(undefined);

const FileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentFileId, setCurrentFileId] = useState<string>("");
  const [fileDetails, setFileDetails] = useState<FileType[]>([]);

  const updateFileDetails = (data: FileType) => {
    setFileDetails((prevFiles) => {
      const fileIndex = prevFiles.findIndex((file) => file.id === data.id);
      if (fileIndex !== -1) {
        // Update existing file
        const updatedFiles = [...prevFiles];
        updatedFiles[fileIndex] = { ...updatedFiles[fileIndex], ...data };
        return updatedFiles;
      } else {
        // Add new file
        return [...prevFiles, data];
      }
    });
  };

  const handleCurrentFileId = (id: string) => {
    setCurrentFileId(id);
  };

  return (
    <FileContext.Provider
      value={{
        updateFileDetails,
        handleCurrentFileId,
        currentFileId,
        fileDetails,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};

export default FileProvider;

export const useFileContext = () => {
  const context = useContext(FileContext);
  if (context === undefined) {
    throw new Error("useFileContext must be used within a FileProvider");
  }
  return context;
};
