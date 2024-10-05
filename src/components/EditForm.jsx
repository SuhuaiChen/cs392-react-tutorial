import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from '../utilities/useForm';
import {timeParts} from '../utilities/time';
import { useDbUpdate } from "../utilities/firebase";
import { useEffect } from "react";

const isValidMeets = (meets) => {
  const parts = timeParts(meets);
  return (meets === '' || (parts.days && !isNaN(parts.hours?.start) && !isNaN(parts.hours?.end)));
};

const validateCourseData = (key, val) => {
  switch (key) {
    case 'title': return /(^$|\w\w)/.test(val) ? '' : 'must be least two characters';
    case 'meets': return isValidMeets(val) ? '' : 'must be days hh:mm-hh:mm';
    default: return '';
  }
};

const getCourseId = (course) => course.term[0] + course.number;

const EditForm = () => {
  const navigate = useNavigate();
  const { state: course } = useLocation();
  const [updateData, result] = useDbUpdate('/courses/' + getCourseId(course));
  const submit = (data) => {
    updateData(data);
  }

  useEffect(() => {
    if (result) { 
      alert(result.message);
      navigate('/');
    }
  }, [result, navigate]);

  const [ errors, handleSubmit ] = useForm(validateCourseData, submit);
  return (
    <form onSubmit={handleSubmit} noValidate className={errors ? 'was-validated' : null}>
        <input type="hidden" name="id" value={getCourseId(course)} />
        <div className="mb-3">
        <label htmlFor="title" className="form-label">Course title</label>
        <input className="form-control" id="title" name="title" defaultValue={course.title} />
        <div className="invalid-feedback">{errors?.title}</div>
      </div>
      <div className="mb-3">
        <label htmlFor="meets" className="form-label">Meeting time</label>
        <input className="form-control" id="meets" name="meets" defaultValue={course.meets} />
        <div className="invalid-feedback">{errors?.meets}</div>
      </div>
      <button type="button" className="btn btn-cancel border border-2 me-2" onClick={() => navigate('/')}>Cancel</button>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
};

export default EditForm;