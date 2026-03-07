export default function RootLoading() {
  return (
    <div
      className="bg-background flex min-h-screen items-center justify-center"
      aria-label="Loading"
    >
      <div className="text-center">
        <div
          className="text-accent mx-auto h-10 w-10 animate-spin rounded-full border-2 border-current border-t-transparent"
          role="status"
          aria-hidden
        />
        <p className="text-muted-foreground mt-4 text-sm">Loading...</p>
      </div>
    </div>
  );
}
