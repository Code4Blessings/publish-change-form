// This component is a radio button group that allows the user to select between two options: "New Book" and "Update Book".
// It takes a prop `onSelect`, which is a function that will be called with the selected form type when the user changes their selection.
// The component uses a simple layout with two radio buttons, each with a label.
// The `onChange` event handler for each radio button calls the `onSelect` function with the corresponding form type ("new" or "update").


const FormTypeSelector = ({ onSelect }) => (
  <div className="space-x-4">
    <label><input type="radio" name="formType" onChange={() => onSelect("new")} /> New Book</label>
    <label><input type="radio" name="formType" onChange={() => onSelect("update")} /> Update Book</label>
  </div>
);
export default FormTypeSelector;

