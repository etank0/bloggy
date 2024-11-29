import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { faCloudUpload, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from "react-hot-toast";

const Dropzone = ({ className, setValue, name }) => {
  const [file, setFile] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const selectedFile = Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        });

        setFile(selectedFile);
        setValue(name, selectedFile, { shouldValidate: true });
      }
    },
    [setValue, name]
  );

  const removeFile = (e) => {
    e.stopPropagation();
    setFile(null);
    setValue(name, null, { shouldValidate: true });
  };

  const onDropRejected = (fileRejections) => {
    fileRejections.forEach((rejection) => {
      toast.error(`File ${rejection.file.name} is not a valid image type.`);
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    maxFiles: 1,
    accept: {
      "image/png": [],
      "image/jpg": [],
      "image/jpeg": [],
      "image/gif": [],
    },
  });

return (
    <div>
      <div {...getRootProps({ className })}>
        <input {...getInputProps()} />
        {!file ? (
          <>
            <div className="h-[3rem] mb-4">
              <FontAwesomeIcon className="h-full" icon={faCloudUpload} />
            </div>
            {isDragActive ? (
              <p>Drop the image here!</p>
            ) : (
              <p>
                Drag and drop the image here, or{" "}
                <span className="text-primary cursor-pointer">Browse</span>
              </p>
            )}
            <p className="mt-2 text-xs text-gray-400">
              Accepted file types: PNG, JPG, JPEG, GIF
            </p>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <img
              src={file.preview}
              alt={file.name}
              className="mb-4 w-32 h-32 object-cover rounded-md"
            />
            <p className="text-sm mb-2">{file.name}</p>
            <button
              type="button"
              onClick={removeFile}
              className="text-red-500 text-sm flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faTrash} />
              Remove File
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropzone;
