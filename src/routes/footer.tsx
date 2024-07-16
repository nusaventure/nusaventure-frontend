import beachBall from "../images/footer/beachball.png";

import island from "../images/footer/island.png";

export function Footer() {
  return (
    <footer className="relative p-4 bg-amber-200">
      <div className="relative z-10 flex justify-center items-center">
        <img src={island} alt="island" className="h-12 w-12" />
        <p className="text-center">NUSAVENTURE</p>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-full">
        <img
          src={beachBall}
          alt="beach ball"
          className="absolute bottom-4 left-4 h-12 w-12"
        />
      </div>
      <div className="text-center mt-8">
        <p>&copy; Nusaventure 2024</p>
      </div>
    </footer>
  );
}
