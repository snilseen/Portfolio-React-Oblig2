type ContactProps = {
  student: {
    email: string;
  };
};

function Contact({ student }: ContactProps) {
  return (
    <div className="text-white">
      <h2>Kontaktinformasjon</h2>
      <p>{student.email}</p>
      <button
        onClick={() => alert(`${student.email}`)}
        className="border-solid border-2 rounded-md p-1"
      >
        Vis Email
      </button>
    </div>
  );
}

export default Contact;
