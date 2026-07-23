<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Superadmin Dashboard</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; background: #f4f7fb; color: #1f2937; }
        .container { max-width: 1100px; margin: 40px auto; padding: 24px; }
        .card { background: white; border-radius: 12px; padding: 24px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); margin-bottom: 20px; }
        h1 { margin-top: 0; }
        .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; }
        .stat { background: #f8fafc; padding: 16px; border-radius: 10px; border: 1px solid #e5e7eb; }
        .stat strong { display: block; font-size: 24px; margin-bottom: 6px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <h1>Superadmin Dashboard</h1>
            <p>Welcome to the administration panel.</p>
        </div>

        <div class="stats">
            <div class="stat">
                <strong>120</strong>
                <span>Total Users</span>
            </div>
            <div class="stat">
                <strong>18</strong>
                <span>Active Staff</span>
            </div>
            <div class="stat">
                <strong>7</strong>
                <span>Pending Requests</span>
            </div>
            <div class="stat">
                <strong>3</strong>
                <span>System Alerts</span>
            </div>
        </div>
    </div>
</body>
</html>
