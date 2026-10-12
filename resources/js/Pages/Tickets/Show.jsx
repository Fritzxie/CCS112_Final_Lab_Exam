import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Badge from "@/Components/Badge";
import { Head, Link, router } from "@inertiajs/react";

export default function Show({ ticket }) {
    const handleDelete = () => {
        if (confirm("Delete this ticket?")) {
            router.delete(route("tickets.destroy", ticket.id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800">
                    Ticket Details
                </h2>
            }
        >
            <Head title={ticket.title} />

            <div className="max-w-2xl mx-auto py-8 px-4">
                <div className="bg-white shadow rounded-lg p-6 space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900">
                        {ticket.title}
                    </h3>

                    <div className="flex flex-wrap gap-2 items-center">
                        <Badge value={ticket.priority} />
                        <Badge value={ticket.status} />
                        <span className="text-sm text-gray-500">
                            {ticket.category}
                        </span>
                    </div>

                    <p className="text-gray-700 whitespace-pre-wrap">
                        {ticket.description}
                    </p>

                    <p className="text-xs text-gray-400">
                        Created {new Date(ticket.created_at).toLocaleString()} ·
                        Updated {new Date(ticket.updated_at).toLocaleString()}
                    </p>

                    <div className="flex gap-4 pt-2 text-sm">
                        <Link
                            href={route("tickets.edit", ticket.id)}
                            className="text-blue-600 hover:underline"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="text-red-600 hover:underline"
                        >
                            Delete
                        </button>
                        <Link
                            href={route("tickets.index")}
                            className="text-gray-600 hover:underline"
                        >
                            Back to tickets
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
