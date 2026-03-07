export default function AuthLoading() {
  return (
    <div
      className="bg-background flex min-h-screen items-center justify-center"
      aria-label="Loading"
    >
      <div
        className="text-accent h-10 w-10 animate-spin rounded-full border-2 border-current border-t-transparent"
        role="status"
        aria-hidden
      />
    </div>
  );
}
