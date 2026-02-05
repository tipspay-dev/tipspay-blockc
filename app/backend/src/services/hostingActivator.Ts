// services/hostingActivator.ts
type Payer = {
  id: string;
  walletAddress: string;
};

export async function activateHosting(payer: Payer, planId: string) {
  // ...
}

