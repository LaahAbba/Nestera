"use client";

import React from "react";
import { FeatureFlagProvider } from "../context/FeatureFlagContext";
import { WalletProvider } from "../context/WalletContext";
import { OnboardingProvider } from "../context/OnboardingContext";
import { OnboardingWizard } from "../components/OnboardingWizard";
import { useWallet } from "../context/WalletContext";

function InnerDashboardProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const { address, network } = useWallet();

  return (
    <FeatureFlagProvider userContext={{ address, network }}>
      {children}
      <OnboardingWizard />
    </FeatureFlagProvider>
  );
}

/**
 * Client-side providers for the dashboard.
 * Bridges server layout → client context.
 */
export default function DashboardProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WalletProvider>
      <OnboardingProvider>
        <InnerDashboardProviders>{children}</InnerDashboardProviders>
      </OnboardingProvider>
    </WalletProvider>
  );
}
