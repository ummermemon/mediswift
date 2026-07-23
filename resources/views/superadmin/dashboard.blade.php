<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>MediSwift — Superadmin Console</title>
<script src="https://cdn.tailwindcss.com"></script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  :root{
    --bg:#F3F7FA;
    --surface:#FFFFFF;
    --ink:#132540;
    --ink-muted:#697487;
    --navy:#132C54;
    --navy-2:#1B3E75;
    --teal:#17B4AC;
    --teal-2:#20D4C6;
    --blue:#2158B8;
    --grad: linear-gradient(90deg, var(--navy) 0%, var(--blue) 55%, var(--teal) 100%);
    --grad-soft: linear-gradient(90deg, rgba(19,44,84,.08) 0%, rgba(23,180,172,.10) 100%);
    --accent-soft:#E4F7F5;
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
  @keyframes pulse{
    0%{ box-shadow:0 0 0 0 rgba(32,212,198,.5); }
    70%{ box-shadow:0 0 0 6px rgba(32,212,198,0); }
    100%{ box-shadow:0 0 0 0 rgba(32,212,198,0); }
  }
  .tab-view{ display:none; }
  .tab-view.active{ display:block; }
  .badge{ font-family:'IBM Plex Mono',monospace; font-size:11px; padding:2px 9px; border-radius:999px; letter-spacing:.02em; }
  .grad-text{ background:var(--grad); -webkit-background-clip:text; background-clip:text; color:transparent; }
  ::-webkit-scrollbar{ width:8px; height:8px; }
  ::-webkit-scrollbar-thumb{ background:#DCE3EC; border-radius:8px; }
</style>
</head>
<body class="text-[15px]">

<div class="flex min-h-screen">

  <!-- SIDEBAR -->
  <aside class="sidebar w-64 shrink-0 flex flex-col justify-between py-5">
    <div>
      <div class="px-5 pb-5 mb-3 border-b" style="border-color:var(--border)">
        <img src="{{ asset('assets/images/logo/horizontal/horizontal.png') }}" alt="MediSwift" class="h-22 object-contain object-left mb-1">
        <div class="text-[11px] font-mono tracking-wide" style="color:var(--ink-muted)">SUPERADMIN CONSOLE</div>
      </div>
      <nav class="mt-2 space-y-1 px-3">
        <a onclick="showTab('dashboard', this)" class="nav-link active flex items-center gap-3 px-3 py-2.5 text-sm cursor-pointer font-medium">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
          Overview
        </a>
        <a onclick="showTab('users', this)" class="nav-link flex items-center gap-3 px-3 py-2.5 text-sm cursor-pointer font-medium">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-3.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-4-4"/></svg>
          Users &amp; roles
        </a>
        <a onclick="showTab('settings', this)" class="nav-link flex items-center gap-3 px-3 py-2.5 text-sm cursor-pointer font-medium">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><circle cx="12" cy="12" r="3"/></svg>
          System settings
        </a>
        <a onclick="showTab('logs', this)" class="nav-link flex items-center gap-3 px-3 py-2.5 text-sm cursor-pointer font-medium">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h7"/></svg>
          Activity log
        </a>
      </nav>
    </div>

    <div class="px-4">
      <div class="rounded-xl px-3 py-3" style="background:var(--grad-soft)">
        <div class="flex items-center gap-2 mb-1.5">
          <span class="pulse-dot"></span>
          <span class="text-[11px] font-mono font-medium" style="color:var(--navy)">ALL SYSTEMS NORMAL</span>
        </div>
        <div class="text-[11px] font-mono" style="color:var(--ink-muted)">uptime 41d 06:12:47</div>
      </div>
    </div>
  </aside>

  <!-- MAIN -->
  <div class="flex-1 flex flex-col min-w-0">

    <!-- TOPBAR -->
    <header class="flex items-center justify-between px-7 py-4 border-b" style="border-color:var(--border); background:var(--surface)">
      <div class="relative w-80">
        <svg class="w-4 h-4 absolute left-3 top-2.5" style="color:var(--ink-muted)" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>
        <input placeholder="Search users, logs, settings…" class="w-full pl-9 pr-3 py-2 text-sm rounded-full border outline-none" style="border-color:var(--border); background:#F8FAFC">
      </div>
      <div class="flex items-center gap-5">
        <button class="relative">
          <svg class="w-5 h-5" style="color:var(--ink-muted)" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 00-4-5.66V5a2 2 0 10-4 0v.34A6 6 0 006 11v3.2a2 2 0 01-.6 1.4L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
          <span class="absolute -top-1 -right-1 w-2 h-2 rounded-full" style="background:var(--alert)"></span>
        </button>
        <div class="flex items-center gap-2.5 pl-4 border-l" style="border-color:var(--border)">
          <div class="w-8 h-8 rounded-full flex items-center justify-center font-display text-sm text-white" style="background:var(--grad)">RV</div>
          <div class="leading-tight">
            <div class="text-sm font-medium">Riya Verma</div>
            <div class="text-[11px] font-mono" style="color:var(--ink-muted)">superadmin</div>
          </div>
        </div>
      </div>
    </header>

    <main class="flex-1 overflow-y-auto p-7">

      <!-- DASHBOARD TAB -->
      <div id="tab-dashboard" class="tab-view active">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h1 class="font-display text-2xl font-extrabold">Overview</h1>
            <p class="text-sm mt-0.5" style="color:var(--ink-muted)">Friday, 24 July 2026 · last refreshed 2 min ago</p>
          </div>
          <button class="btn-grad px-4 py-2.5 rounded-full text-white text-sm font-semibold shadow-sm">+ Invite admin</button>
        </div>

        <div class="grid grid-cols-4 gap-4 mb-6">
          <div class="card p-4">
            <div class="text-[11px] font-mono uppercase tracking-wide mb-2" style="color:var(--ink-muted)">Total users</div>
            <div class="font-mono text-2xl font-semibold">12,438</div>
            <div class="text-xs mt-1 font-medium" style="color:var(--teal)">▲ 3.2% this week</div>
          </div>
          <div class="card p-4">
            <div class="text-[11px] font-mono uppercase tracking-wide mb-2" style="color:var(--ink-muted)">Active sessions</div>
            <div class="font-mono text-2xl font-semibold">1,904</div>
            <div class="text-xs mt-1" style="color:var(--ink-muted)">steady vs. last hour</div>
          </div>
          <div class="card p-4">
            <div class="text-[11px] font-mono uppercase tracking-wide mb-2" style="color:var(--ink-muted)">Failed logins (24h)</div>
            <div class="font-mono text-2xl font-semibold">37</div>
            <div class="text-xs mt-1 font-medium" style="color:var(--warn)">▲ above baseline</div>
          </div>
          <div class="card p-4">
            <div class="text-[11px] font-mono uppercase tracking-wide mb-2" style="color:var(--ink-muted)">Open tickets</div>
            <div class="font-mono text-2xl font-semibold">6</div>
            <div class="text-xs mt-1" style="color:var(--ink-muted)">2 flagged critical</div>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-5">
          <div class="col-span-2 card p-5">
            <div class="flex items-center justify-between mb-4">
              <h2 class="font-display font-bold">Recent activity</h2>
              <a onclick="showTab('logs', document.querySelectorAll('.nav-link')[3])" class="text-xs font-semibold cursor-pointer" style="color:var(--blue)">View full log →</a>
            </div>
            <div class="space-y-3">
              <div class="flex items-start gap-3 text-sm">
                <span class="mt-1 w-1.5 h-1.5 rounded-full shrink-0" style="background:var(--teal)"></span>
                <div class="flex-1"><span class="font-medium">admin@mediswift.co</span> updated role permissions for <span class="font-mono text-xs">editor</span></div>
                <span class="font-mono text-xs" style="color:var(--ink-muted)">09:41:02</span>
              </div>
              <div class="flex items-start gap-3 text-sm">
                <span class="mt-1 w-1.5 h-1.5 rounded-full shrink-0" style="background:var(--alert)"></span>
                <div class="flex-1"><span class="font-medium">unknown IP 41.28.x.x</span> — 5 failed login attempts on <span class="font-mono text-xs">priya.k</span></div>
                <span class="font-mono text-xs" style="color:var(--ink-muted)">09:33:47</span>
              </div>
              <div class="flex items-start gap-3 text-sm">
                <span class="mt-1 w-1.5 h-1.5 rounded-full shrink-0" style="background:var(--teal)"></span>
                <div class="flex-1"><span class="font-medium">system</span> completed nightly database backup</div>
                <span class="font-mono text-xs" style="color:var(--ink-muted)">03:00:00</span>
              </div>
              <div class="flex items-start gap-3 text-sm">
                <span class="mt-1 w-1.5 h-1.5 rounded-full shrink-0" style="background:var(--warn)"></span>
                <div class="flex-1"><span class="font-medium">rahul.dev</span> was suspended for policy review</div>
                <span class="font-mono text-xs" style="color:var(--ink-muted)">Yesterday</span>
              </div>
            </div>
          </div>

          <div class="card p-5">
            <h2 class="font-display font-bold mb-4">Quick actions</h2>
            <div class="space-y-2">
              <button class="w-full text-left px-3 py-2.5 rounded-xl text-sm border hover:bg-[#F8FAFC] font-medium" style="border-color:var(--border)">Create new admin role</button>
              <button class="w-full text-left px-3 py-2.5 rounded-xl text-sm border hover:bg-[#F8FAFC] font-medium" style="border-color:var(--border)">Force logout all sessions</button>
              <button class="w-full text-left px-3 py-2.5 rounded-xl text-sm border hover:bg-[#F8FAFC] font-medium" style="border-color:var(--border)">Trigger manual backup</button>
              <button class="w-full text-left px-3 py-2.5 rounded-xl text-sm border hover:bg-[#F8FAFC] font-medium" style="border-color:var(--border)">Toggle maintenance mode</button>
            </div>
          </div>
        </div>
      </div>

      <!-- USERS TAB -->
      <div id="tab-users" class="tab-view">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h1 class="font-display text-2xl font-extrabold">Users &amp; roles</h1>
            <p class="text-sm mt-0.5" style="color:var(--ink-muted)">12,438 total · 4 roles configured</p>
          </div>
          <button class="btn-grad px-4 py-2.5 rounded-full text-white text-sm font-semibold shadow-sm">+ Add user</button>
        </div>

        <div class="card overflow-hidden">
          <div class="flex items-center gap-3 p-4 border-b" style="border-color:var(--border)">
            <input placeholder="Filter by name or email" class="text-sm px-3 py-1.5 rounded-full border flex-1" style="border-color:var(--border)">
            <select class="text-sm px-3 py-1.5 rounded-full border" style="border-color:var(--border)">
              <option>All roles</option><option>Superadmin</option><option>Editor</option><option>Support</option>
            </select>
            <select class="text-sm px-3 py-1.5 rounded-full border" style="border-color:var(--border)">
              <option>All status</option><option>Active</option><option>Suspended</option>
            </select>
          </div>
          <table class="w-full text-sm">
            <thead>
              <tr class="text-left text-[11px] font-mono uppercase tracking-wide" style="color:var(--ink-muted)">
                <th class="px-4 py-3">User</th><th class="px-4 py-3">Role</th><th class="px-4 py-3">Status</th><th class="px-4 py-3">Last active</th><th class="px-4 py-3">ID</th><th class="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-t" style="border-color:var(--border)">
                <td class="px-4 py-3"><div class="font-medium">Priya Kulkarni</div><div class="text-xs" style="color:var(--ink-muted)">priya.k@mediswift.co</div></td>
                <td class="px-4 py-3"><span class="badge" style="background:var(--accent-soft); color:var(--teal)">superadmin</span></td>
                <td class="px-4 py-3"><span class="badge" style="background:var(--accent-soft); color:var(--teal)">active</span></td>
                <td class="px-4 py-3 font-mono text-xs" style="color:var(--ink-muted)">09:41:02</td>
                <td class="px-4 py-3 font-mono text-xs" style="color:var(--ink-muted)">USR-00231</td>
                <td class="px-4 py-3 text-right"><a class="text-xs font-semibold cursor-pointer" style="color:var(--blue)">Manage</a></td>
              </tr>
              <tr class="border-t" style="border-color:var(--border)">
                <td class="px-4 py-3"><div class="font-medium">Rahul Devgan</div><div class="text-xs" style="color:var(--ink-muted)">rahul.dev@mediswift.co</div></td>
                <td class="px-4 py-3"><span class="badge" style="background:var(--blue-soft); color:var(--blue)">editor</span></td>
                <td class="px-4 py-3"><span class="badge" style="background:var(--alert-soft); color:var(--alert)">suspended</span></td>
                <td class="px-4 py-3 font-mono text-xs" style="color:var(--ink-muted)">2 days ago</td>
                <td class="px-4 py-3 font-mono text-xs" style="color:var(--ink-muted)">USR-00874</td>
                <td class="px-4 py-3 text-right"><a class="text-xs font-semibold cursor-pointer" style="color:var(--blue)">Manage</a></td>
              </tr>
              <tr class="border-t" style="border-color:var(--border)">
                <td class="px-4 py-3"><div class="font-medium">Ananya Shah</div><div class="text-xs" style="color:var(--ink-muted)">ananya.shah@mediswift.co</div></td>
                <td class="px-4 py-3"><span class="badge" style="background:var(--blue-soft); color:var(--blue)">support</span></td>
                <td class="px-4 py-3"><span class="badge" style="background:var(--accent-soft); color:var(--teal)">active</span></td>
                <td class="px-4 py-3 font-mono text-xs" style="color:var(--ink-muted)">14:02:11</td>
                <td class="px-4 py-3 font-mono text-xs" style="color:var(--ink-muted)">USR-01190</td>
                <td class="px-4 py-3 text-right"><a class="text-xs font-semibold cursor-pointer" style="color:var(--blue)">Manage</a></td>
              </tr>
              <tr class="border-t" style="border-color:var(--border)">
                <td class="px-4 py-3"><div class="font-medium">Karan Mehta</div><div class="text-xs" style="color:var(--ink-muted)">karan.m@mediswift.co</div></td>
                <td class="px-4 py-3"><span class="badge" style="background:var(--blue-soft); color:var(--blue)">editor</span></td>
                <td class="px-4 py-3"><span class="badge" style="background:var(--warn-soft); color:var(--warn)">pending invite</span></td>
                <td class="px-4 py-3 font-mono text-xs" style="color:var(--ink-muted)">—</td>
                <td class="px-4 py-3 font-mono text-xs" style="color:var(--ink-muted)">USR-01432</td>
                <td class="px-4 py-3 text-right"><a class="text-xs font-semibold cursor-pointer" style="color:var(--blue)">Manage</a></td>
              </tr>
            </tbody>
          </table>
          <div class="flex items-center justify-between px-4 py-3 border-t text-xs" style="border-color:var(--border); color:var(--ink-muted)">
            <span>Showing 1–4 of 12,438</span>
            <div class="flex gap-1">
              <button class="px-2.5 py-1 rounded-full border" style="border-color:var(--border)">Prev</button>
              <button class="px-2.5 py-1 rounded-full border" style="border-color:var(--border)">Next</button>
            </div>
          </div>
        </div>
      </div>

      <!-- SETTINGS TAB -->
      <div id="tab-settings" class="tab-view">
        <div class="mb-6">
          <h1 class="font-display text-2xl font-extrabold">System settings</h1>
          <p class="text-sm mt-0.5" style="color:var(--ink-muted)">Changes apply instantly across all tenants</p>
        </div>

        <div class="grid grid-cols-3 gap-5">
          <div class="col-span-2 space-y-5">
            <div class="card p-5">
              <h2 class="font-display font-bold mb-1">General</h2>
              <p class="text-xs mb-4" style="color:var(--ink-muted)">Basic identity of the application</p>
              <div class="space-y-3">
                <div>
                  <label class="text-xs font-medium block mb-1">Application name</label>
                  <input value="MediSwift" class="w-full text-sm px-3 py-2 rounded-lg border" style="border-color:var(--border)">
                </div>
                <div>
                  <label class="text-xs font-medium block mb-1">Support email</label>
                  <input value="support@mediswift.co" class="w-full text-sm px-3 py-2 rounded-lg border" style="border-color:var(--border)">
                </div>
                <div class="flex items-center justify-between pt-1">
                  <div>
                    <div class="text-sm font-medium">Maintenance mode</div>
                    <div class="text-xs" style="color:var(--ink-muted)">Takes the app offline for all non-admins</div>
                  </div>
                  <div class="w-10 h-5 rounded-full flex items-center px-0.5" style="background:var(--border)">
                    <div class="w-4 h-4 rounded-full bg-white shadow"></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="card p-5">
              <h2 class="font-display font-bold mb-1">Security</h2>
              <p class="text-xs mb-4" style="color:var(--ink-muted)">Authentication and access policy</p>
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-sm font-medium">Require 2FA for admins</div>
                    <div class="text-xs" style="color:var(--ink-muted)">Applies to superadmin and editor roles</div>
                  </div>
                  <div class="w-10 h-5 rounded-full flex items-center justify-end px-0.5" style="background:var(--grad)">
                    <div class="w-4 h-4 rounded-full bg-white shadow"></div>
                  </div>
                </div>
                <div>
                  <label class="text-xs font-medium block mb-1">Session timeout (minutes)</label>
                  <input value="30" class="w-32 text-sm px-3 py-2 rounded-lg border font-mono" style="border-color:var(--border)">
                </div>
              </div>
            </div>
          </div>

          <div class="card p-5 h-fit">
            <h2 class="font-display font-bold mb-3">Sections</h2>
            <div class="space-y-1 text-sm">
              <div class="px-3 py-2 rounded-lg font-medium" style="background:var(--grad-soft); color:var(--navy)">General</div>
              <div class="px-3 py-2 rounded-lg" style="color:var(--ink-muted)">Security</div>
              <div class="px-3 py-2 rounded-lg" style="color:var(--ink-muted)">Notifications</div>
              <div class="px-3 py-2 rounded-lg" style="color:var(--ink-muted)">Integrations</div>
              <div class="px-3 py-2 rounded-lg" style="color:var(--ink-muted)">Billing</div>
            </div>
          </div>
        </div>
      </div>

      <!-- LOGS TAB -->
      <div id="tab-logs" class="tab-view">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h1 class="font-display text-2xl font-extrabold">Activity log</h1>
            <p class="text-sm mt-0.5" style="color:var(--ink-muted)">Immutable audit trail of admin actions</p>
          </div>
          <button class="px-4 py-2.5 rounded-full text-sm border font-semibold" style="border-color:var(--border)">Export CSV</button>
        </div>

        <div class="card overflow-hidden">
          <div class="flex items-center gap-3 p-4 border-b" style="border-color:var(--border)">
            <input placeholder="Search log entries" class="text-sm px-3 py-1.5 rounded-full border flex-1" style="border-color:var(--border)">
            <select class="text-sm px-3 py-1.5 rounded-full border" style="border-color:var(--border)"><option>All severities</option><option>Info</option><option>Warning</option><option>Critical</option></select>
          </div>
          <div class="font-mono text-[13px]">
            <div class="flex items-start gap-3 px-4 py-2.5 border-t" style="border-color:var(--border)">
              <span class="badge shrink-0" style="background:var(--accent-soft); color:var(--teal)">INFO</span>
              <span style="color:var(--ink-muted)">2026-07-24 09:41:02</span>
              <span>role_permission.updated — admin@mediswift.co modified editor permissions</span>
            </div>
            <div class="flex items-start gap-3 px-4 py-2.5 border-t" style="border-color:var(--border)">
              <span class="badge shrink-0" style="background:var(--alert-soft); color:var(--alert)">CRITICAL</span>
              <span style="color:var(--ink-muted)">2026-07-24 09:33:47</span>
              <span>auth.failed × 5 — source 41.28.x.x targeting priya.k</span>
            </div>
            <div class="flex items-start gap-3 px-4 py-2.5 border-t" style="border-color:var(--border)">
              <span class="badge shrink-0" style="background:var(--accent-soft); color:var(--teal)">INFO</span>
              <span style="color:var(--ink-muted)">2026-07-24 03:00:00</span>
              <span>backup.completed — nightly database snapshot, 4.2GB</span>
            </div>
            <div class="flex items-start gap-3 px-4 py-2.5 border-t" style="border-color:var(--border)">
              <span class="badge shrink-0" style="background:var(--warn-soft); color:var(--warn)">WARNING</span>
              <span style="color:var(--ink-muted)">2026-07-23 18:12:55</span>
              <span>user.suspended — rahul.dev flagged for policy review</span>
            </div>
            <div class="flex items-start gap-3 px-4 py-2.5 border-t" style="border-color:var(--border)">
              <span class="badge shrink-0" style="background:var(--accent-soft); color:var(--teal)">INFO</span>
              <span style="color:var(--ink-muted)">2026-07-23 11:04:19</span>
              <span>settings.updated — session_timeout changed 15 → 30</span>
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