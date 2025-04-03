const UpdateBookFields = ({
  formData,
  updateField,
  updateArrayField,
  addKeyword,
  changeOptions,
  handleChangeCheckbox
}) => (
  <div>
    <input
      type="text"
      placeholder="Title of Book"
      className="border w-full"
      value={formData.title}
      onChange={(e) => updateField("title", e.target.value)}
    />

    <div className="mt-2">
      <label><input type="checkbox" name="description" onChange={handleChangeCheckbox} /> Description</label><br />
      <label><input type="checkbox" name="keywords" onChange={handleChangeCheckbox} /> Keywords</label><br />
      <label><input type="checkbox" name="price" onChange={handleChangeCheckbox} /> Price</label>
    </div>

    {changeOptions.description && (
      <textarea
        placeholder="New Description"
        className="border w-full mt-2"
        value={formData.newDescription}
        onChange={(e) => updateField("newDescription", e.target.value)}
      />
    )}

    {changeOptions.keywords && (
      <div className="mt-2">
        <label>New Keywords:</label>
        {formData.newKeywords.map((k, i) => (
          <input
            key={i}
            value={k}
            onChange={(e) => updateArrayField("newKeywords", i, e.target.value)}
            className="border w-full mt-1"
          />
        ))}
        <button type="button" onClick={() => addKeyword("newKeywords")} className="mt-2 text-blue-500">+ Add Keyword</button>
      </div>
    )}

    {changeOptions.price && (
      <input
        type="text"
        placeholder="New Price"
        className="border w-full mt-2"
        value={formData.newPrice}
        onChange={(e) => updateField("newPrice", e.target.value)}
      />
    )}
  </div>
);

export default UpdateBookFields;
