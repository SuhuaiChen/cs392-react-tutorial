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

const CourseList = ({ courses }) => (
    <div className="course-list">
      { Object.values(courses).map(course => <Course key={`${course.term}${course.number}`} course={ course } />) }
    </div>
);

export default CourseList