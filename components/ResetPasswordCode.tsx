import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { toast } from "react-toastify";

interface OtpInputProps {
  value: string;
  onChange: (v: string) => void;
}

const OtpInput = ({ value, onChange }: OtpInputProps) => {
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    if (!val) return;
    const arr = value.split("");
    arr[idx] = val;
    onChange(arr.join("").slice(0, 6));
    if (val && idx < 5) inputs.current[idx + 1]?.focus();
  };
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (e.key === "Backspace" && !value[idx] && idx > 0) {
      const arr = value.split("");
      arr[idx - 1] = "";
      onChange(arr.join("").slice(0, 6));
      inputs.current[idx - 1]?.focus();
    }
  };
  return (
    <div className="flex gap-2 py-2 justify-center">
      {[...Array(6)].map((_, i) => (
        <input
          key={i}
          type="text"
          maxLength={1}
          ref={(el) => {
            inputs.current[i] = el;
          }}
          value={value[i] || ""}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className="w-12 h-12 text-center text-xl border rounded"
        />
      ))}
    </div>
  );
};

interface ResetPasswordCodeProps {
  email: string;
  sentCode: string;
  onSuccess: () => void;
  onBack: () => void;
}

export default function ResetPasswordCode({
  email,
  sentCode,
  onSuccess,
  onBack,
}: ResetPasswordCodeProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(45);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleVerify = () => {
    setError("");
    if (code.length !== 6) {
      setError("6 оронтой кодоо бүрэн оруулна уу.");
      return;
    }
    if (code === sentCode) {
      toast.success("Код амжилттай баталгаажлаа!");
      onSuccess();
    } else {
      setError("Код буруу байна.");
    }
  };

  const handleResend = async () => {
    setTimer(45);
    // Optionally call resend API here
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url(/login/image.png)" }}
    >
      <div className="bg-white rounded-3xl p-8 shadow-md w-[400px] mx-auto">
        <button
          onClick={onBack}
          className="mb-4 flex items-center text-gray-500"
        >
          <ChevronLeft /> Буцах
        </button>
        <h1 className="text-2xl font-bold mb-2">
          Баталгаажуулах<span className="text-yellow-400">.</span>
        </h1>
        <p className="mb-6 text-gray-500">
          Таны и-мэйл хаягаар илгээсэн кодыг оруулна уу
        </p>
        <OtpInput value={code} onChange={setCode} />
        <div className="text-xs text-gray-400 mb-2">
          Дахин илгээх{" "}
          {timer > 0 ? (
            `0:${timer.toString().padStart(2, "0")}`
          ) : (
            <button onClick={handleResend} className="underline">
              Илгээх
            </button>
          )}
        </div>
        <Button
          onClick={handleVerify}
          disabled={loading || code.length !== 6}
          className="w-full h-12 mt-2"
        >
          Баталгаажуулах
        </Button>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      </div>
    </div>
  );
}
