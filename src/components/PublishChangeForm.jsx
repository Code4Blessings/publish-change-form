import React, { useState } from "react";
import DateTimeField from "./fields/DateTimeField";
import FormTypeSelector from "./fields/FormTypeSelector";
import ErrorList from "./ErrorList";
import NewBookFields from "./fields/NewBookFields";
import UpdateBookFields from "./fields/UpdateBookFields";


// This component is the main form that allows users to publish or change book details.
// It uses several child components to handle different parts of the form.
// The form is controlled, meaning that the component maintains the state of the form fields.
// It also includes validation logic to ensure that the form is filled out correctly before submission.


const PublishChangeForm = () => {
  const [formType, setFormType] = useState("");
  const [changeOptions, setChangeOptions] = useState({});
  const [errors, setErrors] = useState([]);

  const [formData, setFormData] = useState({
    dateTime: "",
    title: "",
    description: "",
    keywords: [""],
    categories: [""],
    newDescription: "",
    newKeywords: [""],
    newPrice: ""
  });

  const handleCheckbox = (type) => {
    setFormType(type);
    setChangeOptions({});
    setErrors([]);
  };

  const handleChangeCheckbox = (e) => {
    setChangeOptions({
      ...changeOptions,
      [e.target.name]: e.target.checked,
    });
  };

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const updateArrayField = (field, index, value) => {
    const updatedArray = [...formData[field]];
    updatedArray[index] = value;
    setFormData({ ...formData, [field]: updatedArray });
  };

  const addKeyword = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const validateForm = () => {
    const newErrors = [];
    if (!formData.dateTime) newErrors.push("Please complete Date and Time to be Published");

    if (!formType) newErrors.push("Please choose whether this is a new book or an update");

    if (formType === "new") {
      if (!formData.title.trim()) newErrors.push("Please complete Title of Book");
      if (!formData.description.trim()) newErrors.push("Please complete Description of Book");

      const keywordCount = formData.keywords.filter(k => k.trim()).length;
      if (keywordCount < 10) newErrors.push(`10 keywords are required, we need: ${10 - keywordCount} more keywords`);

      const categoryCount = formData.categories.filter(c => c.trim()).length;
      if (categoryCount < 5) newErrors.push(`5 categories are required, we need: ${5 - categoryCount} more categories`);
    }

    if (formType === "update") {
      if (!formData.title.trim()) newErrors.push("Please complete Title of Book");

      if (!changeOptions.description && !changeOptions.keywords && !changeOptions.price) {
        newErrors.push("Please select at least one change option");
      }

      if (changeOptions.description && !formData.newDescription.trim()) {
        newErrors.push("Please complete New Description");
      }

      if (changeOptions.keywords) {
        const newKeywordCount = formData.newKeywords.filter(k => k.trim()).length;
        if (newKeywordCount < 10) newErrors.push(`10 keywords are required, we need: ${10 - newKeywordCount} more keywords`);
      }

      if (changeOptions.price && !formData.newPrice.trim()) {
        newErrors.push("Please complete New Price");
      }
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const response = await fetch("/api/submit-form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formType, changeOptions, formData }),
    });

    const data = await response.json();
    alert(data.message);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-xl mx-auto space-y-4">
      <ErrorList errors={errors} />
      <DateTimeField value={formData.dateTime} onChange={(e) => updateField("dateTime", e.target.value)} />
      <FormTypeSelector onSelect={handleCheckbox} />

      {formType === "new" && (
        <NewBookFields
          formData={formData}
          updateField={updateField}
          updateArrayField={updateArrayField}
          addKeyword={addKeyword}
        />
      )}

      {formType === "update" && (
        <UpdateBookFields
          formData={formData}
          updateField={updateField}
          updateArrayField={updateArrayField}
          addKeyword={addKeyword}
          changeOptions={changeOptions}
          handleChangeCheckbox={handleChangeCheckbox}
        />
      )}

      <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded">Submit</button>
    </form>
  );
};

export default PublishChangeForm;


