const NewBookFields = ({ formData, updateField, updateArrayField, addKeyword }) => (
  <div>
    <input
      type="text"
      placeholder="Title"
      className="border w-full"
      value={formData.title}
      onChange={(e) => updateField("title", e.target.value)}
    />

    <textarea
      placeholder="Description"
      className="border w-full mt-2"
      value={formData.description}
      onChange={(e) => updateField("description", e.target.value)}
    />

    <div className="mt-2">
      <label>SEO Keywords (min 10):</label>
      {formData.keywords.map((k, i) => (
        <input
          key={i}
          value={k}
          onChange={(e) => updateArrayField("keywords", i, e.target.value)}
          className="border w-full mt-1"
        />
      ))}
      <button type="button" onClick={() => addKeyword("keywords")} className="mt-2 text-blue-500">+ Add Keyword</button>
    </div>

    <div className="mt-2">
      <label>Categories (5 required):</label>
      {[...Array(5)].map((_, i) => (
        <input
          key={i}
          value={formData.categories[i] || ""}
          onChange={(e) => updateArrayField("categories", i, e.target.value)}
          className="border w-full mt-1"
        />
      ))}
    </div>
  </div>
);

export default NewBookFields;
