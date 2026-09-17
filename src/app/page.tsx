import { redirect } from "next/navigation";

interface HomePageProps {
  searchParams: Promise<{ id?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedParams = await searchParams;
  
  // If legacy query link like /?id=amal92 is accessed, redirect to /invite/amal92
  if (resolvedParams?.id) {
    redirect(`/invite/${resolvedParams.id}`);
  }

  // Root URL / redirects to Admin Login Panel
  redirect("/admin");
}
