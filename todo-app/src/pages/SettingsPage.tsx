function SettingsPage() {
  return (
    <div className="h-full rounded-2xl bg-primaryBg p-3">
      <div className="flex h-full flex-col p-3">
        <h1 className="mb-6 text-3xl font-bold text-heading">Settings</h1>

        <div className="flex h-full gap-4 border-2 border-white">
          {/* this half is for the settings */}
          <div className="h-40 w-1/2 bg-red-50/50"></div>

          {/* other half for setting details */}
          <div className="h-40 w-1/2 bg-blue-50/50"></div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
