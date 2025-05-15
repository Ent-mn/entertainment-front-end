import { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "react-toastify";

interface ResetPasswordNewProps {
  email: string;
  id: number;
  onSuccess: () => void;
}

export default function ResetPasswordNew({ email, id, onSuccess }: ResetPasswordNewProps) {
  const [password, setPassword] = useState("");
  const [repeat, setRepeat] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setError("");
    if (password.length < 8) {
      setError("Нууц үг хамгийн багадаа 8 тэмдэгт байх ёстой.");
      return;
    }
    if (password !== repeat) {
      setError("Нууц үг таарахгүй байна.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("/api/api_open", {
        sn: "customer_pasword_new",
        id,
        password,
      });
      if (res.data.status === "success") {
        toast.success("Нууц үг амжилттай солигдлоо!");
        onSuccess();
      } else {
        setError(res.data.message || "Алдаа гарлаа.");
      }
    } catch {
      setError("Сүлжээний алдаа.");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f3f3f3]">
      <div className="bg-white rounded-3xl p-8 shadow-md w-[400px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <img className="w-[30px] h-[30px]" src="/blacklogo.png" alt="" />
            <p className="text-2xl text-[#5C5C5C]">restaurant.mn</p>
          </div>
          <div className="flex items-center gap-1">
            <img src="/login/Vector.png" alt="" />
            <div className="text-[#5C5C5C] text-2xl w-9">en</div>
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-2">Reset password<span className="text-yellow-400">.</span></h1>
        <p className="mb-6 text-gray-500">Create your new password.</p>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full h-12 mb-4 px-4 border rounded"
        />
        <input
          type="password"
          placeholder="Repeat new password"
          value={repeat}
          onChange={e => setRepeat(e.target.value)}
          className="w-full h-12 mb-4 px-4 border rounded"
        />
        <Button onClick={handleSave} disabled={loading} className="w-full h-12">
          Save
        </Button>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        <div className="flex items-center justify-between mt-8">
          <div className="h-[1px] w-[130px] bg-[#e0e0e0]" />
          <div className="text-[#676767] text-xs mx-2">Or sign in with</div>
          <div className="h-[1px] w-[130px] bg-[#e0e0e0]" />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <button type="button" className="flex items-center justify-center gap-2 p-3 border border-[#e0e0e0] rounded-2xl bg-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="#1577f2">
              <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C18.34 21.21 22 17.06 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
            </svg>
            <span className="text-[#8c8c8c] text-xs">Sign in with Facebook</span>
          </button>
          <button type="button" className="flex items-center justify-center gap-2 p-3 border border-[#e0e0e0] rounded-2xl bg-white">
            <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            <span className="text-[#8c8c8c] text-xs">Sign in with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
} 