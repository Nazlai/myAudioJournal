import { useState, useEffect } from "react";
import * as LOAD_STATE from "constants/upload";

const useUpload = (upload, file) => {
  const [loadState, setLoadState] = useState(LOAD_STATE.IDLE);
  const [url, setUrl] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    if (file) {
      const uploadTask = upload.child(file.name).put(file);

      uploadTask.on(
        "state_change",
        () => {
          setLoadState(LOAD_STATE.RUNNING);
        },
        (error) => {
          setError(error);
          setLoadState(LOAD_STATE.ERROR);
        },
        () => {
          setLoadState(LOAD_STATE.FINISHED);
          const { fullPath, name } = uploadTask.snapshot.ref;
          setUrl({ fullPath, name });
        }
      );
    }
  }, [file]);

  return { loadState, url, error };
};

export default useUpload;
