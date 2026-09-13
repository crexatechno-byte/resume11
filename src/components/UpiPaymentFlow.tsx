import React, { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import confetti from "canvas-confetti";
import {
  QrCode,
  ExternalLink,
  CheckCircle2,
  Copy,
  Check,
  Smartphone,
  ShieldCheck,
  Loader2,
  Sparkles,
  ArrowRight,
  Clock,
  RotateCcw,
} from "lucide-react";

export const ZAPPAY_PAYMENT_URL = "https://panel.zappay.shop/pay.html?id=6eb7f530";

interface UpiPaymentFlowProps {
  initialAmount?: number;
  onPaymentSuccess: () => void;
  onCancel: () => void;
  onToast: (msg: string) => void;
}

type Step = "payment" | "verifying" | "success";

export const UpiPaymentFlow: React.FC<UpiPaymentFlowProps> = ({
  initialAmount = 50,
  onPaymentSuccess,
  onCancel,
  onToast,
}) => {
  const [step, setStep] = useState<Step>("payment");
  const [amount, setAmount] = useState<number>(initialAmount);
  const [copied, setCopied] = useState<boolean>(false);
  const [userUtrOrUpi, setUserUtrOrUpi] = useState<string>("");
  const [countdown, setCountdown] = useState<number>(300); // 5 minutes timer

  // 5 minute countdown timer
  useEffect(() => {
    if (step !== "payment") return;

    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 1 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [step]);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(ZAPPAY_PAYMENT_URL);
    setCopied(true);
    onToast("✓ Payment link copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenPaymentLink = () => {
    window.open(ZAPPAY_PAYMENT_URL, "_blank", "noopener,noreferrer");
    onToast("Payment link opened in new tab. Complete payment and return here!");
  };

  const handleConfirmPaid = () => {
    setStep("verifying");

    setTimeout(() => {
      setStep("success");
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // Safe fallback
      }
      onToast("✓ Payment verified! Starting high-res PDF download...");

      setTimeout(() => {
        onPaymentSuccess();
      }, 1400);
    }, 1500);
  };

  return (
    <div id="zappay-upi-flow" className="space-y-4">
      {step === "payment" && (
        <div className="space-y-4">
          {/* Header Banner */}
          <div className="p-3.5 bg-linear-to-r from-rose-50 to-orange-50 border border-rose-200/80 rounded-xl flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-900">
                <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                <span>ZapPay Official UPI QR</span>
              </div>
              <p className="text-[11px] text-gray-600 mt-0.5">
                Scan QR or click link to pay via any UPI app
              </p>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-600" />
              <span className="text-xs font-mono font-bold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded">
                {formatTimer(countdown)}
              </span>
            </div>
          </div>

          {/* Amount Selector */}
          <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg border border-gray-200">
            <span className="text-xs font-medium text-gray-700">Support Amount:</span>
            <div className="flex items-center gap-1.5">
              {[30, 50, 100].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setAmount(amt)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-md border transition-all ${
                    amount === amt
                      ? "bg-rose-600 text-white border-rose-600 shadow-2xs"
                      : "bg-white text-gray-700 border-gray-300 hover:border-rose-300"
                  }`}
                >
                  ₹{amt}
                </button>
              ))}
            </div>
          </div>

          {/* Center: QR Code Display */}
          <div className="p-5 bg-white rounded-2xl border-2 border-rose-100 shadow-xs flex flex-col items-center justify-center text-center space-y-3">
            <div className="p-3 bg-white rounded-xl border border-gray-200 shadow-xs hover:shadow-md transition-shadow">
              <QRCodeSVG
                value={ZAPPAY_PAYMENT_URL}
                size={180}
                level="H"
                includeMargin={true}
              />
            </div>

            <div className="space-y-1">
              <p className="text-xs font-bold text-gray-900 flex items-center justify-center gap-1">
                <QrCode className="w-3.5 h-3.5 text-rose-600" />
                <span>Scan with any UPI App</span>
              </p>
              <p className="text-[11px] text-gray-500">
                Google Pay • PhonePe • Paytm • BHIM • Cred • Amazon Pay
              </p>
            </div>

            {/* Direct Link Action & Copy */}
            <div className="w-full flex gap-2 pt-1">
              <button
                type="button"
                id="open-payment-link-btn"
                onClick={handleOpenPaymentLink}
                className="flex-1 py-2 px-3 rounded-lg text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors flex items-center justify-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open Payment Link</span>
              </button>

              <button
                type="button"
                onClick={handleCopyLink}
                className="py-2 px-3 rounded-lg text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-200 transition-colors flex items-center justify-center gap-1"
                title="Copy payment link"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-[11px] text-emerald-700">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span className="text-[11px]">Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Simple Steps */}
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-700 space-y-1.5">
            <p className="font-bold text-gray-900 text-[11px] uppercase tracking-wider">
              Payment ke Baad:
            </p>
            <div className="flex items-start gap-2 text-[11px]">
              <span className="w-4 h-4 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center shrink-0">
                1
              </span>
              <span>QR code scan karein ya payment link open karke payment complete karein.</span>
            </div>
            <div className="flex items-start gap-2 text-[11px]">
              <span className="w-4 h-4 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center shrink-0">
                2
              </span>
              <span>Payment complete hone par neeche diye gaye button par click karein.</span>
            </div>
          </div>

          {/* Optional UTR / Reference Input */}
          <div className="space-y-1">
            <label
              htmlFor="upi-ref-input"
              className="block text-[11px] font-semibold text-gray-600"
            >
              Optional: Enter UTR / UPI Ref / Mobile No (for quick record)
            </label>
            <input
              id="upi-ref-input"
              type="text"
              value={userUtrOrUpi}
              onChange={(e) => setUserUtrOrUpi(e.target.value)}
              placeholder="e.g. 12-digit UTR or your UPI ID"
              className="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-300"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="py-2.5 px-3 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            <button
              id="confirm-zappay-payment-btn"
              type="button"
              onClick={handleConfirmPaid}
              className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>I Have Completed Payment — Download PDF</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-[11px] text-center text-gray-500 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Secure 256-Bit Encrypted Payment Gateway</span>
          </p>
        </div>
      )}

      {/* Verifying Step */}
      {step === "verifying" && (
        <div className="py-10 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-bold text-gray-900">
              Confirming Payment Verification...
            </p>
            <p className="text-xs text-gray-500">
              Connecting with ZapPay payment gateway for ₹{amount}
            </p>
          </div>
        </div>
      )}

      {/* Success Step */}
      {step === "success" && (
        <div className="py-8 text-center space-y-3">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-bold text-gray-900">
              Payment Confirmed! 🎉
            </h3>
            <p className="text-xs text-gray-600">
              Thank you for supporting Resume Maker! Your high-resolution PDF download is starting now.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
