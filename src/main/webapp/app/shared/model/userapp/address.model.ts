export interface IAddress {
  id?: number;
  street?: string;
  postalCode?: number;
  city?: string;
  state?: string;
}

export class Address implements IAddress {
  constructor(public id?: number, public street?: string, public postalCode?: number, public city?: string, public state?: string) {}
}
