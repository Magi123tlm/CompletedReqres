import { ChangeEvent, FormEvent } from "react";
import { AuthUser, CreatedUser, FormValue } from "../Store/slice";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useLocation } from "react-router-dom";

type FormComponentProp = {
  handleSubmit: (e: FormEvent) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleClick?: (user?: CreatedUser) => void;
  formValue?: FormValue;
  createdUsers?: CreatedUser[];
  authForm?: Omit<AuthUser, "token" | "id">;
  authUsers?: AuthUser[] | [];
  loginUser?: AuthUser | null;
  loginForm?: Omit<AuthUser, "token" | "id">;
};

const FormComponent = ({
  handleSubmit,
  handleChange,
  handleClick,
  formValue,
  createdUsers,
  loginForm,
  loginUser,
  authForm,
  authUsers,
}: FormComponentProp) => {
  const location = useLocation();
  const pathName = location.pathname;
  return (
    <>
      {formValue && (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
          <Card className="shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-center">
                {pathName.includes("create") ? "Create User" : "Update User"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formValue.name}
                  onChange={handleChange}
                  placeholder="Enter name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="job">Job</Label>
                <Input
                  id="job"
                  name="job"
                  value={formValue.job}
                  onChange={handleChange}
                  placeholder="Enter job title"
                />
              </div>
              <Button type="submit" className="w-full mt-4">
                Save
              </Button>
            </CardContent>
          </Card>
        </form>
      )}

      {loginForm && (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
          <Card className="shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-center">
                Login
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={loginForm.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={loginForm.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <Button type="submit" className="w-full mt-4">
                Login
              </Button>
            </CardContent>
          </Card>
        </form>
      )}
      {authForm && (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
          <Card className="shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-center">
                Register
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={authForm.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={authForm.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                />
              </div>
              <Button type="submit" className="w-full mt-4">
                Register
              </Button>
            </CardContent>
          </Card>
        </form>
      )}
      {createdUsers &&
        createdUsers.length >= 1 &&
        createdUsers.map((user) => (
          <Card
            key={user.id}
            onClick={() => handleClick?.(user)}
            className="w-full max-w-md cursor-pointer transition-shadow hover:shadow-xl border-2 border-muted p-4 rounded-2xl"
          >
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">User Created:</p>
              <p>
                <span className="font-medium">ID:</span> {user.id}
              </p>
              <p>
                <span className="font-medium">Username:</span> {user.name}
              </p>
              <p>
                <span className="font-medium">Job:</span> {user.job}
              </p>
              <p>
                <span className="font-medium">Created At:</span>{" "}
                {user.createdAt}
              </p>
              {user.updatedAt && (
                <p>
                  <span className="font-medium">Updated At:</span>{" "}
                  {user.updatedAt}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      {loginUser && Object.keys(loginUser).length >= 1 && (
        <Card className="w-full max-w-md mx-auto p-4 rounded-2xl shadow-md">
          <CardContent className="space-y-3">
            <p>
              <span className="font-semibold text-muted-foreground">
                Email:
              </span>{" "}
              {loginUser.email}
            </p>
            <p>
              <span className="font-semibold text-muted-foreground">
                Password:
              </span>{" "}
              {loginUser.password}
            </p>
            <p>
              <span className="font-semibold text-muted-foreground">
                Token:
              </span>{" "}
              {loginUser.token}
            </p>
          </CardContent>
        </Card>
      )}
      {authUsers &&
        authUsers.length >= 1 &&
        authUsers.map((user) => (
          <Card
            key={user.id}
            className="w-full max-w-md mx-auto p-4 rounded-2xl shadow-md border"
          >
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">User Created:</p>
              <p>
                <span className="font-semibold text-muted-foreground">ID:</span>{" "}
                {user.id}
              </p>
              <p>
                <span className="font-semibold text-muted-foreground">
                  Email:
                </span>{" "}
                {user.email}
              </p>
              <p>
                <span className="font-semibold text-muted-foreground">
                  Password:
                </span>{" "}
                {user.password}
              </p>
              <p>
                <span className="font-semibold text-muted-foreground">
                  Token:
                </span>{" "}
                {user.token}
              </p>
            </CardContent>
          </Card>
        ))}
    </>
  );
};

export default FormComponent;
