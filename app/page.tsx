// Temporary home page until the board lands (issue #3).
export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-3.5 px-5 py-10 text-center">
      <h1 className="text-[44px] font-extrabold tracking-[-0.03em] [font-variation-settings:'opsz'_96]">
        Hector Batista
      </h1>
      <p className="max-w-[34ch] text-xl font-medium">
        I build useful things for real people.
      </p>
      <p className="text-muted max-w-[56ch] text-[15px]">
        CS + Business at Northeastern, FinTech concentration. Looking for
        Product and AI Engineering roles in 2027.
      </p>
    </main>
  );
}
