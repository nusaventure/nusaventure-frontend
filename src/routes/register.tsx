import PageMeta from "@/components/page-meta";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api, { ApiErrorResponse } from "@/libs/api";
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

const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters long")
      .max(20, "Username must be at most 20 characters long")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain alphanumeric characters and underscores"
      ),
    email: z.string().email(),
    password: z.string().min(6),
    firstName: z.string(),
    lastName: z.string(),
  })
  .required();

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  try {
    await api("/auth/register", {
      method: "post",
      body: {
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
      },
    });

    toast.success("Register successful");
    return redirect("/login");
  } catch (error: unknown) {
    toast.error((error as ApiErrorResponse).data.message);

    return null;
  }
};

export function RegisterRoute() {
  const submit = useSubmit();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });

  type FormData = z.infer<typeof registerSchema>;

  const onSubmit = async (data: FormData) => {
    submit(data, {
      method: "post",
    });
  };

  const { state } = useNavigation();

  return (
    <>
      <PageMeta title="Register" />

      <div className="flex justify-center mt-6">
        <Form onSubmit={handleSubmit(onSubmit)} method="post" className="w-1/3">
          <div className="flex flex-col gap-6">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                type="text"
                id="firstName"
                {...register("firstName")}
                required
              />
              {errors.firstName && (
                <span className="text-sm text-red-500 ml-2">
                  {errors.firstName?.message}
                </span>
              )}
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                type="text"
                id="lastName"
                {...register("lastName")}
                required
              />
              {errors.lastName && (
                <span className="text-sm text-red-500 ml-2">
                  {errors.lastName?.message}
                </span>
              )}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" {...register("email")} required />
              {errors.email && (
                <span className="text-sm text-red-500 ml-2">
                  {errors.email?.message}
                </span>
              )}
            </div>
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
                Register
              </Button>
            </div>
          </div>
          <div className="text-sm flex flex-row gap-2 justify-center mt-5">
            <p>Already have an account?</p>
            <Link className="hover:underline text-blue-500" to="/login">
              Login
            </Link>
          </div>
        </Form>
      </div>
    </>
  );
}
