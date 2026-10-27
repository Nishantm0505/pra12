
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Link,
  Outlet,
  Navigate,
} from "react-router-dom";

const orders = [
  { id: "NX-2048", customer: "Aarav Sharma", product: "AirPods Pro", price: 24999, date: "27 Oct 2026", status: "Processing", initials: "AS", color: "bg-violet-500" },
  { id: "NX-2047", customer: "Diya Patel", product: "iPhone 16", price: 69999, date: "26 Oct 2026", status: "Shipped", initials: "DP", color: "bg-pink-500" },
  { id: "NX-2046", customer: "Reyansh Shah", product: "MacBook Air", price: 89999, date: "25 Oct 2026", status: "Delivered", initials: "RS", color: "bg-cyan-600" },
  { id: "NX-2045", customer: "Ananya Mehta", product: "Apple Watch", price: 32999, date: "24 Oct 2026", status: "Delivered", initials: "AM", color: "bg-amber-500" },
  { id: "NX-2044", customer: "Krish Desai", product: "Sony Headphones", price: 19999, date: "23 Oct 2026", status: "Cancelled", initials: "KD", color: "bg-rose-500" },
  { id: "NX-2043", customer: "Myra Joshi", product: "iPad Air", price: 59999, date: "22 Oct 2026", status: "Delivered", initials: "MJ", color: "bg-emerald-600" },
  { id: "NX-2042", customer: "Vivaan Shah", product: "Gaming Mouse", price: 4999, date: "21 Oct 2026", status: "Cancelled", initials: "VS", color: "bg-blue-500" },
];

const money = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

function Status({ status }) {
  const styles = {
    Processing: "bg-amber-400/10 text-amber-300 border-amber-400/20",
    Shipped: "bg-sky-400/10 text-sky-300 border-sky-400/20",
    Delivered: "bg-emerald-400/10 text-emerald-300 border-emerald-400/20",
    Cancelled: "bg-rose-400/10 text-rose-300 border-rose-400/20",
  };

  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${styles[status]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

function Sidebar() {
  const navClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all duration-200 ${
      isActive
        ? "bg-violet-500/15 font-semibold text-violet-200 ring-1 ring-violet-400/20"
        : "text-slate-400 hover:bg-white/5 hover:text-white"
    }`;

  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-white/10 bg-[#101019] p-5 lg:min-h-screen lg:w-64 lg:border-b-0 lg:border-r">
      <Link to="/orders" className="mb-8 flex items-center gap-3 px-2">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-xl font-black shadow-lg shadow-violet-500/20">
          N
        </div>
        <div>
          <p className="text-lg font-black tracking-wider text-white">
            NEXORA<span className="text-violet-400">.</span>
          </p>
          <p className="text-[10px] tracking-[0.24em] text-slate-500">
            COMMERCE OS
          </p>
        </div>
      </Link>

      <p className="mb-3 px-3 text-[10px] font-bold tracking-[0.22em] text-slate-600">
        WORKSPACE
      </p>

      <nav className="flex gap-2 overflow-x-auto lg:flex-col">
        <NavLink to="/orders" end className={navClass}>
          <span className="text-lg">▦</span> Overview
        </NavLink>
        <NavLink to="/orders/current" className={navClass}>
          <span className="text-lg">◷</span> Current Orders
          <span className="ml-auto rounded-md bg-violet-400/15 px-2 py-0.5 text-xs text-violet-200">
            2
          </span>
        </NavLink>
        <NavLink to="/orders/history" className={navClass}>
          <span className="text-lg">↗</span> Order History
        </NavLink>
        <NavLink to="/orders/cancelled" className={navClass}>
          <span className="text-lg">⊘</span> Cancelled Orders
        </NavLink>
      </nav>

      <div className="mt-auto hidden rounded-2xl border border-violet-400/15 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/5 p-4 lg:block">
        <div className="mb-3 grid h-9 w-9 place-items-center rounded-xl bg-violet-400/15 text-lg">
          ✦
        </div>
        <p className="text-sm font-bold text-white">Nexora Pro</p>
        <p className="mt-2 text-xs leading-5 text-slate-400">
          Every order tells a story. Manage yours beautifully.
        </p>
        <p className="mt-4 text-[10px] tracking-widest text-violet-300">
          MADE FOR BETTER BUSINESS
        </p>
      </div>
    </aside>
  );
}

function Header() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-5 py-5 sm:px-8">
      <div>
        <p className="text-xs text-slate-500">Workspace / Orders</p>
        <h2 className="mt-1 text-xl font-bold text-white">Order Management</h2>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-slate-400 sm:block">
          ◉ &nbsp; System operational
        </div>
        <div className="grid h-10 w-10 place-items-center rounded-full border border-violet-400/30 bg-violet-400/10 font-bold text-violet-200">
          A
        </div>
      </div>
    </header>
  );
}

function StatCard({ label, value, icon, note, gradient }) {
  return (
    <div className="group rounded-2xl border border-white/[0.08] bg-[#12121d] p-5 transition duration-300 hover:-translate-y-1 hover:border-violet-400/30">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-400">{label}</p>
          <p className="mt-3 text-3xl font-black tracking-tight text-white">{value}</p>
        </div>
        <div className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${gradient} text-xl text-white`}>
          {icon}
        </div>
      </div>
      <p className="mt-4 text-xs text-slate-500">{note}</p>
    </div>
  );
}

