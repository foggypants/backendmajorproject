import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const role = localStorage.getItem("role");

  const loadCourses = async () => {
    const res = await api.get("/courses");
    setCourses(res.data);
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const addCourse = async (e) => {
    e.preventDefault();
    try {
      await api.post("/courses", { title, code, description });
      setTitle("");
      setCode("");
      setDescription("");
      setMessage("");
      loadCourses();
    } catch (err) {
      setMessage(err.response?.data?.message || "Could not add course");
    }
  };

  return (
    <div>
      <h2>Courses</h2>

      {role === "admin" && (
        <form className="box" onSubmit={addCourse}>
          <h3>Add Course</h3>
          <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input placeholder="Code" value={code} onChange={(e) => setCode(e.target.value)} />
          <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <button type="submit">Add</button>
          <p className="message">{message}</p>
        </form>
      )}

      {courses.map((c) => (
        <div className="card" key={c._id}>
          <h3>{c.title} ({c.code})</h3>
          <p>{c.description}</p>
          <Link to={"/course/" + c._id}>View Details</Link>
        </div>
      ))}
    </div>
  );
}

export default Courses;
