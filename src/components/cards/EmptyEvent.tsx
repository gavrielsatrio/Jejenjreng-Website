function EmptyEvent() {
  return (
    <div className="bg-secondary-lighter hover:bg-secondary-lighter/95 md:p-6 p-5 rounded-lg shadow-md">
      <h3 className="font-extrabold text-lg md:text-xl text-primary">No events</h3>
      <p className="text-primary-light text-xs md:text-sm mt-1">Don&apos;t forget to add new events from Notion</p>
    </div>
  )
}

export { EmptyEvent }