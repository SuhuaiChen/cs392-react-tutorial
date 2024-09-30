import { useState } from "react";
import Course from "./Course";
import TermSelector from "./TermSelector";

const CourseList = ({ courses }) => {
  const [term, setTerm] = useState("Fall");
  const [selected, setSelected] = useState([]);
  const termCourses = Object.values(courses).filter(
    (course) => course.term === term
  );
  return (
    <>
      <TermSelector term={term} setTerm={setTerm} />
      <div className="course-list">
        {Object.values(termCourses).map((course) => (
          <Course
            key={`${course.term}${course.number}`}
            course={course}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </div>
    </>
  );
};

export default CourseList;