import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import useNotification from "../components/shared/notification/useNotification";
import AuthForm from "../components/templates/auth/authForm";

interface SignInProps {}

const SignIn = (props: SignInProps) => {
  const {} = props;

  const router = useRouter();
  const supabase = useSupabaseClient();
  const { setNotification } = useNotification();

  return (
    <AuthForm
      handleSubmit={async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });

        if (error) {
          setNotification("Error logging in. Please try again.", "error");
          console.error(error);
          return;
        }
        setNotification("Successfully logged in.", "success");
        router.push("/welcome");
      }}
      authFormType={"signin"}
    />
  );
};

export default SignIn;
