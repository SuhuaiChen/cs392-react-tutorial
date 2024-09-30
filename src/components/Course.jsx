import { hasConflict } from "../utilities/time";

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

export default Course;