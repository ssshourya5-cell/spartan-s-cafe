import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Booking {
    date: string;
    name: string;
    time: string;
    phone: string;
    guests: bigint;
}
export interface OrderCallback {
    name: string;
    phone: string;
    items: string;
}
export type Time = bigint;
export interface Review {
    date: Time;
    name: string;
    comment: string;
    rating: bigint;
}
export interface backendInterface {
    addReview(name: string, rating: bigint, comment: string): Promise<void>;
    bookTable(name: string, phone: string, date: string, time: string, guests: bigint): Promise<void>;
    getBookings(): Promise<Array<Booking>>;
    getOrderCallbacks(): Promise<Array<OrderCallback>>;
    getReviews(): Promise<Array<Review>>;
    requestOrderCallback(name: string, phone: string, items: string): Promise<void>;
}
