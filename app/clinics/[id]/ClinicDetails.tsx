"use client";

import { MapPin, Phone, Clock, Share2 } from "lucide-react";

interface ClinicDetailsProps {
  address: string;
  phone: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
  shareUrl: string;
}

export default function ClinicDetails({
  address,
  phone,
  isOpen,
  openTime,
  closeTime,
  shareUrl,
}: ClinicDetailsProps) {
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: "Clinic", url: shareUrl });
    } else {
      await navigator.clipboard.writeText(shareUrl);
      alert("Link copied");
    }
  };

  return (
    <section className="bg-white rounded-2xl shadow-sm p-5 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex gap-3">
          <MapPin className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-semibold">Address</p>
            <p className="text-sm text-gray-600">{address}</p>
          </div>
        </div>

        <div className="flex gap-3">
          <Phone className="w-5 h-5 text-blue-600" />
          <a href={`tel:${phone}`} className="text-blue-600">
            {phone}
          </a>
        </div>

        <div className="flex gap-3">
          <Clock className="w-5 h-5 text-blue-600" />
          <span className={isOpen ? "text-green-600" : "text-red-600"}>
            {isOpen ? "Open Now" : "Closed"} ({openTime} – {closeTime})
          </span>
        </div>

        <div className="flex gap-3">
          <Share2 className="w-5 h-5 text-blue-600" />
          <button onClick={handleShare} className="text-blue-600">
            Share
          </button>
        </div>
      </div>
    </section>
  );
}
