import PageTitle from "@/components/page-title";
import UserList from "./components/user-list";

export default function UserListIndex() {
  return (
    <>
      <PageTitle
        title="Users"
        subTitle="List of users"
      />
      <UserList />
    </>
  );
}
