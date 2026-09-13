import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Heart, Check, QrCode, ExternalLink, Copy, ShieldCheck, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";
import { ZAPPAY_PAYMENT_URL } from "../components/UpiPaymentFlow";

interface SupportUsPageProps {
  onToast: (msg: string) => void;
}

export const SupportUsPage: React.FC<SupportUsPageProps> = ({ onToast }) => {
  const [amount, setAmount] = useState<number>(50);
  const [completed, setCompleted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(ZAPPAY_PAYMENT_URL);
    setCopied(true);
    onToast("✓ Payment link copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenPaymentLink = () => {
    window.open(ZAPPAY_PAYMENT_URL, "_blank", "noopener,noreferrer");
    onToast("Payment link opened in new tab. Thank you for supporting!");
  };

  const handleConfirmPaid = () => {
    setCompleted(true);
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch {
      // safe fallback
    }
    onToast("Thank you so much for your support! ❤️");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-600 border border-rose-200">
          <Heart className="w-3.5 h-3.5 fill-rose-500" />
          <span>Support Us</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 tracking-tight">
          Keep Resume Maker Free & Fast
        </h1>
        <p className="text-sm text-gray-600 max-w-lg mx-auto leading-relaxed">
          Resume Maker is 100% free for everyone. If it helped you land your next job, you can support server & maintenance costs with a small voluntary payment.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-6">
        {completed ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <Heart className="w-7 h-7 fill-rose-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              Thank You for Your Generous Support! 🎉
            </h3>
            <p className="text-xs text-gray-600 max-w-md mx-auto leading-relaxed">
              Your contribution helps keep Resume Maker free, fast, and accessible for job seekers everywhere.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                Choose Contribution Amount
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[50, 100, 250, 500].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setAmount(val)}
                    className={`py-2.5 rounded-lg border text-sm font-semibold transition-colors ${
                      amount === val
                        ? "border-rose-500 bg-rose-50 text-rose-600"
                        : "border-gray-200 hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    ₹{val}
                  </button>
                ))}
              </div>
            </div>

            {/* Official QR Code display */}
            <div className="p-5 bg-rose-50/40 rounded-xl border border-rose-200 flex flex-col items-center justify-center text-center space-y-3">
              <div className="p-3 bg-white rounded-xl border border-gray-200 shadow-2xs">
                <QRCodeSVG
                  value={ZAPPAY_PAYMENT_URL}
                  size={170}
                  level="H"
                  includeMargin={true}
                />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-gray-900 flex items-center justify-center gap-1">
                  <QrCode className="w-3.5 h-3.5 text-rose-600" />
                  <span>Scan to Pay via Any UPI App</span>
                </p>
                <p className="text-[11px] text-gray-500">
                  Google Pay • PhonePe • Paytm • BHIM • Cred
                </p>
              </div>

              <div className="w-full flex gap-2 pt-1 max-w-sm">
                <button
                  type="button"
                  onClick={handleOpenPaymentLink}
                  className="flex-1 py-2 px-3 rounded-lg text-xs font-bold text-rose-700 bg-white hover:bg-rose-100/70 border border-rose-300 transition-colors flex items-center justify-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Payment Link</span>
                </button>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="py-2 px-3 rounded-lg text-xs font-medium text-gray-700 bg-white hover:bg-gray-100 border border-gray-300 transition-colors flex items-center justify-center gap-1"
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

            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600 shrink-0" />
                <span>One-time voluntary tip — no subscriptions or recurring fees.</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600 shrink-0" />
                <span>Instant high-resolution PDF download access.</span>
              </div>
            </div>

            <button
              id="support-us-completed-btn"
              onClick={handleConfirmPaid}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>I Have Completed Payment</span>
            </button>

            <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-gray-400" />
              <span>Safe and encrypted UPI payments via ZapPay</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};
