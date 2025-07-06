export interface OrderType {
    order_id: number,
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
    payment?: string,
    asignee: {
        id?: string,
        name?: string,
        image?: string
    } | null
}

export interface OrderLocationType {
    order_id: number;
    city: string;
    address: {
        block?: string;
        street?: string;
        house?: string;
        jaddah?: string;
    };
    asignee_name: string;
    asignee: string;
    coordinates: {
        lat: number;
        lon: number;
    } | null;
}