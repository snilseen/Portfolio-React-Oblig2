import { useState } from "react";
import { validateFields } from "../utils/formvalidation";

type CreateProjectProps = {
  onAddProject: (newProject: { title: string; description: string }) => void;
};

function CreateProject({ onAddProject }: CreateProjectProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // if (title.trim() === "" || description.trim() === "") {
    //   setError("Tittel eller beskrivelse kan ikke være tomme.");
    //   return;
    // }

    // Lagde en mer dynamisk validationcheck som kan bli gjenrbrukt i flere komponenter.
    const errorMessage = validateFields([
      { name: "Prosjekttittel", value: title },
      { name: "Prosjekt beskrivelse", value: description },
    ]);

    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    if (title && description) {
      onAddProject({ title, description });
      setTitle("");
      setDescription("");
      setError("");
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto mt-5">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <label
          htmlFor="title"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Prosjekttittel:
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>
        <br />
        <label
          htmlFor="beskrivelse"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Prosjektbeskrivelse:
          <input
            className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
          />
        </label>
        <br />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Legg til prosjekt
        </button>
        <p>{error && <p className="text-red-500">{error}</p>}</p>
      </form>
    </div>
  );
}

export default CreateProject;
