import { getAllEmployees } from "@/actions/employee"
import EmployeeTableWrapper from "./components/EmployeeTableWrapper"


async function EmployeesPage() {
    const employees = await getAllEmployees();

    return (
        <EmployeeTableWrapper employees={employees} />
    )
}

export default EmployeesPage