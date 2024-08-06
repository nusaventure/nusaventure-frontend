import { authProvider } from "@/libs/auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Form, Link } from "react-router-dom";

export function UserNavigation() {
  const user = authProvider.user;

  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <Avatar>
              <AvatarImage
                src={`https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${user.username}&backgroundType=gradientLinear`}
              />
              <AvatarFallback>{user.username}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              <div>{`${user.firstName} ${user.lastName}`}</div>
              <div className="text-gray-500 text-sm">@{user.username}</div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link to="/dashboard">
              <DropdownMenuItem className="cursor-pointer">
                Dashboard
              </DropdownMenuItem>
            </Link>

            <DropdownMenuSeparator />

            <Form method="post" action="/" className="inline">
              <button name="intent" value="logout" className="h-full w-full">
                <DropdownMenuItem className="cursor-pointer">
                  Logout
                </DropdownMenuItem>
              </button>
            </Form>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        ""
      )}
    </>
  );
}
