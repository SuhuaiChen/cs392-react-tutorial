import { useLocation } from "react-router-dom";

const EditForm = () => {
  const { state: course } = useLocation();
  return (
    <form>
      <input type="hidden" name="id" value={course.id} />
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Course title
        </label>
        <input
          className="form-control"
          id="title"
          defaultValue={course.title}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="meets" className="form-label">
          Meeting time
        </label>
        <input
          className="form-control"
          id="meets"
          defaultValue={course.meets}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default EditForm;
