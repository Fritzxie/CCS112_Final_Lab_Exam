import { useForm, Link } from "@inertiajs/react";

const PRIORITIES = ["Low", "Medium", "High", "Urgent"];
const STATUSES = ["Open", "In Progress", "Resolved", "Closed"];
const CATEGORIES = ["Hardware", "Software", "Network", "Account", "Other"];

export default function TicketForm({ ticket }) {
    const { data, setData, post, put, processing, errors } = useForm({
        title: ticket?.title ?? "",
        description: ticket?.description ?? "",
        priority: ticket?.priority ?? "Low",
        status: ticket?.status ?? "Open",
        category: ticket?.category ?? "Software",
    });

    const submit = (e) => {
        e.preventDefault();
        if (ticket) {
            put(route("tickets.update", ticket.id));
        } else {
            post(route("tickets.store"));
        }
    };

    const renderSelect = (name, label, options) => (
        <div>
            <label className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <select
                value={data[name]}
                onChange={(e) => setData(name, e.target.value)}
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
            >
                {options.map((o) => (
                    <option key={o} value={o}>
                        {o}
                    </option>
                ))}
            </select>
            {errors[name] && (
                <p className="mt-1 text-sm text-red-600">{errors[name]}</p>
            )}
        </div>
    );

    return (
        <form
            onSubmit={submit}
            className="space-y-4 bg-white p-6 shadow rounded-lg"
        >
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Title
                </label>
                <input
                    type="text"
                    value={data.title}
                    onChange={(e) => setData("title", e.target.value)}
                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
                />
                {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Description
                </label>
                <textarea
                    rows="4"
                    value={data.description}
                    onChange={(e) => setData("description", e.target.value)}
                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
                />
                {errors.description && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.description}
                    </p>
                )}
            </div>

            {renderSelect("priority", "Priority", PRIORITIES)}
            {renderSelect("status", "Status", STATUSES)}
            {renderSelect("category", "Category", CATEGORIES)}

            <div className="flex items-center gap-3">
                <button
                    type="submit"
                    disabled={processing}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
                >
                    {processing ? "Saving..." : "Save Ticket"}
                </button>
                <Link
                    href={route("tickets.index")}
                    className="text-sm text-gray-600 hover:underline"
                >
                    Cancel
                </Link>
            </div>
        </form>
    );
}
