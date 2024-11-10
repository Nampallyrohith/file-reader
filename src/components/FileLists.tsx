import { FileType, useFileContext } from "../context/FileContext";
import txtImg from "../assets/txt.png";

const FileLists = () => {
  const { fileDetails } = useFileContext();
  return (
    <div className="w-full lg:w-1/2 mx-auto">
      <ul className="flex flex-wrap items-center gap-3">
        {fileDetails.map((file: FileType) => (
          <li key={file.id}>
            <div className="border border-gray-500 rounded-lg ">
              <img
                src={file.fileType === "text/plain" ? txtImg : file.file}
                alt={file.fileName} className="w-[120px] object-contain mx-auto h-[100px]"
              />
              <p className="text-sm text-white font-poppins tracking-wider truncate bg-gray-500 p-2">{file.fileName}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileLists;
