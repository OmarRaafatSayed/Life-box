import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminLayoutClient from "./AdminLayoutClient";
import "../globals.css";

async function loginAction(formData: FormData) {
  "use server";
  const pw = formData.get("password") as string;
  const expected = process.env.ADMIN_PASSWORD ?? "admin123";
  if (pw === expected) {
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "1", {
      httpOnly: true,
      path: "/admin",
      maxAge: 60 * 60 * 24,
    });
    redirect("/admin");
  }
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session) {
    return (
      <html lang="ar" dir="rtl">
        <body className="min-h-screen flex items-center justify-center" style={{ background: "#3D1A6E" }}>
          <div className="w-full max-w-md mx-4">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="px-8 py-6 text-center" style={{ background: "#3D1A6E" }}>
                <div
                  className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.15)" }}
                >
                  <span className="text-3xl font-black text-white">LB</span>
                </div>
                <h1 className="text-2xl font-black text-white mb-1">لايف بوكس</h1>
                <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>
                  لوحة التحكم
                </p>
              </div>

              {/* Login Form */}
              <form action={loginAction} className="p-8">
                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    كلمة المرور
                  </label>
                  <input
                    name="password"
                    type="password"
                    placeholder="أدخل كلمة المرور"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none text-gray-700 transition-colors text-right"
                    style={{ direction: "rtl" }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl text-white font-bold text-sm transition-all hover:opacity-90"
                  style={{ background: "#3D1A6E" }}
                >
                  تسجيل الدخول
                </button>

                <p className="text-center text-xs text-gray-500 mt-6">
                  كلمة المرور الافتراضية:{" "}
                  <code className="px-2 py-1 bg-gray-100 rounded text-gray-700 font-mono">admin123</code>
                </p>
              </form>
            </div>

            <div className="text-center mt-6 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
              <p>🔒 وصول آمن للمسؤول</p>
            </div>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="ar" dir="rtl">
      <body>
        <AdminLayoutClient>{children}</AdminLayoutClient>
      </body>
    </html>
  );
}
