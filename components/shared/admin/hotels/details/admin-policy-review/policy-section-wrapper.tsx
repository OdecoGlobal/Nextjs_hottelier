const AdminSectionWrapper = ({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) => {
  return (
    <section className="dialog-section">
      <header className="dialog-header">{heading}</header>
      {children}
    </section>
  );
};

export default AdminSectionWrapper;
