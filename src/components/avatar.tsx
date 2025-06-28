import { User } from "@/lib/types";

export default function Avatar({ user }: { user: User }) {
  const initials = user.fullName.split(" ");
  const firstInitial = initials[0].charAt(0);
  const lastInitial = initials[initials.length - 1].charAt(0);

  return (
    <div className="flex items-center justify-center bg-pink-400 h-[35px] w-[35px] rounded-4xl">
      <span className="font-bold text-pink-100">{`${firstInitial}${lastInitial}`}</span>
    </div>
  );
}
