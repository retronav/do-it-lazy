declare module "store" {
  export function get(thingToGet: string): string;
  export function set(name: string, toSet: any): void;
}
