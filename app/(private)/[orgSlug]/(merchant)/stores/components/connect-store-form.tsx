'use client'

import { useState } from "react";
import PlatformCard from "./platform-card"
import WooConnectionSteps from "./woo-connection-steps"
import ShopifyConnectionSteps from "./shopify-connection-steps";

function ConnectStoreForm() {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);

  return (
    <div className="flex-grow w-full mx-auto flex flex-col min-h-0 overflow-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8 shrink-0">
        <div
          onClick={() => setSelectedPlatform('woo')}
          className={`group cursor-pointer rounded-2xl p-6 border-2 transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${selectedPlatform === 'woo'
            ? 'bg-primary/5 border-primary/20 shadow-lg shadow-primary/5 ring-1 ring-primary/20'
            : 'bg-card border-border hover:border-primary/10 hover:shadow-xl hover:-translate-y-0.5'
            }`}
        >
          <PlatformCard isSelected={selectedPlatform === 'woo'} platformName="WooCommerce" description="Connect your self-hosted WordPress store using our official plugin & secure token." />
        </div>
        <div
          onClick={() => setSelectedPlatform('shopify')}
          className={`group cursor-pointer rounded-2xl p-6 border-2 transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${selectedPlatform === 'shopify'
            ? 'bg-primary/5 border-primary/20 shadow-lg shadow-primary/5 ring-1 ring-primary/20'
            : 'bg-card border-border hover:border-primary/10 hover:shadow-xl hover:-translate-y-0.5'
            }`}
        >
          <PlatformCard isSelected={selectedPlatform === 'shopify'} platformName="Shopify" description="Connected your shopify website by installing our app." />
        </div>
      </div>
      {selectedPlatform && (
        <div className="flex-1 border border-border rounded-2xl p-6 md:p-8 shadow-sm transition-all duration-300 overflow-y-auto min-h-0">
          {/* woo connection instructions */}
          {selectedPlatform === 'woo' && (
            <WooConnectionSteps />
          )}

          {/* shopify connection instructions */}
          {selectedPlatform === 'shopify' && (
            <ShopifyConnectionSteps />
          )}
        </div>
      )}
    </div>
  )
}

export default ConnectStoreForm