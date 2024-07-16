import beachBall from "../images/footer/beachball.png";
import umbrella from "../images/footer/umbrella.png";
import sandal from "../images/footer/sandal.png";

import island from "../images/footer/island.png";

export function Footer() {
  return (
    <footer className="relative p-4 bg-amber-200">
      <div className="relative z-10 flex flex-col items-center">
        <img src={island} alt="island" className="h-12 w-12 mb-2" />
        <p className="text-center">NUSAVENTURE</p>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-full bg-footer-pattern bg-no-repeat bg-bottom">
        <img
          src={beachBall}
          alt="beach ball"
          className="absolute bottom-4 left-4 h-12 w-12"
        />
        <img
          src={umbrella}
          alt="umbrella"
          className="absolute bottom-4 right-4 h-12 w-12"
        />
        <img
          src={sandal}
          alt="sandal"
          className="absolute bottom-4 left-20 h-12 w-12"
        />
      </div>
      <div className="text-center mt-8">
        <p>&copy; Nusaventure 2024</p>
      </div>
    </footer>
  );
}
