type ContactProps = {
  email: string;
};

function Contact(props: ContactProps) {
  return (
    <div>
      <p>{props.email}</p>
    </div>
  );
}

export default Contact;
