<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>MediSwift — Superadmin Console</title>
<script src="https://cdn.tailwindcss.com"></script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="icon" type="image/svg+xml" href="{{ asset('favicon.ico') }}" />
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  :root{
    --bg:#F3F7FA;
    --surface:#FFFFFF;
    --ink:#132540;
    --ink-muted:#697487;
    --navy:#132C54;
    --blue:#2158B8;
    --teal:#17B4AC;
    --teal-2:#20D4C6;
    --grad: linear-gradient(90deg, var(--navy) 0%, var(--blue) 55%, var(--teal) 100%);
    --grad-soft: linear-gradient(90deg, rgba(19,44,84,.08) 0%, rgba(23,180,172,.10) 100%);
    --teal-soft:#E4F7F5;
    --blue-soft:#EAF1FC;
    --alert:#D3502F;
    --alert-soft:#FBEAE5;
    --warn:#C6821F;
    --warn-soft:#FBF1E1;
    --border:#E4E9F0;
  }
  body{ background:var(--bg); color:var(--ink); font-family:'Inter',sans-serif; }
  .font-display{ font-family:'Manrope',sans-serif; }
  .font-mono{ font-family:'IBM Plex Mono',monospace; }
  .sidebar{ background:var(--surface); border-right:1px solid var(--border); }
  .nav-link{ color:var(--ink-muted); transition:.15s; border-radius:10px; }
  .nav-link:hover{ background:#F3F6FA; color:var(--ink); }
  .nav-link.active{ background:var(--grad); color:#fff; box-shadow:0 4px 14px -4px rgba(23,140,172,.45); }
  .card{ background:var(--surface); border:1px solid var(--border); border-radius:16px; box-shadow:0 1px 2px rgba(19,37,64,.04), 0 8px 24px -18px rgba(19,37,64,.15); }
  .btn-grad{ background:var(--grad); }
  .pulse-dot{ width:7px;height:7px;border-radius:50%; background:var(--teal-2); box-shadow:0 0 0 0 rgba(32,212,198,.6); animation:pulse 2s infinite; }
  @keyframes pulse{ 0%{box-shadow:0 0 0 0 rgba(32,212,198,.5);} 70%{box-shadow:0 0 0 6px rgba(32,212,198,0);} 100%{box-shadow:0 0 0 0 rgba(32,212,198,0);} }
  .tab-view{ display:none; } .tab-view.active{ display:block; }
  .badge{ font-family:'IBM Plex Mono',monospace; font-size:11px; padding:2px 9px; border-radius:999px; letter-spacing:.02em; white-space:nowrap; }
  ::-webkit-scrollbar{ width:8px; height:8px; } ::-webkit-scrollbar-thumb{ background:#DCE3EC; border-radius:8px; }
  .stage{ flex:1; text-align:center; padding:10px 6px; border-radius:12px; background:#F8FAFC; border:1px solid var(--border); }
  .stage .n{ font-family:'IBM Plex Mono',monospace; font-weight:600; font-size:18px; }
  .stage .l{ font-size:10.5px; color:var(--ink-muted); margin-top:2px; }
</style>
</head>
<body class="text-[15px]">

<div class="flex min-h-screen">

  <!-- SIDEBAR -->
  <aside class="sidebar w-64 shrink-0 flex flex-col justify-between py-5">
    <div>
      <div class="px-5 pb-5 mb-3 border-b" style="border-color:var(--border)">
        <img src="{{ asset('assets/images/logo/horizontal/horizontal-erased.png') }}" alt="MediSwift" class="h-20 object-contain object-left">
        <div class="text-[11px] font-mono tracking-wide" style="color:var(--ink-muted)">SUPERADMIN CONSOLE</div>
      </div>
      <nav class="mt-1 space-y-0.5 px-3 text-sm">
        <a onclick="showTab('overview', this)" class="nav-link active flex items-center gap-3 px-3 py-2.5 cursor-pointer font-medium">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
          Overview
        </a>
        <a onclick="showTab('prescriptions', this)" class="nav-link flex items-center gap-3 px-3 py-2.5 cursor-pointer font-medium">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6M9 8h6M6 4h12a1 1 0 011 1v14a1 1 0 01-1 1H6a1 1 0 01-1-1V5a1 1 0 011-1z"/></svg>
          <span class="flex-1">Prescriptions</span>
          <span class="badge" style="background:var(--alert); color:#fff">18</span>
        </a>
        <a onclick="showTab('orders', this)" class="nav-link flex items-center gap-3 px-3 py-2.5 cursor-pointer font-medium">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
          Orders
        </a>
        <div class="pt-3 pb-1 px-3 text-[10.5px] font-mono uppercase tracking-wide" style="color:var(--ink-muted)">Network</div>
        <a onclick="showTab('doctors', this)" class="nav-link flex items-center gap-3 px-3 py-2.5 cursor-pointer font-medium">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M8 7a4 4 0 118 0M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/><path d="M12 11v6"/></svg>
          Doctors
        </a>
        <a onclick="showTab('pharmacies', this)" class="nav-link flex items-center gap-3 px-3 py-2.5 cursor-pointer font-medium">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M4 21V9l8-6 8 6v12M9 21v-6h6v6"/></svg>
          Pharmacies
        </a>
        <a onclick="showTab('delivery', this)" class="nav-link flex items-center gap-3 px-3 py-2.5 cursor-pointer font-medium">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M3 7h11v8H3zm11 3h4l3 3v2h-7zM6 20a2 2 0 100-4 2 2 0 000 4zm12 0a2 2 0 100-4 2 2 0 000 4z"/></svg>
          Delivery partners
        </a>
        <a onclick="showTab('customers', this)" class="nav-link flex items-center gap-3 px-3 py-2.5 cursor-pointer font-medium">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-3.13a4 4 0 10-4-4 4 4 0 004 4z"/></svg>
          Customers
        </a>
        <div class="pt-3 pb-1 px-3 text-[10.5px] font-mono uppercase tracking-wide" style="color:var(--ink-muted)">Platform</div>
        <a onclick="showTab('settings', this)" class="nav-link flex items-center gap-3 px-3 py-2.5 cursor-pointer font-medium">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M10.3 4.3c.4-1.7 2.9-1.7 3.4 0a1.7 1.7 0 002.6 1.1c1.5-.9 3.3.8 2.4 2.4a1.7 1.7 0 001 2.6c1.8.4 1.8 2.9 0 3.4a1.7 1.7 0 00-1 2.6c.9 1.5-.8 3.3-2.4 2.4a1.7 1.7 0 00-2.6 1c-.4 1.8-2.9 1.8-3.4 0a1.7 1.7 0 00-2.6-1c-1.5.9-3.3-.8-2.4-2.4a1.7 1.7 0 00-1-2.6c-1.8-.4-1.8-2.9 0-3.4a1.7 1.7 0 001-2.6c-.9-1.5.8-3.3 2.4-2.4.99.6 2.3.07 2.6-1z"/></svg>
          System settings
        </a>
        <a onclick="showTab('logs', this)" class="nav-link flex items-center gap-3 px-3 py-2.5 cursor-pointer font-medium">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h7"/></svg>
          Activity log
        </a>
      </nav>
    </div>
    <div class="px-4">
      <div class="rounded-xl px-3 py-3" style="background:var(--grad-soft)">
        <div class="flex items-center gap-2 mb-1.5"><span class="pulse-dot"></span><span class="text-[11px] font-mono font-medium" style="color:var(--navy)">ALL SYSTEMS NORMAL</span></div>
        <div class="text-[11px] font-mono" style="color:var(--ink-muted)">uptime 41d 06:12:47</div>
      </div>
    </div>
  </aside>

  <!-- MAIN -->
  <div class="flex-1 flex flex-col min-w-0">
    <header class="flex items-center justify-between px-7 py-4 border-b" style="border-color:var(--border); background:var(--surface)">
      <div class="relative w-80">
        <svg class="w-4 h-4 absolute left-3 top-2.5" style="color:var(--ink-muted)" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>
        <input placeholder="Search order ID, prescription, patient…" class="w-full pl-9 pr-3 py-2 text-sm rounded-full border outline-none" style="border-color:var(--border); background:#F8FAFC">
      </div>
      <div class="flex items-center gap-5">
        <button class="relative"><svg class="w-5 h-5" style="color:var(--ink-muted)" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 00-4-5.66V5a2 2 0 10-4 0v.34A6 6 0 006 11v3.2a2 2 0 01-.6 1.4L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg><span class="absolute -top-1 -right-1 w-2 h-2 rounded-full" style="background:var(--alert)"></span></button>
        <div class="flex items-center gap-2.5 pl-4 border-l" style="border-color:var(--border)">
          <div class="w-8 h-8 rounded-full flex items-center justify-center font-display text-sm text-white" style="background:var(--grad)">RV</div>
          <div class="leading-tight"><div class="text-sm font-medium">Riya Verma</div><div class="text-[11px] font-mono" style="color:var(--ink-muted)">superadmin</div></div>
        </div>
      </div>
    </header>

    <main class="flex-1 overflow-y-auto p-7">

      <!-- OVERVIEW -->
      <div id="tab-overview" class="tab-view active">
        <div class="flex items-center justify-between mb-6">
          <div><h1 class="font-display text-2xl font-extrabold">Overview</h1><p class="text-sm mt-0.5" style="color:var(--ink-muted)">Friday, 24 July 2026 · last refreshed 2 min ago</p></div>
        </div>

        <!-- Order pipeline -->
        <div class="card p-5 mb-5">
          <h2 class="font-display font-bold mb-4">Order pipeline — today</h2>
          <div class="flex gap-2">
            <div class="stage"><div class="n">42</div><div class="l">Uploaded</div></div>
            <div class="stage" style="background:var(--alert-soft); border-color:transparent"><div class="n" style="color:var(--alert)">18</div><div class="l">Awaiting doctor review</div></div>
            <div class="stage"><div class="n">96</div><div class="l">Approved</div></div>
            <div class="stage"><div class="n">61</div><div class="l">Pharmacy processing</div></div>
            <div class="stage"><div class="n">44</div><div class="l">Out for delivery</div></div>
            <div class="stage" style="background:var(--teal-soft); border-color:transparent"><div class="n" style="color:var(--teal)">128</div><div class="l">Delivered</div></div>
          </div>
        </div>

        <div class="grid grid-cols-4 gap-4 mb-5">
          <div class="card p-4">
            <div class="text-[11px] font-mono uppercase tracking-wide mb-2" style="color:var(--ink-muted)">Oldest pending review</div>
            <div class="font-mono text-2xl font-semibold" style="color:var(--alert)">47 min</div>
            <div class="text-xs mt-1" style="color:var(--ink-muted)">SLA target: 30 min</div>
          </div>
          <div class="card p-4">
            <div class="text-[11px] font-mono uppercase tracking-wide mb-2" style="color:var(--ink-muted)">Doctors online</div>
            <div class="font-mono text-2xl font-semibold">14 <span class="text-sm font-normal" style="color:var(--ink-muted)">/ 52</span></div>
            <div class="text-xs mt-1" style="color:var(--ink-muted)">4 in review right now</div>
          </div>
          <div class="card p-4">
            <div class="text-[11px] font-mono uppercase tracking-wide mb-2" style="color:var(--ink-muted)">Pharmacies fulfilling</div>
            <div class="font-mono text-2xl font-semibold">23 <span class="text-sm font-normal" style="color:var(--ink-muted)">/ 30</span></div>
            <div class="text-xs mt-1" style="color:var(--teal)">▲ on track</div>
          </div>
          <div class="card p-4">
            <div class="text-[11px] font-mono uppercase tracking-wide mb-2" style="color:var(--ink-muted)">Delivery partners active</div>
            <div class="font-mono text-2xl font-semibold">37 <span class="text-sm font-normal" style="color:var(--ink-muted)">/ 60</span></div>
            <div class="text-xs mt-1" style="color:var(--ink-muted)">avg delivery time 34 min</div>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-5">
          <div class="col-span-2 card p-5">
            <div class="flex items-center justify-between mb-4">
              <h2 class="font-display font-bold">Needs admin attention</h2>
              <a onclick="showTab('prescriptions', document.querySelectorAll('.nav-link')[1])" class="text-xs font-semibold cursor-pointer" style="color:var(--blue)">Open queue →</a>
            </div>
            <div class="space-y-3 text-sm">
              <div class="flex items-start gap-3">
                <span class="badge shrink-0" style="background:var(--alert-soft); color:var(--alert)">REJECTED</span>
                <div class="flex-1">Dr. Anil Rao rejected prescription <span class="font-mono text-xs">RX-88213</span> — dosage unclear. Customer needs follow-up.</div>
                <span class="font-mono text-xs" style="color:var(--ink-muted)">12 min</span>
              </div>
              <div class="flex items-start gap-3">
                <span class="badge shrink-0" style="background:var(--warn-soft); color:var(--warn)">STALLED</span>
                <div class="flex-1">Prescription <span class="font-mono text-xs">RX-88190</span> unreviewed for 47 min — past SLA</div>
                <span class="font-mono text-xs" style="color:var(--ink-muted)">47 min</span>
              </div>
              <div class="flex items-start gap-3">
                <span class="badge shrink-0" style="background:var(--alert-soft); color:var(--alert)">ESCALATED</span>
                <div class="flex-1">Order <span class="font-mono text-xs">ORD-40217</span> — pharmacy reported item out of stock post-approval</div>
                <span class="font-mono text-xs" style="color:var(--ink-muted)">1 hr</span>
              </div>
              <div class="flex items-start gap-3">
                <span class="badge shrink-0" style="background:var(--warn-soft); color:var(--warn)">VERIFY</span>
                <div class="flex-1">New pharmacy application <span class="font-medium">GreenLeaf Pharmacy</span> awaiting license verification</div>
                <span class="font-mono text-xs" style="color:var(--ink-muted)">Today</span>
              </div>
            </div>
          </div>
          <div class="card p-5">
            <h2 class="font-display font-bold mb-4">Quick actions</h2>
            <div class="space-y-2">
              <button class="w-full text-left px-3 py-2.5 rounded-xl text-sm border hover:bg-[#F8FAFC] font-medium" style="border-color:var(--border)">Review stalled prescriptions</button>
              <button class="w-full text-left px-3 py-2.5 rounded-xl text-sm border hover:bg-[#F8FAFC] font-medium" style="border-color:var(--border)">Verify pending doctors</button>
              <button class="w-full text-left px-3 py-2.5 rounded-xl text-sm border hover:bg-[#F8FAFC] font-medium" style="border-color:var(--border)">Verify pending pharmacies</button>
              <button class="w-full text-left px-3 py-2.5 rounded-xl text-sm border hover:bg-[#F8FAFC] font-medium" style="border-color:var(--border)">Broadcast delivery alert</button>
            </div>
          </div>
        </div>
      </div>

      <!-- PRESCRIPTIONS -->
      <div id="tab-prescriptions" class="tab-view">
        <div class="flex items-center justify-between mb-6">
          <div><h1 class="font-display text-2xl font-extrabold">Prescriptions</h1><p class="text-sm mt-0.5" style="color:var(--ink-muted)">Every upload must clear doctor review before payment unlocks</p></div>
        </div>
        <div class="card overflow-hidden">
          <div class="flex items-center gap-3 p-4 border-b" style="border-color:var(--border)">
            <input placeholder="Search prescription ID or patient" class="text-sm px-3 py-1.5 rounded-full border flex-1" style="border-color:var(--border)">
            <select class="text-sm px-3 py-1.5 rounded-full border" style="border-color:var(--border)"><option>All statuses</option><option>Pending review</option><option>Approved</option><option>Rejected</option></select>
          </div>
          <table class="w-full text-sm">
            <thead><tr class="text-left text-[11px] font-mono uppercase tracking-wide" style="color:var(--ink-muted)">
              <th class="px-4 py-3">Rx ID</th><th class="px-4 py-3">Patient</th><th class="px-4 py-3">Uploaded</th><th class="px-4 py-3">Reviewing doctor</th><th class="px-4 py-3">Wait time</th><th class="px-4 py-3">Status</th><th class="px-4 py-3"></th>
            </tr></thead>
            <tbody>
              <tr class="border-t" style="border-color:var(--border)">
                <td class="px-4 py-3 font-mono text-xs">RX-88190</td><td class="px-4 py-3 font-medium">Sana Iqbal</td><td class="px-4 py-3 font-mono text-xs" style="color:var(--ink-muted)">09:14:02</td><td class="px-4 py-3">— unassigned —</td>
                <td class="px-4 py-3 font-mono text-xs font-semibold" style="color:var(--alert)">47 min</td><td class="px-4 py-3"><span class="badge" style="background:var(--alert-soft); color:var(--alert)">stalled</span></td>
                <td class="px-4 py-3 text-right"><a class="text-xs font-semibold cursor-pointer" style="color:var(--blue)">Assign</a></td>
              </tr>
              <tr class="border-t" style="border-color:var(--border)">
                <td class="px-4 py-3 font-mono text-xs">RX-88213</td><td class="px-4 py-3 font-medium">Vikram Nair</td><td class="px-4 py-3 font-mono text-xs" style="color:var(--ink-muted)">09:32:47</td><td class="px-4 py-3">Dr. Anil Rao</td>
                <td class="px-4 py-3 font-mono text-xs" style="color:var(--ink-muted)">12 min</td><td class="px-4 py-3"><span class="badge" style="background:var(--alert-soft); color:var(--alert)">rejected</span></td>
                <td class="px-4 py-3 text-right"><a class="text-xs font-semibold cursor-pointer" style="color:var(--blue)">View note</a></td>
              </tr>
              <tr class="border-t" style="border-color:var(--border)">
                <td class="px-4 py-3 font-mono text-xs">RX-88221</td><td class="px-4 py-3 font-medium">Meera Pillai</td><td class="px-4 py-3 font-mono text-xs" style="color:var(--ink-muted)">09:38:10</td><td class="px-4 py-3">Dr. Kavita Sen</td>
                <td class="px-4 py-3 font-mono text-xs" style="color:var(--ink-muted)">6 min</td><td class="px-4 py-3"><span class="badge" style="background:var(--teal-soft); color:var(--teal)">approved</span></td>
                <td class="px-4 py-3 text-right"><a class="text-xs font-semibold cursor-pointer" style="color:var(--blue)">View</a></td>
              </tr>
              <tr class="border-t" style="border-color:var(--border)">
                <td class="px-4 py-3 font-mono text-xs">RX-88230</td><td class="px-4 py-3 font-medium">Aditya Kulkarni</td><td class="px-4 py-3 font-mono text-xs" style="color:var(--ink-muted)">09:41:55</td><td class="px-4 py-3">Dr. Priya Menon</td>
                <td class="px-4 py-3 font-mono text-xs" style="color:var(--warn)">21 min</td><td class="px-4 py-3"><span class="badge" style="background:var(--warn-soft); color:var(--warn)">in review</span></td>
                <td class="px-4 py-3 text-right"><a class="text-xs font-semibold cursor-pointer" style="color:var(--blue)">View</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- ORDERS -->
      <div id="tab-orders" class="tab-view">
        <div class="flex items-center justify-between mb-6">
          <div><h1 class="font-display text-2xl font-extrabold">Orders</h1><p class="text-sm mt-0.5" style="color:var(--ink-muted)">Full lifecycle from approved prescription to doorstep</p></div>
        </div>
        <div class="card overflow-hidden">
          <table class="w-full text-sm">
            <thead><tr class="text-left text-[11px] font-mono uppercase tracking-wide" style="color:var(--ink-muted)">
              <th class="px-4 py-3">Order ID</th><th class="px-4 py-3">Rx ID</th><th class="px-4 py-3">Pharmacy</th><th class="px-4 py-3">Delivery partner</th><th class="px-4 py-3">Stage</th><th class="px-4 py-3">Updated</th>
            </tr></thead>
            <tbody>
              <tr class="border-t" style="border-color:var(--border)">
                <td class="px-4 py-3 font-mono text-xs">ORD-40217</td><td class="px-4 py-3 font-mono text-xs" style="color:var(--ink-muted)">RX-88099</td><td class="px-4 py-3">MedPlus Central</td><td class="px-4 py-3">—</td>
                <td class="px-4 py-3"><span class="badge" style="background:var(--alert-soft); color:var(--alert)">out of stock</span></td><td class="px-4 py-3 font-mono text-xs" style="color:var(--ink-muted)">1 hr ago</td>
              </tr>
              <tr class="border-t" style="border-color:var(--border)">
                <td class="px-4 py-3 font-mono text-xs">ORD-40233</td><td class="px-4 py-3 font-mono text-xs" style="color:var(--ink-muted)">RX-88104</td><td class="px-4 py-3">GreenLeaf Pharmacy</td><td class="px-4 py-3">Suresh K.</td>
                <td class="px-4 py-3"><span class="badge" style="background:var(--blue-soft); color:var(--blue)">out for delivery</span></td><td class="px-4 py-3 font-mono text-xs" style="color:var(--ink-muted)">18 min ago</td>
              </tr>
              <tr class="border-t" style="border-color:var(--border)">
                <td class="px-4 py-3 font-mono text-xs">ORD-40241</td><td class="px-4 py-3 font-mono text-xs" style="color:var(--ink-muted)">RX-88221</td><td class="px-4 py-3">Apollo Pharmacy</td><td class="px-4 py-3">Nitin R.</td>
                <td class="px-4 py-3"><span class="badge" style="background:var(--teal-soft); color:var(--teal)">delivered</span></td><td class="px-4 py-3 font-mono text-xs" style="color:var(--ink-muted)">42 min ago</td>
              </tr>
              <tr class="border-t" style="border-color:var(--border)">
                <td class="px-4 py-3 font-mono text-xs">ORD-40248</td><td class="px-4 py-3 font-mono text-xs" style="color:var(--ink-muted)">RX-88230</td><td class="px-4 py-3">—</td><td class="px-4 py-3">—</td>
                <td class="px-4 py-3"><span class="badge" style="background:#EEF0F2; color:var(--ink-muted)">awaiting approval</span></td><td class="px-4 py-3 font-mono text-xs" style="color:var(--ink-muted)">just now</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- DOCTORS -->
      <div id="tab-doctors" class="tab-view">
        <div class="flex items-center justify-between mb-6">
          <div><h1 class="font-display text-2xl font-extrabold">Doctors</h1><p class="text-sm mt-0.5" style="color:var(--ink-muted)">52 verified · 3 pending license verification</p></div>
          <button class="btn-grad px-4 py-2.5 rounded-full text-white text-sm font-semibold shadow-sm">+ Add doctor</button>
        </div>
        <div class="card overflow-hidden">
          <table class="w-full text-sm">
            <thead><tr class="text-left text-[11px] font-mono uppercase tracking-wide" style="color:var(--ink-muted)">
              <th class="px-4 py-3">Doctor</th><th class="px-4 py-3">Specialty</th><th class="px-4 py-3">License</th><th class="px-4 py-3">Reviews today</th><th class="px-4 py-3">Status</th><th class="px-4 py-3"></th>
            </tr></thead>
            <tbody>
              <tr class="border-t" style="border-color:var(--border)">
                <td class="px-4 py-3 font-medium">Dr. Kavita Sen</td><td class="px-4 py-3">General physician</td><td class="px-4 py-3 font-mono text-xs" style="color:var(--ink-muted)">MCI-88213</td><td class="px-4 py-3 font-mono">22</td>
                <td class="px-4 py-3"><span class="badge" style="background:var(--teal-soft); color:var(--teal)">online</span></td><td class="px-4 py-3 text-right"><a class="text-xs font-semibold cursor-pointer" style="color:var(--blue)">View</a></td>
              </tr>
              <tr class="border-t" style="border-color:var(--border)">
                <td class="px-4 py-3 font-medium">Dr. Anil Rao</td><td class="px-4 py-3">Internal medicine</td><td class="px-4 py-3 font-mono text-xs" style="color:var(--ink-muted)">MCI-77410</td><td class="px-4 py-3 font-mono">15</td>
                <td class="px-4 py-3"><span class="badge" style="background:#EEF0F2; color:var(--ink-muted)">offline</span></td><td class="px-4 py-3 text-right"><a class="text-xs font-semibold cursor-pointer" style="color:var(--blue)">View</a></td>
              </tr>
              <tr class="border-t" style="border-color:var(--border)">
                <td class="px-4 py-3 font-medium">Dr. Farah Sheikh</td><td class="px-4 py-3">Pediatrics</td><td class="px-4 py-3 font-mono text-xs" style="color:var(--ink-muted)">pending upload</td><td class="px-4 py-3 font-mono">—</td>
                <td class="px-4 py-3"><span class="badge" style="background:var(--warn-soft); color:var(--warn)">pending verification</span></td><td class="px-4 py-3 text-right"><a class="text-xs font-semibold cursor-pointer" style="color:var(--blue)">Verify</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- PHARMACIES -->
      <div id="tab-pharmacies" class="tab-view">
        <div class="flex items-center justify-between mb-6">
          <div><h1 class="font-display text-2xl font-extrabold">Pharmacies</h1><p class="text-sm mt-0.5" style="color:var(--ink-muted)">30 partnered · 1 pending license verification</p></div>
          <button class="btn-grad px-4 py-2.5 rounded-full text-white text-sm font-semibold shadow-sm">+ Add pharmacy</button>
        </div>
        <div class="card overflow-hidden">
          <table class="w-full text-sm">
            <thead><tr class="text-left text-[11px] font-mono uppercase tracking-wide" style="color:var(--ink-muted)">
              <th class="px-4 py-3">Pharmacy</th><th class="px-4 py-3">Location</th><th class="px-4 py-3">Orders today</th><th class="px-4 py-3">Fulfillment rate</th><th class="px-4 py-3">Status</th><th class="px-4 py-3"></th>
            </tr></thead>
            <tbody>
              <tr class="border-t" style="border-color:var(--border)">
                <td class="px-4 py-3 font-medium">Apollo Pharmacy</td><td class="px-4 py-3 text-xs" style="color:var(--ink-muted)">Andheri, Mumbai</td><td class="px-4 py-3 font-mono">31</td><td class="px-4 py-3 font-mono" style="color:var(--teal)">98%</td>
                <td class="px-4 py-3"><span class="badge" style="background:var(--teal-soft); color:var(--teal)">active</span></td><td class="px-4 py-3 text-right"><a class="text-xs font-semibold cursor-pointer" style="color:var(--blue)">View</a></td>
              </tr>
              <tr class="border-t" style="border-color:var(--border)">
                <td class="px-4 py-3 font-medium">MedPlus Central</td><td class="px-4 py-3 text-xs" style="color:var(--ink-muted)">Koramangala, Bengaluru</td><td class="px-4 py-3 font-mono">24</td><td class="px-4 py-3 font-mono" style="color:var(--warn)">83%</td>
                <td class="px-4 py-3"><span class="badge" style="background:var(--teal-soft); color:var(--teal)">active</span></td><td class="px-4 py-3 text-right"><a class="text-xs font-semibold cursor-pointer" style="color:var(--blue)">View</a></td>
              </tr>
              <tr class="border-t" style="border-color:var(--border)">
                <td class="px-4 py-3 font-medium">GreenLeaf Pharmacy</td><td class="px-4 py-3 text-xs" style="color:var(--ink-muted)">Sector 18, Noida</td><td class="px-4 py-3 font-mono">—</td><td class="px-4 py-3 font-mono">—</td>
                <td class="px-4 py-3"><span class="badge" style="background:var(--warn-soft); color:var(--warn)">pending verification</span></td><td class="px-4 py-3 text-right"><a class="text-xs font-semibold cursor-pointer" style="color:var(--blue)">Verify</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- DELIVERY -->
      <div id="tab-delivery" class="tab-view">
        <div class="flex items-center justify-between mb-6">
          <div><h1 class="font-display text-2xl font-extrabold">Delivery partners</h1><p class="text-sm mt-0.5" style="color:var(--ink-muted)">60 onboarded · 37 active right now</p></div>
          <button class="btn-grad px-4 py-2.5 rounded-full text-white text-sm font-semibold shadow-sm">+ Add partner</button>
        </div>
        <div class="card overflow-hidden">
          <table class="w-full text-sm">
            <thead><tr class="text-left text-[11px] font-mono uppercase tracking-wide" style="color:var(--ink-muted)">
              <th class="px-4 py-3">Partner</th><th class="px-4 py-3">Zone</th><th class="px-4 py-3">Deliveries today</th><th class="px-4 py-3">Avg time</th><th class="px-4 py-3">Status</th><th class="px-4 py-3"></th>
            </tr></thead>
            <tbody>
              <tr class="border-t" style="border-color:var(--border)">
                <td class="px-4 py-3 font-medium">Suresh Kumar</td><td class="px-4 py-3 text-xs" style="color:var(--ink-muted)">Noida Sector 18</td><td class="px-4 py-3 font-mono">9</td><td class="px-4 py-3 font-mono">31 min</td>
                <td class="px-4 py-3"><span class="badge" style="background:var(--blue-soft); color:var(--blue)">on route</span></td><td class="px-4 py-3 text-right"><a class="text-xs font-semibold cursor-pointer" style="color:var(--blue)">Track</a></td>
              </tr>
              <tr class="border-t" style="border-color:var(--border)">
                <td class="px-4 py-3 font-medium">Nitin Rathi</td><td class="px-4 py-3 text-xs" style="color:var(--ink-muted)">Andheri West</td><td class="px-4 py-3 font-mono">12</td><td class="px-4 py-3 font-mono">27 min</td>
                <td class="px-4 py-3"><span class="badge" style="background:var(--teal-soft); color:var(--teal)">available</span></td><td class="px-4 py-3 text-right"><a class="text-xs font-semibold cursor-pointer" style="color:var(--blue)">Track</a></td>
              </tr>
              <tr class="border-t" style="border-color:var(--border)">
                <td class="px-4 py-3 font-medium">Farhan Ali</td><td class="px-4 py-3 text-xs" style="color:var(--ink-muted)">Koramangala</td><td class="px-4 py-3 font-mono">—</td><td class="px-4 py-3 font-mono">—</td>
                <td class="px-4 py-3"><span class="badge" style="background:#EEF0F2; color:var(--ink-muted)">offline</span></td><td class="px-4 py-3 text-right"><a class="text-xs font-semibold cursor-pointer" style="color:var(--blue)">View</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- CUSTOMERS -->
      <div id="tab-customers" class="tab-view">
        <div class="flex items-center justify-between mb-6">
          <div><h1 class="font-display text-2xl font-extrabold">Customers</h1><p class="text-sm mt-0.5" style="color:var(--ink-muted)">12,438 registered</p></div>
        </div>
        <div class="card overflow-hidden">
          <div class="flex items-center gap-3 p-4 border-b" style="border-color:var(--border)">
            <input placeholder="Search by name or email" class="text-sm px-3 py-1.5 rounded-full border flex-1" style="border-color:var(--border)">
          </div>
          <table class="w-full text-sm">
            <thead><tr class="text-left text-[11px] font-mono uppercase tracking-wide" style="color:var(--ink-muted)">
              <th class="px-4 py-3">Customer</th><th class="px-4 py-3">Orders placed</th><th class="px-4 py-3">Last order</th><th class="px-4 py-3">Status</th><th class="px-4 py-3"></th>
            </tr></thead>
            <tbody>
              <tr class="border-t" style="border-color:var(--border)">
                <td class="px-4 py-3"><div class="font-medium">Sana Iqbal</div><div class="text-xs" style="color:var(--ink-muted)">sana.i@mail.com</div></td>
                <td class="px-4 py-3 font-mono">7</td><td class="px-4 py-3 font-mono text-xs" style="color:var(--ink-muted)">Today</td>
                <td class="px-4 py-3"><span class="badge" style="background:var(--teal-soft); color:var(--teal)">active</span></td><td class="px-4 py-3 text-right"><a class="text-xs font-semibold cursor-pointer" style="color:var(--blue)">View</a></td>
              </tr>
              <tr class="border-t" style="border-color:var(--border)">
                <td class="px-4 py-3"><div class="font-medium">Vikram Nair</div><div class="text-xs" style="color:var(--ink-muted)">vikram.n@mail.com</div></td>
                <td class="px-4 py-3 font-mono">3</td><td class="px-4 py-3 font-mono text-xs" style="color:var(--ink-muted)">Today</td>
                <td class="px-4 py-3"><span class="badge" style="background:var(--teal-soft); color:var(--teal)">active</span></td><td class="px-4 py-3 text-right"><a class="text-xs font-semibold cursor-pointer" style="color:var(--blue)">View</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- SETTINGS -->
      <div id="tab-settings" class="tab-view">
        <div class="mb-6"><h1 class="font-display text-2xl font-extrabold">System settings</h1><p class="text-sm mt-0.5" style="color:var(--ink-muted)">Platform-wide configuration</p></div>
        <div class="grid grid-cols-3 gap-5">
          <div class="col-span-2 space-y-5">
            <div class="card p-5">
              <h2 class="font-display font-bold mb-1">Review SLA</h2>
              <p class="text-xs mb-4" style="color:var(--ink-muted)">Escalation thresholds for prescription review</p>
              <div class="space-y-3">
                <div><label class="text-xs font-medium block mb-1">Flag as stalled after (minutes)</label><input value="30" class="w-32 text-sm px-3 py-2 rounded-lg border font-mono" style="border-color:var(--border)"></div>
                <div><label class="text-xs font-medium block mb-1">Auto-escalate to admin after (minutes)</label><input value="60" class="w-32 text-sm px-3 py-2 rounded-lg border font-mono" style="border-color:var(--border)"></div>
              </div>
            </div>
            <div class="card p-5">
              <h2 class="font-display font-bold mb-1">General</h2>
              <p class="text-xs mb-4" style="color:var(--ink-muted)">Basic identity of the application</p>
              <div class="space-y-3">
                <div><label class="text-xs font-medium block mb-1">Application name</label><input value="MediSwift" class="w-full text-sm px-3 py-2 rounded-lg border" style="border-color:var(--border)"></div>
                <div class="flex items-center justify-between pt-1"><div><div class="text-sm font-medium">Maintenance mode</div><div class="text-xs" style="color:var(--ink-muted)">Takes the app offline for all non-admins</div></div>
                  <div class="w-10 h-5 rounded-full flex items-center px-0.5" style="background:var(--border)"><div class="w-4 h-4 rounded-full bg-white shadow"></div></div>
                </div>
              </div>
            </div>
          </div>
          <div class="card p-5 h-fit">
            <h2 class="font-display font-bold mb-3">Sections</h2>
            <div class="space-y-1 text-sm">
              <div class="px-3 py-2 rounded-lg font-medium" style="background:var(--grad-soft); color:var(--navy)">Review SLA</div>
              <div class="px-3 py-2 rounded-lg" style="color:var(--ink-muted)">General</div>
              <div class="px-3 py-2 rounded-lg" style="color:var(--ink-muted)">Payments</div>
              <div class="px-3 py-2 rounded-lg" style="color:var(--ink-muted)">Notifications</div>
            </div>
          </div>
        </div>
      </div>

      <!-- LOGS -->
      <div id="tab-logs" class="tab-view">
        <div class="flex items-center justify-between mb-6">
          <div><h1 class="font-display text-2xl font-extrabold">Activity log</h1><p class="text-sm mt-0.5" style="color:var(--ink-muted)">Immutable audit trail — required for medical compliance</p></div>
          <button class="px-4 py-2.5 rounded-full text-sm border font-semibold" style="border-color:var(--border)">Export CSV</button>
        </div>
        <div class="card overflow-hidden">
          <div class="font-mono text-[13px]">
            <div class="flex items-start gap-3 px-4 py-2.5 border-t" style="border-color:var(--border)">
              <span class="badge shrink-0" style="background:var(--alert-soft); color:var(--alert)">CRITICAL</span>
              <span style="color:var(--ink-muted)">2026-07-24 09:47:00</span>
              <span>prescription.rejected — Dr. Anil Rao rejected RX-88213 (dosage unclear)</span>
            </div>
            <div class="flex items-start gap-3 px-4 py-2.5 border-t" style="border-color:var(--border)">
              <span class="badge shrink-0" style="background:var(--teal-soft); color:var(--teal)">INFO</span>
              <span style="color:var(--ink-muted)">2026-07-24 09:41:55</span>
              <span>prescription.approved — Dr. Priya Menon approved RX-88230</span>
            </div>
            <div class="flex items-start gap-3 px-4 py-2.5 border-t" style="border-color:var(--border)">
              <span class="badge shrink-0" style="background:var(--warn-soft); color:var(--warn)">WARNING</span>
              <span style="color:var(--ink-muted)">2026-07-24 08:59:12</span>
              <span>pharmacy.stock_shortage — MedPlus Central reported shortage on ORD-40217</span>
            </div>
            <div class="flex items-start gap-3 px-4 py-2.5 border-t" style="border-color:var(--border)">
              <span class="badge shrink-0" style="background:var(--teal-soft); color:var(--teal)">INFO</span>
              <span style="color:var(--ink-muted)">2026-07-24 03:00:00</span>
              <span>backup.completed — nightly database snapshot, 4.2GB</span>
            </div>
          </div>
        </div>
      </div>

    </main>
  </div>
</div>

<script>
function showTab(name, el){
  document.querySelectorAll('.tab-view').forEach(t=>t.classList.remove('active'));
  document.getElementById('tab-'+name).classList.add('active');
  document.querySelectorAll('.nav-link').forEach(n=>n.classList.remove('active'));
  if(el) el.classList.add('active');
}
</script>
</body>
</html>