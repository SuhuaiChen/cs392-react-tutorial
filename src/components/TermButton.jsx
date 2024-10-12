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
      <label className="btn btn-success m-1 p-1 custom-button d-flex align-items-center justify-content-center h-75" htmlFor={term}>
        {term}
      </label>
    </>
  );

export default TermButton