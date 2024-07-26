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

  return (
    <>
      <div className="flex justify-center mt-6">
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
              <Button className="bg-primary-color text-white min-w-32">
                Login
              </Button>
            </div>
          </div>
        </Form>
      </div>
      <div className="text-sm flex flex-row gap-2 justify-center mt-5">
        <p>Don't have an account?</p>
        <Link className="hover:underline text-blue-500" to="/register">
          Register
        </Link>
      </div>
    </>
  );
}