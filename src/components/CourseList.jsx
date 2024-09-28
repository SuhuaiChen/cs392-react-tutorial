const terms = { F: 'Fall', W: 'Winter', S: 'Spring'};

const getCourseTerm = course => (
  terms[course.id.charAt(0)]
);

const getCourseNumber = course => (
  course.id.slice(1, 4)
);

const getCourseTime = course => (
  course.meets
);

const Course = ({ course }) => (
    <div className="card m-2 p-2">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title mb-3">{ getCourseTerm(course) } CS { getCourseNumber(course) }</h5>
        <div className="card-text">{ course.title }</div>
        <div className="mt-auto">
            <hr/>
            <div>
            { getCourseTime(course) }
            </div>
        </div>
      </div>
    </div>
  );

const CourseList = ({ courses }) => (
    <div className="course-list">
      { Object.values(courses).map(course => <Course key={course.id} course={ course } />) }
    </div>
);

export default CourseList