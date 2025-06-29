// "use client";
//
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { supabase } from "@/lib/supabase";
// import { useAuthStore } from "@/lib/state/auth.store";
// import Loader from "@/components/ui/loader";
// import { toast } from "sonner";
//
// export default function OAuthCallback() {
//   const router = useRouter();
//   const { setUser, setRemember } = useAuthStore();
//
//   useEffect(() => {
//     async function handleOAuth() {
//       const { data: sessionData, error: sessionError } =
//         await supabase.auth.getSession();
//
//       if (sessionError || !sessionData.session?.user) {
//         toast.error("OAuth sign-in failed");
//         router.replace("/sign-in");
//         return;
//       }
//
//       const user = sessionData.session.user;
//
//       setUser({
//         id: user.id,
//         fullName: user.user_metadata.full_name ?? "Anonymous",
//         email: user.email!,
//         role: "officer",
//         yearLevel: 1,
//         course: "BSIT",
//         position: "External Vice President",
//       });
//
//       setRemember(true);
//
//       window.location.href = "/dashboard";
//     }
//
//     handleOAuth();
//   }, []);
//
//   return (
//     <div className="flex h-screen items-center justify-center">
//       <Loader />
//     </div>
//   );
// }
