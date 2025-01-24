import { getAllEmployees } from "@/actions/employee"
import EmployeeTableWrapper from "./components/EmployeeTableWrapper"
import { auth } from "@/auth";
import { notFound } from "next/navigation";


async function EmployeesPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {

    const session = await auth();
    if (session) {
        if (session.user.role === 'driver') {
            notFound()
        }
    }


    let employees = await getAllEmployees();

    const { query } = await searchParams;

    if (query) {
        employees = employees.filter(employee => {
            if (employee.name.toLowerCase().includes(query as string) || employee.role.toLowerCase().includes(query as string)) {
                return employee
            }
        });

    }

    return (
        <EmployeeTableWrapper employees={employees} />
    )
}

export default EmployeesPage