import { Link } from "react-router-dom";
import { Button, buttonVariants } from "./ui/button";
import { authProvider } from "@/libs/auth";
import { UserNavigation } from "./user-navigation";
import { cn } from "@/libs/cn";

export function HeaderNavigation() {
  return (
    <header className="fixed w-full p-5 z-20 bg-gradient-to-b from-gray-700/60 justify-center flex ">
      <div className="max-w-screen-xl w-full">
        <div className="flex justify-between ">
          <div>
            <Link to="/">
              <img src="/images/landing/logo.svg" alt="logo" />
            </Link>
          </div>
          <div className="flex flex-row items-center gap-6 text-white text-sm">
            <HeaderNavigationMenu />
          </div>
        </div>
      </div>
    </header>
  );
}

export function HeaderNavigationMenu() {
  const isAuthenticated = authProvider.isAuthenticated;

  return (
    <>
      <Button className="text-white">
        <Link to="/places">Places</Link>
      </Button>
      <Button className="text-white">
        <Link to="/about">About</Link>
      </Button>
      {isAuthenticated ? (
        <UserNavigation />
      ) : (
        <Link
          to="/login"
          className={cn(
            buttonVariants({
              variant: "default",
            }),
            "bg-primary-color text-white"
          )}
        >
          Login
        </Link>
      )}
    </>
  );
}
