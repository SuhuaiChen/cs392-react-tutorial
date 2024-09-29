import { useState } from "react";

const terms = [ 'Fall', 'Winter', 'Spring' ]

const TermSelector = ({term, setTerm}) => (
  <div className="btn-group">
  { 
    terms.map(value => <TermButton key={value} term={value} setTerm={setTerm} checked={value === term}/>)
  }
  </div>
);

const TermButton = ({term,setTerm,checked}) => (
  <>
    <input type="radio" id={term} className="btn-check" autoComplete="off" checked={checked} onChange={() => setTerm(term)}/>
    <label className="btn btn-success m-1 p-2" htmlFor={term}>
    { term }
    </label>
  </>
);

const Course = ({ course }) => (
    <div className="card m-2 p-2">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title mb-3">{ course.term } CS { course.number }</h5>
        <div className="card-text">{ course.title }</div>
        <div className="mt-auto">
            <hr/>
            <div>
            { course.meets }
            </div>
        </div>
      </div>
    </div>
  );

const CourseList = ({ courses }) => {
  const [term, setTerm] = useState('Fall');
  const termCourses = Object.values(courses).filter(course => course.term === term);
  return (
    <>
    <TermSelector term={term} setTerm={setTerm}/>
    <div className="course-list">
      { Object.values(termCourses).map(course => <Course key={`${course.term}${course.number}`} course={ course } />) }
    </div>
    </>
)};

export default CourseList