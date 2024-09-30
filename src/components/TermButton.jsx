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
      <label className="btn btn-success m-1 p-2 custom-button" htmlFor={term}>
        {term}
      </label>
    </>
  );

export default TermButton