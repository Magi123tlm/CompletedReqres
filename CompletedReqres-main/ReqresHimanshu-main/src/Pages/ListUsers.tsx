import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Store/store";
import { fetchListUser } from "../Store/slice";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import { AlertTriangle, Loader2 } from "lucide-react";

const ListUsers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { entireData, status, error } = useSelector(
    (state: RootState) => state.user
  );

  const url: string = "https://reqres.in/api/users?delay=2&page=2";

  useEffect(() => {
    dispatch(fetchListUser(url));
  }, [dispatch]);

  if (status === "loading") {
    return (
      <Alert className="w-full max-w-md mx-auto p-4 flex items-center gap-3">
        <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
        <div>
          <AlertTitle className="font-semibold">Loading Data</AlertTitle>
          <AlertDescription>Fetching all data, please wait...</AlertDescription>
        </div>
      </Alert>
    );
  }

  if (status === "failed") {
    return (
      <Alert
        variant="destructive"
        className="w-full max-w-md mx-auto p-4 flex items-center gap-3"
      >
        <AlertTriangle className="h-5 w-5 text-red-500" />
        <div>
          <AlertTitle className="font-semibold">Error</AlertTitle>
          <AlertDescription>Error loading data: {error}</AlertDescription>
        </div>
      </Alert>
    );
  }
  //   console.log(entireData);

  return (
    <>
      {entireData && (
        <div className="p-6  space-y-10">
          <div className="pr-50 flex flex-wrap gap-6 justify-around text-sm">
            <div className="flex flex-col">
              <Label>Page</Label>
              <p>{entireData.page}</p>
            </div>
            <div className="flex flex-col">
              <Label>Per Page</Label>
              <p>{entireData.per_page}</p>
            </div>
            <div className="flex flex-col">
              <Label>Total</Label>
              <p>{entireData.total}</p>
            </div>
            <div className="flex flex-col">
              <Label>Total Pages</Label>
              <p>{entireData.total_pages}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 justify-start">
            {entireData.data.map((user) => (
              <Card key={user.id} className="w-70 ">
                <CardHeader className="flex items-center space-x-4">
                  <Avatar className="w-15 h-15">
                    <AvatarImage
                      className=""
                      src={user.avatar}
                      alt={user.first_name}
                    />
                    <AvatarFallback>
                      {user.first_name.charAt(0)}
                      {user.last_name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>
                      {user.first_name} {user.last_name}
                    </CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Additional user details can be added here */}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ListUsers;
