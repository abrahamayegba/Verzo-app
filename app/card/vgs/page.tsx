import VgsCard from "@/components/VGSCard";
import React from "react";

const VGS = () => {
  const cardToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjcyY2Q0Mjc3YjY5NDA1M2JhYmRkNDUiLCJ0eXBlIjoiQ0FSRFRPS0VOIiwiaWF0IjoxNzE4OTg3MDYxLCJleHAiOjE3MTg5ODcxODF9.FTfsz6DefxLlzIcfrfmGmcAcfSgWAXsEHpQCHDbFnO8";
  const sourceId = "6672cd4277b694053babdd45";

  return (
    <div className="mx-auto p-4">
      <VgsCard cardToken={cardToken} sourceId={sourceId} />
    </div>
  );
};

export default VGS;
