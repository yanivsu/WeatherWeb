import { IConditions } from './conditions.model';

export interface ICity {
    id: string,
    name: string,
    condition?: IConditions | null | undefined
}