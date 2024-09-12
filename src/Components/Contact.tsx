type ContactProps = {
  student: {
    email: string;
  };
};

function Contact({ student }: ContactProps) {
  return (
    <div>
      <h2>Kontaktinformasjon</h2>
      <p>{student.email}</p>
    </div>
  );
}

export default Contact;
