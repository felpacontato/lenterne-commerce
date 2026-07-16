import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { randomBytes, randomUUID, scryptSync, timingSafeEqual } from "node:crypto";

export type CustomerAddress = { id: string; label: string; recipient: string; postalCode: string; street: string; number: string; complement?: string; district: string; city: string; state: string };
export type Customer = { id: string; name: string; email: string; phone?: string; company?: string; password: string; addresses: CustomerAddress[]; subscriptions: { offers: boolean; orderUpdates: boolean }; createdAt: string };

const hashPassword = (password: string) => { const salt = randomBytes(16).toString("hex"); return `${salt}:${scryptSync(password, salt, 64).toString("hex")}`; };
const verifyPassword = (password: string, stored: string) => { const [salt, hash] = stored.split(":"); if (!salt || !hash) return false; const candidate = scryptSync(password, salt, 64); const expected = Buffer.from(hash, "hex"); return candidate.length === expected.length && timingSafeEqual(candidate, expected); };

export class CustomerStore {
  private readonly file: string;
  private queue = Promise.resolve();
  constructor(file = process.env.CUSTOMER_DATA_FILE ?? resolve(process.cwd(), ".data", "customers.json")) { this.file = file; }
  private async read(): Promise<Customer[]> { try { return JSON.parse(await readFile(this.file, "utf8")); } catch { await this.write([]); return []; } }
  private async write(items: Customer[]) { await mkdir(dirname(this.file), { recursive: true }); await writeFile(this.file, JSON.stringify(items, null, 2), "utf8"); }
  async register(input: { name: string; email: string; password: string; phone?: string; company?: string }) {
    let result!: Customer;
    this.queue = this.queue.then(async () => { const items = await this.read(); const email = input.email.toLowerCase(); if (items.some((item) => item.email === email)) throw new Error("email_in_use"); result = { id: randomUUID(), name: input.name, email, phone: input.phone, company: input.company, password: hashPassword(input.password), addresses: [], subscriptions: { offers: false, orderUpdates: true }, createdAt: new Date().toISOString() }; items.push(result); await this.write(items); });
    await this.queue; return result;
  }
  async authenticate(email: string, password: string) { const customer = (await this.read()).find((item) => item.email === email.toLowerCase()); return customer && verifyPassword(password, customer.password) ? customer : undefined; }
  async find(id: string) { return (await this.read()).find((item) => item.id === id); }
  async update(id: string, patch: Partial<Pick<Customer, "name" | "phone" | "company" | "subscriptions">>) { const items = await this.read(); const index = items.findIndex((item) => item.id === id); if (index < 0) return; items[index] = { ...items[index], ...patch }; await this.write(items); return items[index]; }
  async addAddress(id: string, address: Omit<CustomerAddress, "id">) { const items = await this.read(); const customer = items.find((item) => item.id === id); if (!customer) return; const saved = { ...address, id: randomUUID() }; customer.addresses.push(saved); await this.write(items); return saved; }
  async removeAddress(id: string, addressId: string) { const items = await this.read(); const customer = items.find((item) => item.id === id); if (!customer) return false; const count = customer.addresses.length; customer.addresses = customer.addresses.filter((item) => item.id !== addressId); await this.write(items); return customer.addresses.length !== count; }
}

export const publicCustomer = (customer: Customer) => { const { password: _password, ...safe } = customer; return safe; };
