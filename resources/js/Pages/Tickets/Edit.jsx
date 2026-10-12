import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TicketForm from "@/Components/TicketForm";
import { Head } from "@inertiajs/react";

export default function Edit({ ticket }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800">
                    Edit Ticket
                </h2>
            }
        >
            <Head title="Edit Ticket" />
            <div className="max-w-2xl mx-auto py-8 px-4">
                <TicketForm ticket={ticket} />
            </div>
        </AuthenticatedLayout>
    );
}
