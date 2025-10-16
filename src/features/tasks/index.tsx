import PageTitle from "@/components/page-title";

export default function TaskList() {
  return (
    <>
      <PageTitle
        title="Tasks"
        subTitle="List of tasks"
      />
      <div className="p-4 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold mb-4">Task List</h2>
        {/* Add your task list implementation here */}
      </div>
    </>
  );
}
