const Loading = () => {
  return (
    <section className="w-full flex flex-col gap-4 py-2" aria-live="polite" aria-busy="true">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 flex items-center justify-center gap-3">
        <span className="spinner" aria-hidden="true" />
        <p className="text-sm text-white">Loading content...</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <div className="h-64 rounded-xl border border-white/10 bg-white/5" />
        <div className="h-64 rounded-xl border border-white/10 bg-white/5" />
        <div className="h-64 rounded-xl border border-white/10 bg-white/5" />
      </div>
    </section>
  );
};

export default Loading;