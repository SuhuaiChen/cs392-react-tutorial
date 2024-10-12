import { useState } from "react";
import Course from "./Course";
import TermSelector from "./TermSelector";
import InfoModal from "./InfoModal";
import AuthButton from "./AuthButton";

const CourseList = ({ courses, user }) => {
  const [term, setTerm] = useState("Fall");
  const [selected, setSelected] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const termCourses = Object.values(courses).filter(
    (course) => course.term === term
  )
  const selectedTermCourses = selected.filter((course) => course.term === term).sort((course1, course2) => course1.number < course2.number?-1:1);;
  return (
    <>
      <div className="course-container border border-3 p-3">
        <div className="d-flex mb-3 pr-20">
          <TermSelector term={term} setTerm={setTerm} />
            <div className="ms-auto d-flex flex-column gap-2">
            <AuthButton user={user} />
            <button
              type="button"
              className="btn btn-info btn-light border border-2"
              onClick={() => setShowInfo(true)}
            >
              Info
            </button>
            </div>
        </div>
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
      </div>
      <InfoModal
        open={showInfo}
        close={() => setShowInfo(false)}
        title={`Number of courses selected in ${term}: ${selectedTermCourses.length} `}
      >
        {selectedTermCourses.length === 0 ? (
          <p className="alert alert-primary fw-bold">No course selected. Please click on a course card.</p>
        ) : (
          <ul className="list-group list-group-flush">
            {selectedTermCourses.map((course) => (
              <li key={`info-${course.term}${course.number}`} className="list-group-item">
                <strong>CS{course.number}</strong> {course.title}
              </li>
            ))}
          </ul>
        )}
      </InfoModal>
    </>
  );
};

export default CourseList;
