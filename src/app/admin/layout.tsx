import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminSidebar from "./AdminSidebar";

async function loginAction(formData: FormData) {
  "use server";
  const pw = formData.get("password") as string;
  const expected = process.env.ADMIN_PASSWORD ?? "admin123";
  if (pw === expected) {
    const { cookies: c } = await import("next/headers");
    const cookieStore = await c();
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
      <html lang="en">
        <body
          className="min-h-screen flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #1a0a3c 0%, #3D1A6E 50%, #E91E8C 100%)" }}
        >
          <div
            className="w-full max-w-sm rounded-3xl p-8 shadow-2xl"
            style={{ background: "white" }}
          >
            {/* Logo */}
            <div className="flex items-center gap-2 mb-8 justify-center">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-lg"
                style={{ background: "linear-gradient(135deg, #3D1A6E, #E91E8C)" }}
              >
                LB
              </div>
              <span className="text-2xl font-black" style={{ color: "#3D1A6E" }}>
                Life Box
              </span>
            </div>
            <h1 className="text-xl font-black text-center mb-6" style={{ color: "#1a0a3c" }}>
              Admin Dashboard
            </h1>
            <form action={loginAction} className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-bold text-gray-700 block mb-1.5">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="Enter admin password"
                  required
                  className="w-full h-12 px-5 rounded-3xl border-2 border-gray-200 focus:border-[#3D1A6E] focus:outline-none text-sm transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-3xl text-white font-black transition-all hover:scale-105 hover:shadow-xl"
                style={{ background: "linear-gradient(135deg, #3D1A6E, #E91E8C)" }}
              >
                Login
              </button>
            </form>
            <p className="text-center text-xs text-gray-400 mt-4">
              Default: <code className="font-mono bg-gray-100 px-2 py-0.5 rounded-lg">admin123</code>
            </p>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className="min-h-screen flex" style={{ background: "#F8F5FF" }}>
        <AdminSidebar />
        <main className="flex-1 min-h-screen">{children}</main>
      </body>
    </html>
  );
}
