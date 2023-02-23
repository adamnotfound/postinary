import ImgUpload from './ImgUpload';
const form = ({ handleSubmit, setForm, form, loading, error, title }) => {
  function handleFormChange(e, property) {
    //If property is passed, e is considered the value, otherwise its e.target.value
    setForm({
      ...form,
      [property ? property : e.target.name]: property ? e : e.target.value,
    });
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>{title}</h2>
        <label>Post tittle:</label>
        <input
          type="text"
          name="title"
          required
          defaultValue={form.title}
          onChange={handleFormChange}
        />
        <label>Post content:</label>
        <textarea
          name="content"
          required
          defaultValue={form.content}
          onChange={handleFormChange}
        ></textarea>
        <label>Image:</label>

        <ImgUpload form={form} handleFormChange={handleFormChange} />

        {loading && (
          <button disabled className="btn-disabled" type="submit">
            Loading...
          </button>
        )}
        {!loading && <button type="submit">Submit</button>}
        {error && <p>{error.message}</p>}
      </form>
    </>
  );
};

export default form;
