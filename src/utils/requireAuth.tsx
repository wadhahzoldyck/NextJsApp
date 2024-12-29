import { useSession } from "next-auth/react";

export const requireAuth = (Component: any) => {
  return function AuthenticatedComponent(props: any) {
    const { data: session, status } = useSession();
    if (status === "loading") return <p>Loading...</p>;
    if (!session) return <p>You are not authorized!</p>;
    return <Component {...props} />;
  };
};
