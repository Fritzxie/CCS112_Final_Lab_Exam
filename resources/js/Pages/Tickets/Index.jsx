import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Badge from "@/Components/Badge";
import { Head, Link, router } from "@inertiajs/react";

export default function Index({ tickets, filters }) {
    const handleFilter = (e) => {
        const status = e.target.value;
        router.get(route("tickets.index"), status ? { status } : {}, {
            preserveState: true,
            replace: true,
        });
    };

    const handleDelete = (id) => {
        if (confirm("Delete this ticket?")) {
            router.delete(route("tickets.destroy", id));
        }
    };

    const cleanLabel = (label) =>
        label.replace("&laquo;", "«").replace("&raquo;", "»");

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800">
                    My Tickets
                </h2>
            }
        >
            <Head title="Tickets" />

            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="mb-6 flex items-center gap-3">
                    <label className="text-sm text-gray-700">
                        Filter by status:
                    </label>
                    <select
                        value={filters?.status ?? ""}
                        onChange={handleFilter}
                        className="rounded-md border-gray-300 shadow-sm text-sm"
                    >
                        <option value="">All</option>
                        <option>Open</option>
                        <option>In Progress</option>
                        <option>Resolved</option>
                        <option>Closed</option>
                    </select>
                </div>

                {tickets.data.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-10 text-center text-gray-600">
                        <p className="mb-4">
                            No tickets yet. Create your first one!
                        </p>
                        <Link
                            href={route("tickets.create")}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                            + New Ticket
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                        {tickets.data.map((t) => (
                            <div
                                key={t.id}
                                className="bg-white rounded-lg shadow p-5"
                            >
                                <Link
                                    href={route("tickets.show", t.id)}
                                    className="text-lg font-semibold text-indigo-700 hover:underline"
                                >
                                    {t.title}
                                </Link>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    <Badge value={t.priority} />
                                    <Badge value={t.status} />
                                    <span className="text-xs text-gray-500 self-center">
                                        {t.category}
                                    </span>
                                </div>
                                <div className="mt-4 flex gap-4 text-sm">
                                    <Link
                                        href={route("tickets.show", t.id)}
                                        className="text-gray-600 hover:underline"
                                    >
                                        View
                                    </Link>
                                    <Link
                                        href={route("tickets.edit", t.id)}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(t.id)}
                                        className="text-red-600 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {tickets.last_page > 1 && (
                    <div className="mt-6 flex flex-wrap gap-1">
                        {tickets.links.map((l, i) =>
                            l.url ? (
                                <Link
                                    key={i}
                                    href={l.url}
                                    className={`px-3 py-1 text-sm rounded border ${
                                        l.active
                                            ? "bg-indigo-600 text-white border-indigo-600"
                                            : "bg-white text-gray-700 hover:bg-gray-50"
                                    }`}
                                >
                                    {cleanLabel(l.label)}
                                </Link>
                            ) : (
                                <span
                                    key={i}
                                    className="px-3 py-1 text-sm rounded border bg-gray-100 text-gray-400"
                                >
                                    {cleanLabel(l.label)}
                                </span>
                            )
                        )}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
