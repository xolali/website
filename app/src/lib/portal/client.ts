import type {
  Device,
  DeviceConfig,
  Invoice,
  NewDeviceInput,
  PortalUser,
  Subscription,
  SupportTicket,
} from "./types";

/**
 * PortalClient is the single seam between the portal UI and the backend.
 *
 * Today it resolves to an in-memory mock so the shell renders and builds with
 * no external infra. When your VPN/account backend is ready, set
 * PORTAL_API_BASE_URL and implement `HttpPortalClient` (stubbed below) to call
 * it — the UI does not change.
 */
export interface PortalClient {
  getUser(): Promise<PortalUser>;
  getSubscription(): Promise<Subscription>;
  getInvoices(): Promise<Invoice[]>;
  getDevices(): Promise<Device[]>;
  getDevice(id: string): Promise<Device | null>;
  addDevice(input: NewDeviceInput): Promise<DeviceConfig>;
  revokeDevice(id: string): Promise<void>;
  getTickets(): Promise<SupportTicket[]>;
}

// ─── Mock data (matches the Ghana / GHS context) ─────────────────────────────

const MOCK_USER: PortalUser = {
  id: "usr_demo_001",
  email: "ama@example.com",
  fullName: "Ama Mensah",
  country: "GH",
  mfaEnabled: false,
};

const MOCK_SUBSCRIPTION: Subscription = {
  id: "sub_demo_001",
  planId: "annual",
  planName: "Annual",
  status: "active",
  priceLabel: "GH₵504 / year",
  currentPeriodEnd: "2027-06-12T00:00:00.000Z",
  cancelAtPeriodEnd: false,
  deviceLimit: 5,
};

const MOCK_INVOICES: Invoice[] = [
  {
    id: "inv_002",
    amountLabel: "GH₵504",
    status: "paid",
    paystackReference: "T845720394",
    issuedAt: "2026-06-12T09:14:00.000Z",
  },
  {
    id: "inv_001",
    amountLabel: "GH₵504",
    status: "paid",
    paystackReference: "T712095831",
    issuedAt: "2025-06-12T09:02:00.000Z",
  },
];

const MOCK_DEVICES: Device[] = [
  {
    id: "dev_001",
    name: "Ama's Pixel",
    platform: "android",
    protocol: "wireguard",
    status: "active",
    lastHandshakeAt: "2026-06-19T07:40:00.000Z",
    createdAt: "2026-06-12T10:00:00.000Z",
  },
  {
    id: "dev_002",
    name: "Work Laptop",
    platform: "windows",
    protocol: "wireguard",
    status: "active",
    lastHandshakeAt: "2026-06-17T18:10:00.000Z",
    createdAt: "2026-06-13T12:30:00.000Z",
  },
];

const MOCK_TICKETS: SupportTicket[] = [
  {
    id: "tkt_002",
    reference: "DS-4F2A1",
    subject: "Slow connection on mobile data",
    category: "Connection & performance",
    status: "open",
    updatedAt: "2026-06-18T15:20:00.000Z",
  },
  {
    id: "tkt_001",
    reference: "DS-3C7B9",
    subject: "How do I set up on a second device?",
    category: "Getting started",
    status: "resolved",
    updatedAt: "2026-06-14T11:05:00.000Z",
  },
];

function sampleWireGuardConfig(assignedIp: string): string {
  // Illustrative only. In production the device app generates the private key
  // client-side and only the public key reaches the backend.
  return [
    "[Interface]",
    "PrivateKey = <generated-on-your-device-and-never-sent-to-us>",
    `Address = ${assignedIp}/32`,
    "DNS = 10.8.0.1",
    "",
    "[Peer]",
    "PublicKey = <afrovpn-edge-node-public-key>",
    "AllowedIPs = 0.0.0.0/0, ::/0",
    "Endpoint = accra-1.edge.afrovpn.net:51820",
    "PersistentKeepalive = 25",
  ].join("\n");
}

class MockPortalClient implements PortalClient {
  private devices = [...MOCK_DEVICES];

  async getUser() {
    return MOCK_USER;
  }
  async getSubscription() {
    return MOCK_SUBSCRIPTION;
  }
  async getInvoices() {
    return MOCK_INVOICES;
  }
  async getDevices() {
    return this.devices.filter((d) => d.status === "active");
  }
  async getDevice(id: string) {
    return this.devices.find((d) => d.id === id) ?? null;
  }
  async addDevice(input: NewDeviceInput): Promise<DeviceConfig> {
    const assignedIp = `10.8.0.${this.devices.length + 2}`;
    const device: Device = {
      id: `dev_${Math.random().toString(36).slice(2, 8)}`,
      name: input.name,
      platform: input.platform,
      protocol: input.protocol,
      status: "active",
      lastHandshakeAt: null,
      createdAt: new Date().toISOString(),
    };
    this.devices.push(device);
    return {
      device,
      assignedIp,
      configText: sampleWireGuardConfig(assignedIp),
    };
  }
  async revokeDevice(id: string) {
    this.devices = this.devices.map((d) =>
      d.id === id ? { ...d, status: "revoked" as const } : d,
    );
  }
  async getTickets() {
    return MOCK_TICKETS;
  }
}

/**
 * Skeleton HTTP client for the real backend. Implement each method to call your
 * VPN/account API (PORTAL_API_BASE_URL) with the session token, then return it
 * from `getPortalClient()`. Left unimplemented intentionally for the shell.
 */
// class HttpPortalClient implements PortalClient { /* TODO: wire to backend */ }

let singleton: PortalClient | null = null;

export function getPortalClient(): PortalClient {
  if (singleton) return singleton;
  // const base = process.env.PORTAL_API_BASE_URL;
  // if (base) { singleton = new HttpPortalClient(base); return singleton; }
  singleton = new MockPortalClient();
  return singleton;
}
