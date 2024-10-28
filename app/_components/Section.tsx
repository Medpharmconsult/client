function Section({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <section className="lg:pt-[96px] xs:pt-[64px] pt-[48px]" id={id}>
      {children}
    </section>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  return <div className="lg:pt-[48px] xs:pt-[32px] pt-[24px]">{children}</div>;
}

Section.Content = Content;
export default Section;
