import { useFileContext } from "../context/FileContext";
import { v4 as uuidv4 } from "uuid";

const UploadFile = () => {
  const { updateFileDetails, handleCurrentFileId } = useFileContext();

  const handleFileUpload = (selectedFile: File) => {
    const reader = new FileReader();
    const fileId = uuidv4();

    reader.onload = () => {
      const result = reader.result as string;

      updateFileDetails({
        id: fileId,
        file: result,
        fileName: selectedFile.name,
        fileType: selectedFile.type
      });
      handleCurrentFileId(fileId);
    };

    if (selectedFile.type.startsWith("image")) {
      reader.readAsDataURL(selectedFile);
    } else if (selectedFile.type === "text/plain") {
      reader.readAsText(selectedFile);
    } else {
      console.log("Unsupported file type:", selectedFile.type);
    }
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileUpload(selectedFile);
    }
  };

  return (
    <div className="w-full max-w-[1000px] mx-auto space-y-7">
      <h1 className="font-poppins text-xl md:text-3xl font-semibold">
        Upload File
      </h1>
      <input type="file" accept="*" onChange={handleChangeImage} />
    </div>
  );
};

export default UploadFile;
