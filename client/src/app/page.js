

"use client"
import Hero from "@/components/home/hero/Hero";
import Banner2 from "@/components/home/Banner2";
import Banner3 from "@/components/home/Banner3";
import ExpertChoice from "@/components/home/ExpertChoice";
import NewArrivals from "@/components/home/NewArrivals";
import NicheExplorer from "@/components/home/NicheExplorer";
import Trending from "@/components/home/Trending";
import Main from "@/components/shared/layouts/Main";
import Post from "@/components/home/posts/Post";

export default function Home() {
  return (
    <>
      <Main>
        <main className="flex flex-col gap-y-20 w-full bg-lightbg">
          <Hero/>
          <NewArrivals />
          <Post/>
          <Banner2 />
          <ExpertChoice />
          <NicheExplorer />
          <Trending />
          <Banner3 />
        </main>
      </Main>
    </>
  );
}
