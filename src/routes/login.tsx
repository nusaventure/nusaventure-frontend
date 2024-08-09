import PageMeta from "@/components/page-meta";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authProvider } from "@/libs/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  ActionFunctionArgs,
  Form,
  Link,
  redirect,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { toast } from "react-toastify";
import * as z from "zod";

const loginSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters long")
      .max(20, "Username must be at most 20 characters long")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain alphanumeric characters and underscores"
      ),
    password: z.string().min(6),
  })
  .required();

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const login = await authProvider.login(
    formData.get("username") as string,
    formData.get("password") as string
  );

  if (login.success) {
    toast.success("Login successful");
    return redirect("/");
  } else {
    toast.error(login.message);
    return null;
  }
};

export function LoginRoute() {
  const submit = useSubmit();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  type FormData = z.infer<typeof loginSchema>;

  const onSubmit = async (data: FormData) => {
    submit(data, {
      method: "post",
    });
  };

  const { state } = useNavigation();

  return (
    <>
      <PageMeta title="Login" />

      <div className="flex flex-col justify-center h-screen items-center">
        <img className="h-24 w-auto mb-4" src="/images/places/nusa-venture-black.svg" alt="logo" />
        <Form onSubmit={handleSubmit(onSubmit)} method="post" className="w-1/3">
          <div className="flex flex-col gap-6">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                id="username"
                {...register("username")}
                required
              />
              {errors.username && (
                <span className="text-sm text-red-500 ml-2">
                  {errors.username?.message}
                </span>
              )}
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input type="password" {...register("password")} required />
              {errors.password && (
                <span className="text-sm text-red-500 ml-2">
                  {errors.password?.message}
                </span>
              )}
            </div>

            <div className="text-center">
              <Button
                className="bg-primary-color text-white w-full"
                disabled={state === "submitting" || state === "loading"}
              >
                Login
              </Button>
            </div>
          </div>
        </Form>
        <div className="text-sm flex flex-row gap-2 justify-center mt-5">
          <p>Don't have an account?</p>
          <Link className="hover:underline text-blue-500" to="/register">
            Register
          </Link>
        </div>
      </div>
    </>
  );
}
