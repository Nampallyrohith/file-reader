import FileLists from "./components/FileLists";
import FilePreview from "./components/FilePreview";
import UploadFile from "./components/UploadFile";
import FileProvider from "./context/FileContext";

function App() {
  return (
    <FileProvider>
      <div className="w-full h-full p-10 text-center bg-gray-200 bg-cover">
        <UploadFile />
        <hr />
        <div className="flex justify-between gap-5 w-full my-10">
          <FileLists />
          <hr className="h-[600px] border-2 border-gray-500" />
          <FilePreview />
        </div>
      </div>
    </FileProvider>
  );
}

export default App;
