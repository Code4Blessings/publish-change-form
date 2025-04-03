// This component is a simple text input field for entering a date and time.
// It takes two props: `value`, which is the current value of the input, and `onChange`, which is a function that will be called when the input value changes.


const DateTimeField = ({ value, onChange }) => (
    <label>Date & Time to be Published:
        <input
            type="datetime-local"
            className="border w-full mt-1"
            value={value}
            onChange={onChange}
            step="60" // optional: allows minute-level selection
        />

    </label>
);

export default DateTimeField;

