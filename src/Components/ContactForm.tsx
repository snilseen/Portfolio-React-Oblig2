import { useState, type FormEvent } from "react";
import { validateFields } from "../utils/formvalidation";

type ContactFormProps = {
  onSubmit: (formData: { name: string; message: string }) => void;
};

function ContactForm({ onSubmit }: ContactFormProps) {
  // State for feltene
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (name.trim() === "" || message.trim() === "") {
    //   setError("Navn og melding kan ikke være tomme.");
    //   return;
    // }

    // Lagde en mer dynamisk validationcheck som kan bli gjenrbrukt i flere komponenter.
    const errorMessage = validateFields([
      {
        name: "Navn",
        value: name,
      },
      { name: "Melding", value: message },
    ]);
    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    setError("");
    onSubmit({ name, message });
    setName("");
    setMessage("");
  };

  return (
    <div className="w-full max-w-xs mx-auto mt-5">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Fullt Navn:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Ola Nordmann"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <br />
        <label
          htmlFor="message"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Melding:
          <textarea
            className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Skriv meldingen her..."
          />
        </label>
        <br />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Send
        </button>

        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}

export default ContactForm;
