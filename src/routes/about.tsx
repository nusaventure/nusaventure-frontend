import PageMeta from "@/components/page-meta";
import { HeaderNavigation } from "@/components/header-navigation";

export async function loader() {
  const responseAbout = "/about";

  return { places: responseAbout };
}

export function AboutRoute() {
  return (
    <div>
      <PageMeta title="About Us" />

      <HeaderNavigation />

      <section className="bg-[url('/images/about/about-cloud.webp')] bg-no-repeat bg-cover bg-top  px-5">
        <div className="text-center pt-32 pb-16">
          <h1 className="text-lg font-semibold text-indigo-600 mb-2">
            Our Team
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-1000 mb-8">
            The great minds behind our work.
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 px-5 gap-y-20 px-10 md:px-20 gap-x-5 ">
          <div className="flex flex-col items-center gap-4 ">
            <img
              src="/images/about/mhaidar.jpg"
              alt="M Haidar Hanif"
              className="w-[200px] h-auto rounded-full"
            />
            <div className="text-center">
              <div className="text-base md:text-xl font-semibold ">
                M Haidar Hanif
              </div>
              <div className="text-xs text-slate-700 ">Project Manager</div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <img
              src="/images/about/azizramdan.jpg"
              alt="Aziz Ramdan"
              className="w-[200px] h-auto rounded-full"
            />
            <div className="text-center">
              <div className="text-base md:text-xl font-semibold ">
                Aziz Ramdan Kurniawan
              </div>
              <div className="text-xs text-slate-700 ">Fullstack Engineer</div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <img
              src="/images/about/myusuf.webp"
              alt="M Yusuf UW"
              className="w-[200px] h-auto bg-cover bg-no-repeat rounded-full"
            />
            <div className="text-center">
              <div className="text-base md:text-xl font-semibold ">
                M Yusuf Untung Wahyudi
              </div>
              <div className="text-xs text-slate-700 ">Backend Engineer</div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <img
              src="/images/about/hanifptw.webp"
              alt="hanifptw"
              className="w-[200px] h-auto  rounded-full"
            />
            <div className="text-center">
              <div className="text-base md:text-xl font-semibold ">
                Brilliant Hanif Almubarak
              </div>
              <div className="text-xs text-slate-700 ">
                Frontend Engineer/UI-UX Designer
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <img
              src="/images/about/ismail.jpeg"
              alt="ismailfaruqi"
              className="w-[200px] h-auto rounded-full"
            />
            <div className="text-center">
              <div className="text-base md:text-xl font-semibold ">
                Ismail Al Faruqi
              </div>
              <div className="text-xs text-slate-700 ">Frontend Engineer</div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <img
              src="/images/about/josa.webp"
              alt="josapratama"
              className="w-[200px] h-auto bg-auto bg-center rounded-full"
            />
            <div className="text-center">
              <div className="text-base md:text-xl font-semibold ">
                Josa Pratama
              </div>
              <div className="text-xs text-slate-700 ">Backend Engineer</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
