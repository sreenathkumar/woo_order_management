
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/shadcn/card"


export default function AnalyticsCard() {


    return (
        <Card className="flex flex-col items-center gap-10">
            <CardHeader className="items-center pb-0">
                <CardTitle className="text-xl">Total Orders</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 items-center pb-0 text-4xl font-bold">
                1000+
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm leading-none text-muted-foreground">
                Showing total orders for the last 6 months
            </CardFooter>
        </Card>
    )
}
