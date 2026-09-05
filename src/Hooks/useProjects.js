import { useEffect, useState } from "react";
import axios from "axios";

const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let timer;
    setLoading(true);

    axios
      .get("/projectsData.json")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setProjects(res.data);
        } else {
          setProjects([]);
        }
      })
      .catch((err) => setError(err))
      .finally(() => {
        timer = setTimeout(() => setLoading(false), 300);
      });

    return () => clearTimeout(timer);
  }, []);

  return { projects, loading, error };
};

export default useProjects;
