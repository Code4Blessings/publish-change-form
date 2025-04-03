// This component is a simple error list that displays a list of error messages.
// It takes a prop `errors`, which is an array of error messages.
// If the array is empty, it returns null (i.e., nothing is rendered).
// If there are errors, it renders a styled div containing an unordered list of error messages.


const ErrorList = ({ errors }) => {
  if (!errors.length) return null;
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 p-2 rounded">
      <ul className="list-disc pl-5">
        {errors.map((err, idx) => <li key={idx}>{err}</li>)}
      </ul>
    </div>
  );
};
export default ErrorList;