function Overview() {
  const current = orders.filter((o) =>
    ["Processing", "Shipped"].includes(o.status)
  );
  const completed = orders.filter((o) => o.status === "Delivered");
  const cancelled = orders.filter((o) => o.status === "Cancelled");

  return (
    <div className="space-y-7">
      <div className="relative overflow-hidden rounded-3xl border border-violet-400/20 bg-gradient-to-r from-[#251849] via-[#19172d] to-[#101d2b] p-7 sm:p-9">
        <div className="absolute -right-10 -top-24 h-64 w-64 rounded-full bg-violet-500/20 blur-[70px]" />
        <div className="relative">
          <span className="rounded-full border border-violet-300/20 bg-violet-300/10 px-3 py-1.5 text-[10px] font-bold tracking-[0.2em] text-violet-200">
            YOUR BUSINESS, AT A GLANCE
          </span>
          <h1 className="mt-5 text-3xl font-black text-white sm:text-4xl">
            Orders, under control<span className="text-violet-400">.</span>
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400">
            Track purchases, review completed orders, and keep every
            customer experience moving forward.
          </p>
          <Link
            to="/orders/current"
            className="mt-6 inline-flex items-center gap-3 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#171326] transition hover:bg-violet-100"
          >
            View current orders <span>→</span>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total orders" value={orders.length} icon="▤" note="All sample transactions" gradient="from-violet-500 to-indigo-600" />
        <StatCard label="In progress" value={current.length} icon="◷" note="Processing + shipped" gradient="from-sky-500 to-blue-600" />
        <StatCard label="Successfully delivered" value={completed.length} icon="✓" note="Completed sample orders" gradient="from-emerald-500 to-teal-600" />
        <StatCard label="Cancelled" value={cancelled.length} icon="⊘" note="Cancelled sample orders" gradient="from-rose-500 to-pink-600" />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Link to="/orders/current" className="rounded-2xl border border-white/10 bg-[#12121d] p-5 transition hover:border-violet-400/40">
          <p className="text-xs font-semibold tracking-widest text-violet-300">01 / LIVE</p>
          <h3 className="mt-4 text-lg font-bold text-white">Current Orders ↗</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">Follow orders being processed or shipped.</p>
        </Link>
        <Link to="/orders/history" className="rounded-2xl border border-white/10 bg-[#12121d] p-5 transition hover:border-emerald-400/40">
          <p className="text-xs font-semibold tracking-widest text-emerald-300">02 / ARCHIVE</p>
          <h3 className="mt-4 text-lg font-bold text-white">Order History ↗</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">Review successfully delivered purchases.</p>
        </Link>
        <Link to="/orders/cancelled" className="rounded-2xl border border-white/10 bg-[#12121d] p-5 transition hover:border-rose-400/40">
          <p className="text-xs font-semibold tracking-widest text-rose-300">03 / REVIEW</p>
          <h3 className="mt-4 text-lg font-bold text-white">Cancelled Orders ↗</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">Review orders that did not complete.</p>
        </Link>
      </div>
    </div>
  );
}

