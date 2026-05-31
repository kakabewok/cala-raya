import { useInvitationAdmin } from "@/hooks/use-invitation-admin";
import Link from "next/link";
import { useRouter } from "next/navigation";

type NavLinkProps = {
  active?: boolean;
  url: string;
  label?: string;
  className?: string;
  children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export default function NavLink({
  active = false,
  url,
  label,
  className = "",
  children,
  ...props
}: NavLinkProps) {
  const router = useRouter();
  const { setLoading, setSidebarOpen } = useInvitationAdmin();

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setLoading(true);

    // Close sidebar on mobile after click
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }

    try {
      router.push(url);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link
      href={url}
      onClick={handleClick}
      aria-label={label}
      {...props}
      className={`group relative flex items-center gap-3 rounded-lg py-3 px-4 text-sm font-medium text-muted-foreground duration-200 ease-in-out hover:bg-accent hover:text-foreground ${
        active
          ? "bg-accent text-foreground font-semibold"
          : ""
      } ${className}`}
    >
      {children}
    </Link>
  );
}
