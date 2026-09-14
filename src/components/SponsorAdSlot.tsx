import React, { useState, useEffect, useRef } from "react";
import { SponsorAdConfig } from "../types";
import { ExternalLink, AlertCircle } from "lucide-react";
import { SMART_LINK_URL } from "../config/ads";

export const defaultSponsorAdConfig: SponsorAdConfig = {
  enabled: true,
  durationSeconds: 5,
  skipDelaySeconds: 2,
  sponsorName: "Verified Career Partner",
  title: "Ace Your Job Search & Unlock Exclusive Hiring Perks",
  tagLine: "Explore high-paying remote roles, interview resources, and verified career tools today.",
  callToAction: "Explore Partner Deal",
  sponsorUrl: SMART_LINK_URL,
  badgeText: "Sponsored",
  mediaType: "interactive",
};

interface SponsorAdSlotProps {
  config?: SponsorAdConfig;
  onAdComplete: () => void;
  simulateError?: boolean;
}

export const SponsorAdSlot: React.FC<SponsorAdSlotProps> = ({
  config = defaultSponsorAdConfig,
  onAdComplete,
  simulateError = false,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState(config.durationSeconds);
  const [canSkip, setCanSkip] = useState(false);
  const [hasError] = useState(simulateError);
  const [fallbackCountdown, setFallbackCountdown] = useState(3);
  const hasCompletedRef = useRef(false);

  // Countdown timer (pure state updates only)
  useEffect(() => {
    if (hasError) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const skipTimer = setTimeout(() => {
      setCanSkip(true);
    }, config.skipDelaySeconds * 1000);

    return () => {
      clearInterval(timer);
      clearTimeout(skipTimer);
    };
  }, [hasError, config.skipDelaySeconds]);

  // Trigger completion in effect when countdown reaches zero
  useEffect(() => {
    if (!hasError && secondsRemaining <= 0 && !hasCompletedRef.current) {
      hasCompletedRef.current = true;
      onAdComplete();
    }
  }, [hasError, secondsRemaining, onAdComplete]);

  // Graceful fallback if ad fails to load (pure state updates only)
  useEffect(() => {
    if (!hasError) return;

    const fallbackTimer = setInterval(() => {
      setFallbackCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(fallbackTimer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(fallbackTimer);
  }, [hasError]);

  // Trigger fallback completion in effect
  useEffect(() => {
    if (hasError && fallbackCountdown <= 0 && !hasCompletedRef.current) {
      hasCompletedRef.current = true;
      onAdComplete();
    }
  }, [hasError, fallbackCountdown, onAdComplete]);

  const handleSkip = () => {
    if (!hasCompletedRef.current) {
      hasCompletedRef.current = true;
      onAdComplete();
    }
  };

  if (hasError) {
    return (
      <div
        id="sponsor-ad-fallback"
        className="p-5 rounded-lg bg-amber-50 border border-amber-200 text-center space-y-2"
      >
        <div className="w-8 h-8 mx-auto rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
          <AlertCircle className="w-4 h-4" />
        </div>
        <h4 className="text-sm font-semibold text-amber-900">
          Ad failed to load
        </h4>
        <p className="text-xs text-amber-700">
          Your free download will start automatically in{" "}
          <span className="font-bold">{fallbackCountdown}s</span>.
        </p>
      </div>
    );
  }

  return (
    <div
      id="sponsor-ad-slot-container"
      className="rounded-lg border border-gray-200 bg-gray-50 p-5 space-y-4 text-gray-900"
    >
      {/* Top Header & Countdown */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200">
          {config.badgeText}
        </span>

        <div className="flex items-center gap-2 text-xs">
          <span className="font-medium text-gray-600">
            Ad ends in <span className="font-bold text-gray-900">{secondsRemaining}s</span>
          </span>

          {canSkip && (
            <button
              id="skip-sponsor-ad-btn"
              onClick={handleSkip}
              className="px-2.5 py-1 rounded bg-white hover:bg-gray-100 border border-gray-300 text-xs font-medium text-gray-700 transition-colors"
            >
              Skip Ad
            </button>
          )}
        </div>
      </div>

      {/* Main Sponsor Content Card */}
      <div className="p-4 rounded-lg bg-white border border-gray-200 space-y-2">
        <div className="flex justify-between items-start">
          <span className="text-xs font-semibold text-blue-600">
            {config.sponsorName}
          </span>
          <a
            href={config.sponsorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
          >
            <span>{config.callToAction}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
        <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-snug">
          {config.title}
        </h3>
        <p className="text-xs text-gray-600 leading-relaxed">
          {config.tagLine}
        </p>
      </div>

      {/* Auto-start notice & Owner Config Info */}
      <div className="pt-2 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-[11px] text-gray-500">
        <span>Download begins automatically once the countdown finishes.</span>
        <span className="text-[10px] text-gray-400">
          Manageable sponsor slot (swappable by site owner)
        </span>
      </div>
    </div>
  );
};
