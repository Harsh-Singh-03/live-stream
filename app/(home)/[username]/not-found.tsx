import Link from "next/link";

import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  return ( 
    <div className="mt-40 flex flex-col space-y-4 items-center justify-center text-muted-foreground">
      <h1 className="text-4xl">404</h1>
      <p className="text-center text-sm md:text-base">
        We couldn&apos;t find the user you were looking for.
      </p>
      <Button variant="secondary" asChild>
        <Link href="/">
          Go back home
        </Link>
      </Button>
    </div>
  );
};
 
export default NotFoundPage;