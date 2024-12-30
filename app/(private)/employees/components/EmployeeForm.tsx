'use client'
import SubmitBtn from "@/app/login/components/SubmitBtn"
import { Input } from "@/components/shadcn/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/shadcn/select"
import FormField from "@/components/ui/CustomField"



function EmployeeFrom() {
    return (
        <form className="mt-8 space-y-6">
            <FormField label="Name" htmlFor="name">
                <Input id="name" name="name" required />
            </FormField>
            <FormField label="Email" htmlFor="email" >
                <Input id="email" name="email" type="email" required />
            </FormField>
            <div className="mb-6">
                <Select name="role" required>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent className="bg-muted">
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="clerk">Clerk</SelectItem>
                        <SelectItem value="driver">Driver</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <SubmitBtn text="Add Employee" loadingText="Adding Employee" />

        </form>
    )
}

export default EmployeeFrom