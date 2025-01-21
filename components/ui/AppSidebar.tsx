import { auth } from "@/auth"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from "@/components/shadcn/sidebar"
import { HelpCircle, IdCard, LayoutDashboard, Package } from 'lucide-react'
import MainNav from "./MainNav"
import User from "./User"

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Employees", url: "/employees", icon: IdCard },
  { title: "Orders", url: "/orders", icon: Package },
  { title: "Help", url: "/help", icon: HelpCircle },
]

async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const session = await auth();
  if (!session) {
    return null;
  }
  const user = session.user;


  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="py-6 border-b mb-6">
        Logo
      </SidebarHeader>
      <SidebarContent>
        <MainNav items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        {user && <User />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

export default AppSidebar