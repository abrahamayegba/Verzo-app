"use client";
import { useEffect } from "react";
import Script from "next/script";

interface VgsCardProps {
  cardToken: string;
  sourceId: string;
}

declare global {
  interface Window {
    VGSShow: any;
  }
}

const VgsCard: React.FC<VgsCardProps> = ({ cardToken, sourceId }) => {
  useEffect(() => {
    if (window.VGSShow) {
      const show = window.VGSShow.create("tntpaxvvvet");
      const cvv2iframe = show.request({
        name: "cvv-text",
        method: "GET",
        path: `/cards/${sourceId}/secure-data/cvv2`,
        headers: {
          Authorization: `Bearer ${cardToken}`,
        },
        htmlWrapper: "text",
        jsonPathSelector: "data.cvv2",
      });
      cvv2iframe.render("#cvv2");

      const cardNumberIframe = show.request({
        name: "pan-text",
        method: "GET",
        path: `/cards/${sourceId}/secure-data/number`,
        headers: {
          Authorization: `Bearer ${cardToken}`,
        },
        htmlWrapper: "text",
        jsonPathSelector: "data.number",
      });
      cardNumberIframe.render("#cardNumber");

      const pinIframe = show.request({
        name: "pin-text",
        method: "GET",
        path: `/cards/${sourceId}/secure-data/defaultPin`,
        headers: {
          Authorization: `Bearer ${cardToken}`,
        },
        htmlWrapper: "text",
        jsonPathSelector: "data.defaultPin",
      });
      pinIframe.render("#pin");
    }
  });

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Sensitive Data Example</h2>
      <label className="block mb-2">Card Number:</label>
      <div id="cardNumber" className="mb-4 p-2 border rounded"></div>
      <label className="block mb-2">CVV2:</label>
      <div id="cvv2" className="mb-4 p-2 border rounded"></div>
      <label className="block mb-2">Default PIN:</label>
      <div id="pin" className="p-2 border rounded"></div>
      <Script
        src="https://js.verygoodvault.com/vgs-show/1.5/ACcHSbXEBmKzyoAT5fzzyLTu.js"
        strategy="beforeInteractive"
      />
    </div>
  );
};

export default VgsCard;
