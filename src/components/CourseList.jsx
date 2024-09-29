import { useState } from "react";

const terms = ["Fall", "Winter", "Spring"];

const TermSelector = ({ term, setTerm }) => (
  <div className="btn-group">
    {terms.map((value) => (
      <TermButton
        key={value}
        term={value}
        setTerm={setTerm}
        checked={value === term}
      />
    ))}
  </div>
);

const TermButton = ({ term, setTerm, checked }) => (
  <>
    <input
      type="radio"
      id={term}
      className="btn-check"
      autoComplete="off"
      checked={checked}
      onChange={() => setTerm(term)}
    />
    <label className="btn btn-success m-1 p-2" htmlFor={term}>
      {term}
    </label>
  </>
);

const days = ["M", "Tu", "W", "Th", "F"];

const daysOverlap = (days1, days2) =>
  days.some((day) => days1.includes(day) && days2.includes(day));

const hoursOverlap = (hours1, hours2) =>
  Math.max(hours1.start, hours2.start) < Math.min(hours1.end, hours2.end);

const timeConflict = (course1, course2) =>
  daysOverlap(course1.days, course2.days) &&
  hoursOverlap(course1.hours, course2.hours);

const courseConflict = (course1, course2) =>
  course1.term === course2.term && timeConflict(course1, course2);

const hasConflict = (course, selected) =>
  selected.some((x) => courseConflict(x, course));

const Course = ({ course, selected, setSelected }) => {
  const toggle = (x, lst) =>
    lst.includes(x) ? lst.filter((y) => y !== x) : [x, ...lst];
  const isSelected = selected.includes(course);
  const isDisabled = !isSelected && hasConflict(course, selected);
  const style = {
    backgroundColor: isDisabled
      ? "lightgrey"
      : isSelected
      ? "lightgreen"
      : "white",
  };
  return (
    <div
      className="card m-2 p-2"
      style={style}
      onClick={isDisabled ? null : () => setSelected(toggle(course, selected))}
    >
      <div className="card-body d-flex flex-column">
        <h5 className="card-title mb-3">
          {course.term} CS {course.number}
        </h5>
        <div className="card-text">{course.title}</div>
        <div className="mt-auto">
          <hr />
          <div>{course.meets}</div>
        </div>
      </div>
    </div>
  );
};

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