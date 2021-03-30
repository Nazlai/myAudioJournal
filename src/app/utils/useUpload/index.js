import { useState, useEffect } from "react";
import * as LOAD_STATE from "constants/upload";
import { parseStorageError as parseError } from "utils";

const useUpload = ({ uploadTask, file }) => {
  const [loadState, setLoadState] = useState(LOAD_STATE.IDLE);
  const [url, setUrl] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    if (file) {
      setError(null);
      const task = uploadTask.child(file.name).put(file);

      task.on(
        "state_change",
        () => {
          setLoadState(LOAD_STATE.RUNNING);
        },
        (error) => {
          console.log({ error });
          const message = parseError(error);
          setError({ message });
          setLoadState(LOAD_STATE.ERROR);
        },
        () => {
          setLoadState(LOAD_STATE.FINISHED);
          const { name } = task.snapshot.ref;

          task.snapshot.ref
            .getDownloadURL()
            .then((downloadUrl) => setUrl({ fullPath: downloadUrl, name }));
        }
      );
    }
  }, [file]);

  return { loadState, url, error };
};

export default useUpload;
