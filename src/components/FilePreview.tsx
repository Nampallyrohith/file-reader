import { useEffect, useState } from "react";
import { FileType, useFileContext } from "../context/FileContext";

const FilePreview = () => {
  const [prevImage, setPrevImage] = useState<string | undefined>();
  const [fileContent, setFileContent] = useState<string | undefined>();
  const { fileDetails, currentFileId } = useFileContext();

  useEffect(() => {
    const currentFile = fileDetails.find(
      (file: FileType) => file.id === currentFileId
    );
    if (currentFile) {
      const file = currentFile.file;
      const fileType = currentFile.fileName.split(".").pop()?.toLowerCase();

      if (
        fileType === "jpg" ||
        fileType === "jpeg" ||
        fileType === "png" ||
        fileType === "gif" ||
        fileType === "bmp"
      ) {
        setPrevImage(file);
        setFileContent(undefined);
      } else if (fileType === "txt") {
        setFileContent(file);
        setPrevImage(undefined);
      } else {
        setPrevImage(undefined);
        setFileContent(undefined);
      }
    }
  }, [fileDetails, currentFileId]);

  return (
    <div className={`w-full lg:w-3/4  border border-gray-500 rounded-lg p-3 ${fileContent && "overflow-auto h-[600px]"} `}>
      <div className="w-full mx-auto ">
        {prevImage && <img src={prevImage} alt="File Preview" className="w-full h-full" />}
        {fileContent && (
          <div className="file-content">
            <pre className="text-left">{fileContent}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilePreview;
