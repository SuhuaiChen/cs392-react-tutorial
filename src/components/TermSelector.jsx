import { terms } from "../utilities/time";
import TermButton from "./TermButton";

const TermSelector = ({ term, setTerm }) => (
    <div className="btn-group ms-5">
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

export default TermSelector;