export interface MenuItem {
    label: string
    to?: string
    icon: string
    isExclusive?: boolean
}

export type SidebarMenuProps = {
    list: MenuItem[]
}
