import Contact from "../Components/Contact";
import ContactForm from "../Components/ContactForm";
import { useState } from "react";

type ContactProps = {
  student: {
    email: string;
  };
};

function ContactPage({ student }: ContactProps) {
  const [submittedData, setSubmittedData] = useState(null);

  const handleFormSubmit = (formData: { name: string; message: string }) => {
    const data = {
      ...formData,
      email: student.email,
    };

    setSubmittedData(data);
  };

  return (
    <section className="text-white">
      <Contact student={student} />
      <h2>Ta kontakt med {student.email}</h2>

      <ContactForm onSubmit={handleFormSubmit} />

      {submittedData && (
        <div>
          <h3>Data sendt inn:</h3>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </section>
  );
}

export default ContactPage;
