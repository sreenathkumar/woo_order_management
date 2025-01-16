import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/shadcn/select"

function UpdateOptions({ options, label, id, placeholder }: { options?: string[], label: string, id: string, placeholder: string }) {
    return (
        <div className="space-y-2">
            <label htmlFor={id} className="text-sm font-medium">
                {label}
            </label>
            <Select required>
                <SelectTrigger id={id}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {options?.map((name) => (
                        <SelectItem key={name} value={name}>
                            {name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

export default UpdateOptions