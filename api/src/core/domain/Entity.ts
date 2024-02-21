import { FormatDate } from "@helpers/formatDate";
import { v4 } from "uuid";


export abstract class Entity {
    public readonly id: string;
    public readonly created_at: Date;


    constructor(id?: string, created_at?: Date) {
        this.id = id ?? v4();
        this.created_at = created_at ?? new Date();
    }
}