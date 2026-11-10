import { Board } from "@/components/board";
import { Profile } from "@/components/profile";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPins } from "@/lib/pins";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <Profile />
      <main
        id="board"
        className="mx-auto box-border w-full max-w-[1400px] px-4 pb-16"
      >
        <Board pins={getPins()} />
      </main>
      <SiteFooter />
    </>
  );
}
