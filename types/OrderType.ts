export interface OrderType {
    order_id: string,
    name: string,
    city: string,
    address: {
        block?: string
        street?: string
        house?: string
        jaddah?: string
        floor_apt?: string
    },
    phone: string,
    amount: string,
    status: string,
    asignee: {
        id?: string,
        name?: string,
        image?: string
    } | null
}