export default function Home() {
  return (
    <section className="min-h-[90vh]  w-full bg-[#636ede] flex flex-col justify-left px-0 py-16">
      <div className="max-w-[1440px] mx-right mt-auto flex flex-col justify-left h-full px-8">
        <h1 className="text-black text-[4vw] font-bold leading-tight mb-4 ">
          More than a traditional
          <br />
          software agency
        </h1>
        <p className="text-black text-sg max-w-3xl mb-4">
          We are specialists at building solid end-to-end software solutions
          that help you reach your business targets. If your IP lies in
          commercial knowledge and processes you need software solutions
          sustaining these enabling you to scale your business.
        </p>
        <button className="bg-white text-black rounded-full px-6 py-2 text-sm font-medium shadow hover:bg-[#e5e5fa] transition w-fit">
          Work with us
        </button>
      </div>
    </section>
  );
}
