import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-4">
      <h2 className="text-2xl font-bold mb-2">Not Found</h2>
      <p className="mb-4">Could not find requested resource</p>
      <Link 
        href="/" 
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}
