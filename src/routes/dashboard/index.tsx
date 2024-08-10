import { authGuard } from "@/libs/middleware";
import { LoaderFunctionArgs, Outlet, redirect } from "react-router-dom";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const redirectTo = await authGuard(url.pathname);

  if (redirectTo) {
    return redirect(redirectTo);
  }

  if (url.pathname != "/dashboard/saved-places") {
    return redirect("/dashboard/saved-places");
  }

  return null;
}

export function DashboardLayoutRoute() {
  return (
    <>
      <Outlet />
    </>
  );
}
