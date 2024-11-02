function Section({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <section className="lg:pt-24 xs:pt-16 pt-12" id={id}>
      {children}
    </section>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  return <div className="lg:pt-12 xs:pt-8 pt-6">{children}</div>;
}

Section.Content = Content;
export default Section;
