/**
 * auth-guard.js
 * Include this script in index.html (and any protected page).
 * It redirects to login.html if the user is not logged in,
 * and updates the header Login/Register buttons to show the user's name + Logout.
 */

(function () {
    const token = localStorage.getItem('bp_token');
    const user  = JSON.parse(localStorage.getItem('bp_user') || 'null');

    // ── Redirect if not logged in ──
    if (!token || !user) {
        window.location.href = 'login.html';
        return;
    }

    // ── Update header after DOM is ready ──
    document.addEventListener('DOMContentLoaded', function () {
        const signDiv = document.getElementById('sign');
        if (!signDiv) return;

        // Replace Login/Register with user name + Logout button
        signDiv.innerHTML = `
            <span class="user-greeting">
                <i class="fa-solid fa-circle-user"></i>
                Hi, ${user.name.split(' ')[0]}
            </span>
            <button class="sign logout-btn" onclick="bpLogout()">
                <i class="fa-solid fa-right-from-bracket"></i> Logout
            </button>
        `;

        // Inject greeting styles if not present
        if (!document.getElementById('bp-auth-style')) {
            const style = document.createElement('style');
            style.id = 'bp-auth-style';
            style.textContent = `
                .user-greeting {
                    display: flex;
                    align-items: center;
                    gap: 7px;
                    color: #1a3a5c;
                    font-weight: 600;
                    font-size: 14px;
                }
                .user-greeting i { color: #c8902a; font-size: 18px; }
                .logout-btn {
                    background: transparent !important;
                    border: 1.5px solid #e53935 !important;
                    color: #e53935 !important;
                    font-size: 13px !important;
                    padding: 7px 14px !important;
                    border-radius: 8px !important;
                    cursor: pointer;
                    transition: background 0.18s, color 0.18s;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
                .logout-btn:hover {
                    background: #e53935 !important;
                    color: #fff !important;
                }
            `;
            document.head.appendChild(style);
        }
    });

    // ── Logout function (global) ──
    window.bpLogout = function () {
        localStorage.removeItem('bp_token');
        localStorage.removeItem('bp_user');
        window.location.href = 'login.html';
    };
})();