function OrderList({ title, subtitle, filter, emptyMessage }) {
  const [search, setSearch] = useState("");

  const filtered = orders.filter((order) => {
    const matchesStatus = filter.includes(order.status);
    const matchesSearch =
      `${order.id} ${order.customer} ${order.product}`
        .toLowerCase()
        .includes(search.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs font-bold tracking-[0.22em] text-violet-300">
          ORDER CENTER / {filter.join(" + ").toUpperCase()}
        </p>
        <h1 className="mt-3 text-3xl font-black text-white">{title}</h1>
        <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#12121d] p-4">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-violet-500/10 text-lg text-violet-300">
            ⌕
          </span>
          <div>
            <p className="text-sm font-bold text-white">Find an order</p>
            <p className="text-xs text-slate-500">{filtered.length} matching records</p>
          </div>
        </div>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search ID, customer, product..."
          aria-label="Search orders"
          className="w-full rounded-xl border border-white/10 bg-[#0b0b13] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400/60 sm:max-w-72"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#12121d]">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
          <h2 className="font-bold text-white">Order records</h2>
          <span className="rounded-lg bg-white/5 px-3 py-1.5 text-xs text-slate-400">
            {filtered.length} orders
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left">
            <thead className="bg-white/[0.025] text-[10px] uppercase tracking-[0.16em] text-slate-500">
              <tr>
                <th className="px-5 py-4">Order / Product</th>
                <th className="px-5 py-4">Customer</th>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Amount</th>
                <th className="px-5 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {filtered.map((order) => (
                <tr key={order.id} className="transition hover:bg-white/[0.025]">
                  <td className="px-5 py-5">
                    <p className="text-sm font-bold text-violet-300">{order.id}</p>
                    <p className="mt-1 text-xs text-slate-400">{order.product}</p>
                  </td>
                  <td className="px-5 py-5">
                    <div className="flex items-center gap-3">
                      <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${order.color} text-xs font-bold text-white`}>
                        {order.initials}
                      </span>
                      <span className="text-sm text-slate-200">{order.customer}</span>
                    </div>
                  </td>
                  <td className="px-5 py-5 text-sm text-slate-400">{order.date}</td>
                  <td className="px-5 py-5 text-sm font-semibold text-white">{money(order.price)}</td>
                  <td className="px-5 py-5"><Status status={order.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="px-6 py-16 text-center">
            <span className="text-4xl">⌕</span>
            <p className="mt-4 font-semibold text-white">No orders found</p>
            <p className="mt-2 text-sm text-slate-500">{emptyMessage}</p>
            <button
              onClick={() => setSearch("")}
              className="mt-4 rounded-lg bg-violet-500/15 px-4 py-2 text-sm text-violet-200 hover:bg-violet-500/25"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function OrdersLayout() {
  return (
    <div className="space-y-6">
      <nav className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
        {[
          { to: ".", label: "Overview", end: true },
          { to: "current", label: "Current Orders" },
          { to: "history", label: "Order History" },
          { to: "cancelled", label: "Cancelled Orders" },
        ].map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.end}
            className={({ isActive }) =>
              `rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-violet-500 text-white shadow-lg shadow-violet-500/20"
                  : "bg-white/[0.035] text-slate-400 hover:bg-white/[0.08] hover:text-white"
              }`
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </nav>

      <Outlet />
    </div>
  );
}

function AppShell() {
  return (
    <div className="min-h-screen bg-[#0b0b13] text-white lg:flex">
      <Sidebar />
      <div className="min-w-0 flex-1">
        <Header />
        <main className="mx-auto max-w-[1500px] p-5 sm:p-8">
          <Routes>
            <Route index element={<Navigate to="current" replace />} />
            <Route path="current" element={
              <OrderList
                title="Current Orders"
                subtitle="Keep track of every purchase still in progress."
                filter={["Processing", "Shipped"]}
                emptyMessage="Try another order ID, customer name, or product."
              />
            } />
            <Route path="history" element={
              <OrderList
                title="Order History"
                subtitle="Your completed purchases, organized in one place."
                filter={["Delivered"]}
                emptyMessage="No delivered orders match your search."
              />
            } />
            <Route path="cancelled" element={
              <OrderList
                title="Cancelled Orders"
                subtitle="Review cancelled purchases and their records."
                filter={["Cancelled"]}
                emptyMessage="No cancelled orders match your search."
              />
            } />
          </Routes>
        </main>

        <footer className="border-t border-white/[0.07] px-5 py-5 text-center text-xs text-slate-600">
          NEXORA COMMERCE OS · BUILT WITH REACT ROUTER + TAILWIND CSS
        </footer>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center bg-[#0b0b13] px-6 text-center text-white">
      <div>
        <p className="text-7xl font-black text-violet-400">404</p>
        <h1 className="mt-4 text-2xl font-bold">Page not found</h1>
        <Link to="/orders" className="mt-6 inline-block rounded-xl bg-violet-500 px-5 py-3 font-semibold">
          Back to orders
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/orders/*" element={<AppShell />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
