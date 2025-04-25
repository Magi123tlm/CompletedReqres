import { useEffect } from "react";
import { useFormData } from "../Hooks/useFormData";
import { fetchSingleUser } from "../Store/slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Store/store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Label } from "@/Components/ui/label";

const SingleUser = () => {
  const { status, error, singleUser } = useFormData();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchSingleUser("https://reqres.in/api/users/2"));
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading user data...</div>;
  }

  if (status === "failed") {
    return <div>Error loading user: {error}</div>;
  }

  return (
    <>
      {singleUser && (
        <div className="flex justify-center p-6">
          <Card className="w-full max-w-md shadow-md">
            <CardHeader className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage
                  src={singleUser.avatar}
                  alt={singleUser.first_name}
                />
                <AvatarFallback>
                  {singleUser.first_name[0]}
                  {singleUser.last_name[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>
                  {singleUser.first_name} {singleUser.last_name}
                </CardTitle>
                <CardDescription>ID: {singleUser.id}</CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-2">
              <div>
                <Label>Email</Label>
                <p className="text-muted-foreground">{singleUser.email}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default SingleUser;
