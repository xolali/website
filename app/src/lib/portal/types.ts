/**
 * AfroVPN Customer Portal — domain types.
 * Mirror of the data model in architecture/CUSTOMER-PORTAL-ARCHITECTURE.md.
 * These are the contracts the UI depends on; the data layer (mock now, your
 * VPN backend later) must satisfy them.
 */

export type PlanId = "monthly" | "annual" | "biennial";

export type SubscriptionStatus =
  | "trialing"
  | "active"
  | "past_due"
  | "cancelled"
  | "expired";

export type DeviceStatus = "active" | "revoked";
export type DevicePlatform = "android" | "ios" | "windows" | "macos" | "linux";
export type VpnProtocol = "wireguard" | "openvpn";

export type TicketStatus =
  | "open"
  | "in_progress"
  | "awaiting_reply"
  | "resolved"
  | "closed";

export interface PortalUser {
  id: string;
  email: string;
  fullName: string | null;
  country: string;
  mfaEnabled: boolean;
}

export interface Subscription {
  id: string;
  planId: PlanId;
  planName: string;
  status: SubscriptionStatus;
  priceLabel: string; // e.g. "GH₵504 / year"
  currentPeriodEnd: string; // ISO
  cancelAtPeriodEnd: boolean;
  deviceLimit: number;
}

export interface Invoice {
  id: string;
  amountLabel: string; // e.g. "GH₵504"
  status: "paid" | "failed" | "refunded" | "pending";
  paystackReference: string;
  issuedAt: string; // ISO
}

export interface Device {
  id: string;
  name: string;
  platform: DevicePlatform;
  protocol: VpnProtocol;
  status: DeviceStatus;
  lastHandshakeAt: string | null; // coarse liveness only — never a log
  createdAt: string; // ISO
}

export interface SupportTicket {
  id: string;
  reference: string; // e.g. DS-4F2A1
  subject: string;
  category: string;
  status: TicketStatus;
  updatedAt: string; // ISO
}

/** Result of provisioning a device — secrets are returned once, never stored. */
export interface DeviceConfig {
  device: Device;
  /** WireGuard .conf contents (or OpenVPN bundle text). Shown once. */
  configText: string;
  /** Tunnel address assigned by the control plane. */
  assignedIp: string;
}

export interface NewDeviceInput {
  name: string;
  platform: DevicePlatform;
  protocol: VpnProtocol;
  /** Client-generated WG public key (preferred). Optional for the shell. */
  publicKey?: string;
}
