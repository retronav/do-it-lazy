declare module "store" {
  export function get(thingToGet: string): any;
  export function set(name: string, toSet: any): void;
}
