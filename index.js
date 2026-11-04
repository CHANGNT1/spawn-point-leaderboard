<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Spawn Point - Booth Championship Leaderboard</title>
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- FontAwesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <!-- Canvas Confetti -->
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>

    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Plus Jakarta Sans', 'sans-serif'],
                    },
                    colors: {
                        gold: '#FFD700',
                        silver: '#C0C0C0',
                        bronze: '#CD7F32',
                        neonGreen: '#00FF66',
                        neonCyan: '#00F0FF',
                        neonPink: '#FF007A',
                    },
                    animation: {
                        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                        'float': 'float 4s ease-in-out infinite',
                        'glow': 'glow 2s ease-in-out infinite alternate',
                    },
                    keyframes: {
                        float: {
                            '0%, 100%': { transform: 'translateY(0)' },
                            '50%': { transform: 'translateY(-8px)' },
                        },
                        glow: {
                            '0%': { boxShadow: '0 0 15px rgba(0, 240, 255, 0.3)' },
                            '100%': { boxShadow: '0 0 35px rgba(0, 240, 255, 0.8)' },
                        }
                    }
                }
            }
        }
    </script>
    <style>
        .gold-card {
            background: linear-gradient(135deg, rgba(255, 215, 0, 0.18) 0%, rgba(202, 138, 4, 0.05) 100%);
            border: 2px solid rgba(255, 215, 0, 0.6);
        }
        .silver-card {
            background: linear-gradient(135deg, rgba(192, 192, 192, 0.18) 0%, rgba(148, 163, 184, 0.05) 100%);
            border: 2px solid rgba(192, 192, 192, 0.5);
        }
        .bronze-card {
            background: linear-gradient(135deg, rgba(205, 127, 50, 0.18) 0%, rgba(180, 83, 9, 0.05) 100%);
            border: 2px solid rgba(205, 127, 50, 0.5);
        }
        .glass-panel {
            background: rgba(13, 18, 30, 0.85);
            backdrop-filter: blur(18px);
            -webkit-backdrop-filter: blur(18px);
            border: 1px solid rgba(255, 255, 255, 0.08);
        }
        ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }
        ::-webkit-scrollbar-track {
            background: rgba(10, 14, 26, 0.8);
        }
        ::-webkit-scrollbar-thumb {
            background: rgba(30, 41, 59, 0.8);
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: rgba(51, 65, 85, 1);
        }
    </style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen font-sans selection:bg-cyan-500 selection:text-white pb-12">

    <!-- Glowing Background Orbs -->
    <div class="fixed top-0 left-1/4 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none -z-10"></div>
    <div class="fixed top-1/3 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none -z-10"></div>
    <div class="fixed bottom-10 left-1/3 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

    <!-- Header & Navigation -->
    <header class="sticky top-0 z-30 border-b border-slate-800/80 glass-panel">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <!-- Brand / Logo -->
            <div class="flex items-center gap-3">
                <div class="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/25 animate-pulse-slow">
                    <i class="fa-solid fa-gamepad text-white text-xl"></i>
                </div>
                <div>
                    <h1 class="text-xl sm:text-2xl font-black tracking-wider bg-gradient-to-r from-cyan-400 via-purple-300 to-pink-500 bg-clip-text text-transparent">
                        SPAWN POINT
                    </h1>
                    <p class="text-[10px] sm:text-xs text-cyan-400 font-bold tracking-widest uppercase">Booth Game Championship</p>
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex items-center gap-2 sm:gap-3">
                <button onclick="triggerCelebration()" class="px-3.5 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shadow-sm">
                    <i class="fa-solid fa-wand-magic-sparkles text-amber-400"></i>
                    <span class="hidden sm:inline">Celebrate</span>
                </button>
                <button onclick="exportToCSV()" class="px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs sm:text-sm font-semibold transition-all flex items-center gap-2">
                    <i class="fa-solid fa-file-csv"></i>
                    <span class="hidden sm:inline">Export CSV</span>
                </button>
                <button onclick="openModal()" class="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-cyan-500/25 transition-all transform active:scale-95 flex items-center gap-2">
                    <i class="fa-solid fa-plus"></i>
                    <span>Add Score</span>
                </button>
            </div>
        </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">

        <!-- Category Tab Bar -->
        <section class="glass-panel rounded-2xl p-2.5 shadow-xl">
            <div id="gameTabs" class="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                <!-- Game Tabs will be dynamically populated here -->
            </div>
        </section>

        <!-- Top 3 Podium Section -->
        <section id="podium-container" class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <!-- Dynamically Rendered Top 3 Podiums -->
        </section>

        <!-- Controls Section: Search, Sort -->
        <section class="glass-panel rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col md:flex-row gap-4 justify-between items-center">
            <!-- Search Bar -->
            <div class="relative w-full md:w-80">
                <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input type="text" id="searchInput" oninput="renderTable()" placeholder="Search player name..." 
                       class="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-11 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all">
            </div>

            <div class="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
                <!-- Sort Order -->
                <div class="relative flex-1 sm:flex-initial min-w-[170px]">
                    <select id="sortOrder" onchange="renderTable(); renderPodium();" class="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 transition-all appearance-none cursor-pointer">
                        <option value="DESC">Highest Score First</option>
                        <option value="ASC">Lowest Score/Time First</option>
                        <option value="NEWEST">Latest Added First</option>
                    </select>
                    <i class="fa-solid fa-chevron-down absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 pointer-events-none"></i>
                </div>

                <!-- Reset Data Button -->
                <button onclick="resetDataPrompt()" title="Reset to initial sample data" class="p-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 hover:text-rose-300 transition-all">
                    <i class="fa-solid fa-rotate-left"></i>
                </button>
            </div>
        </section>

        <!-- Full Leaderboard Table -->
        <section class="glass-panel rounded-2xl overflow-hidden shadow-2xl">
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-slate-900/90 border-b border-slate-800 text-xs uppercase tracking-wider text-slate-400 font-semibold">
                            <th class="py-4 px-6 text-center w-16">Rank</th>
                            <th class="py-4 px-6">Player Name</th>
                            <th class="py-4 px-6">Game Category</th>
                            <th class="py-4 px-6 text-right">Score / Performance</th>
                            <th class="py-4 px-6 text-center">Date & Time</th>
                            <th class="py-4 px-6 text-center w-28">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="leaderboardBody" class="divide-y divide-slate-800/50 text-sm font-medium">
                        <!-- Table rows populated dynamically -->
                    </tbody>
                </table>
            </div>

            <!-- Empty State -->
            <div id="emptyState" class="hidden py-16 text-center space-y-3">
                <div class="w-16 h-16 rounded-full bg-slate-800/80 flex items-center justify-center mx-auto text-slate-500 text-2xl">
                    <i class="fa-solid fa-trophy-slash"></i>
                </div>
                <h3 class="text-lg font-semibold text-slate-300">No High Scores Yet</h3>
                <p class="text-xs text-slate-500 max-w-xs mx-auto">No results match your criteria. Add a score to get the competition started!</p>
            </div>
        </section>
    </main>

    <!-- ADMIN MODAL -->
    <div id="adminModal" class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center hidden p-4 overflow-y-auto">
        <div class="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden my-8">
            <!-- Modal Header -->
            <div class="px-6 py-4 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
                <div class="flex items-center gap-2 text-indigo-400 font-bold text-lg">
                    <i class="fa-solid fa-sliders"></i>
                    <span class="text-white">Leaderboard Administration</span>
                </div>
                <button onclick="closeAdminModal()" class="text-slate-400 hover:text-white p-1 rounded-lg">
                    <i class="fa-solid fa-xmark text-xl"></i>
                </button>
            </div>

            <div class="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
                <!-- Add New Entry Form -->
            <form id="scoreForm" onsubmit="handleFormSubmit(event)" class="space-y-4">
                <input type="hidden" id="editId" value="">

                <div>
                    <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Player Name</label>
                    <input type="text" id="playerName" required placeholder="e.g. GamerTag99" 
                           class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all">
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Game Category</label>
                    <select id="gameName" onchange="toggleCustomGameInput(this.value)" required 
                            class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all">
                        <option value="FIFA">FIFA</option>
                        <option value="Rocket League">Rocket League</option>
                        <option value="NEW_CUSTOM">+ Add Custom Game...</option>
                    </select>
                </div>

                <div id="customGameContainer" class="hidden">
                    <label class="block text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">Custom Game Title</label>
                    <input type="text" id="customGameName" placeholder="e.g. Street Fighter / Tekken" 
                           class="w-full bg-slate-950 border border-cyan-500/50 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all">
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Score / Goal Count / Points</label>
                    <input type="number" step="any" id="scoreValue" required placeholder="e.g. 5 (FIFA Goals) or 1200 (RL Points)" 
                           class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all">
                </div>

                <div class="pt-4 flex gap-3">
                    <button type="button" onclick="closeModal()" class="flex-1 py-3 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition-all">
                        Cancel
                    </button>
                    <button type="submit" class="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-sm font-bold shadow-lg shadow-cyan-500/25 transition-all">
                        Save Result
                    </button>
                </div>
            </form>

                <!-- Manage Existing Entries -->
                <div>
                    <h4 class="font-bold text-white text-sm mb-3 flex items-center gap-2">
                        <i class="fa-solid fa-database text-indigo-400"></i> Manage Current Records (<span id="entryCount">0</span>)
                    </h4>
                    <div class="border border-slate-700 rounded-xl overflow-hidden max-h-60 overflow-y-auto">
                        <table class="w-full text-left text-xs">
                            <thead class="bg-slate-800 text-slate-400 uppercase">
                                <tr>
                                    <th class="py-2.5 px-3">Player</th>
                                    <th class="py-2.5 px-3">Score</th>
                                    <th class="py-2.5 px-3">Time</th>
                                    <th class="py-2.5 px-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody id="adminTableBody" class="divide-y divide-slate-800 bg-slate-900 text-slate-300">
                                <!-- Admin rows injected here -->
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Backup & Import / Reset Section -->
                <div class="pt-4 border-t border-slate-800 space-y-3">
                    <h4 class="font-bold text-white text-sm">Data Backup & Reset</h4>
                    <div class="flex flex-wrap items-center gap-3">
                        <button onclick="exportJSON()" class="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium border border-slate-700 transition flex items-center gap-1.5">
                            <i class="fa-solid fa-download"></i> Export JSON
                        </button>
                        <button onclick="exportCSV()" class="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium border border-slate-700 transition flex items-center gap-1.5">
                            <i class="fa-solid fa-file-csv"></i> Export CSV
                        </button>
                        
                        <label class="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium border border-slate-700 transition flex items-center gap-1.5 cursor-pointer">
                            <i class="fa-solid fa-upload"></i> Import JSON
                            <input type="file" id="importFile" accept=".json" onchange="importJSON(event)" class="hidden">
                        </label>

                        <button onclick="confirmReset()" class="ml-auto px-3 py-2 bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white rounded-lg text-xs font-medium border border-rose-500/30 transition flex items-center gap-1.5">
                            <i class="fa-solid fa-trash-can"></i> Clear All Data
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Notification Toast -->
    <div id="toast" class="fixed bottom-5 right-5 bg-indigo-600 text-white px-4 py-3 rounded-xl shadow-2xl transform translate-y-24 opacity-0 transition duration-300 z-50 flex items-center gap-2">
        <i class="fa-solid fa-circle-check"></i>
        <span id="toastMsg">Action completed!</span>
    </div>

    <!-- Application Script -->
    <script>
        // Storage Keys & Core State
        const STORAGE_KEY = 'booth_leaderboard_entries';
        let leaderboardData = [];
        let isTVMode = false;

        // Init App on Window Load
        window.onload = function() {
            loadData();
            renderLeaderboard();
        };

        // Load entries from LocalStorage
        function loadData() {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                try {
                    leaderboardData = JSON.parse(stored);
                } catch (e) {
                    console.error("Failed to parse storage data", e);
                    leaderboardData = [];
                }
            } else {
                // Mock Initial Demo Data if Empty
                leaderboardData = [
                    { id: '1', name: 'Sarah Jenkins', contact: 'sarah@demo.com', score: 2450, time: 38.4, timestamp: new Date().toISOString() },
                    { id: '2', name: 'David Chen', contact: 'david@demo.com', score: 2450, time: 32.1, timestamp: new Date().toISOString() },
                    { id: '3', name: 'Marcus Vance', contact: '@marcus_v', score: 2100, time: 41.0, timestamp: new Date().toISOString() },
                    { id: '4', name: 'Emily Taylor', contact: 'emily@demo.com', score: 1890, time: 29.5, timestamp: new Date().toISOString() }
                ];
                saveData();
            }
        }

        // Save state to LocalStorage
        function saveData() {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(leaderboardData));
        }

        // Sort Helper: Higher Score first -> Tied Score by Lower Time
        function getSortedLeaderboard() {
            return [...leaderboardData].sort((a, b) => {
                if (b.score !== a.score) {
                    return b.score - a.score;
                }
                return a.time - b.time; // Lower time breaks ties
            });
        }

        // Render Public Leaderboard Table & Podium
        function renderLeaderboard() {
            const sorted = getSortedLeaderboard();
            
            // Render Podium Top 3
            updatePodiumCard(1, sorted[0]);
            updatePodiumCard(2, sorted[1]);
            updatePodiumCard(3, sorted[2]);

            // Render Table
            const tbody = document.getElementById('leaderboardBody');
            const emptyState = document.getElementById('emptyState');
            tbody.innerHTML = '';

            if (sorted.length === 0) {
                emptyState.classList.remove('hidden');
            } else {
                emptyState.classList.add('hidden');
                sorted.forEach((player, index) => {
                    const rank = index + 1;
                    const row = document.createElement('tr');
                    row.className = "hover:bg-slate-700/30 transition duration-150";

                    // Badge formatting for rank
                    let rankBadge = `<span class="font-bold text-slate-400">#${rank}</span>`;
                    if (rank === 1) rankBadge = `<span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-black border border-amber-500/30">🥇 1</span>`;
                    if (rank === 2) rankBadge = `<span class="px-2 py-0.5 rounded bg-slate-400/20 text-slate-300 font-black border border-slate-400/30">🥈 2</span>`;
                    if (rank === 3) rankBadge = `<span class="px-2 py-0.5 rounded bg-amber-700/20 text-amber-600 font-black border border-amber-700/30">🥉 3</span>`;

                    const formattedDate = new Date(player.timestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                    row.innerHTML = `
                        <td class="py-4 px-4 font-semibold">${rankBadge}</td>
                        <td class="py-4 px-4 font-bold text-white">
                            <div>${escapeHTML(player.name)}</div>
                            ${player.contact ? `<div class="text-xs text-slate-400 font-normal">${escapeHTML(player.contact)}</div>` : ''}
                        </td>
                        <td class="py-4 px-4 font-black text-indigo-400 text-base">${Number(player.score).toLocaleString()} pts</td>
                        <td class="py-4 px-4 font-medium text-slate-300">${Number(player.time).toFixed(1)}s</td>
                        <td class="py-4 px-4 text-right text-xs text-slate-500">${formattedDate}</td>
                    `;
                    tbody.appendChild(row);
                });
            }

            renderAdminTable();
        }

        // Helper to update individual podium slot
        function updatePodiumCard(rank, player) {
            const nameEl = document.getElementById(`p${rank}Name`);
            const contactEl = document.getElementById(`p${rank}Contact`);
            const scoreEl = document.getElementById(`p${rank}Score`);
            const timeEl = document.getElementById(`p${rank}Time`);

            if (player) {
                nameEl.textContent = player.name;
                contactEl.textContent = player.contact || 'No Contact Info';
                scoreEl.textContent = `${Number(player.score).toLocaleString()} pts`;
                timeEl.innerHTML = `<i class="fa-regular fa-clock mr-1"></i>${Number(player.time).toFixed(1)}s`;
            } else {
                nameEl.textContent = '--';
                contactEl.textContent = '--';
                scoreEl.textContent = '0 pts';
                timeEl.innerHTML = `<i class="fa-regular fa-clock mr-1"></i>0.0s`;
            }
        }

        // Render Admin Data List
        function renderAdminTable() {
            const tbody = document.getElementById('adminTableBody');
            const countEl = document.getElementById('entryCount');
            tbody.innerHTML = '';
            countEl.textContent = leaderboardData.length;

            leaderboardData.forEach((player) => {
                const row = document.createElement('tr');
                row.className = "hover:bg-slate-800/80";
                row.innerHTML = `
                    <td class="py-2.5 px-3 font-semibold text-white">${escapeHTML(player.name)}</td>
                    <td class="py-2.5 px-3 text-indigo-400 font-bold">${player.score}</td>
                    <td class="py-2.5 px-3">${player.time}s</td>
                    <td class="py-2.5 px-3 text-right space-x-1">
                        <button onclick="editEntry('${player.id}')" class="px-2 py-1 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded text-xs transition">
                            <i class="fa-solid fa-pen"></i>
                        </button>
                        <button onclick="deleteEntry('${player.id}')" class="px-2 py-1 bg-rose-600/30 hover:bg-rose-600 text-rose-300 hover:text-white rounded text-xs transition">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        }

        // Add or Update Entry
        function handleAddEntry(e) {
            e.preventDefault();
            const editId = document.getElementById('editEntryId').value;
            const name = document.getElementById('playerName').value.trim();
            const contact = document.getElementById('playerContact').value.trim();
            const score = parseFloat(document.getElementById('playerScore').value);
            const time = parseFloat(document.getElementById('playerTime').value);

            if (!name || isNaN(score) || isNaN(time)) return;

            const previousTop = getSortedLeaderboard()[0]?.id;

            if (editId) {
                // Update Existing
                const index = leaderboardData.findIndex(item => item.id === editId);
                if (index !== -1) {
                    leaderboardData[index] = { ...leaderboardData[index], name, contact, score, time };
                    showToast('Player updated successfully!');
                }
            } else {
                // Add New
                const newEntry = {
                    id: Date.now().toString(),
                    name,
                    contact,
                    score,
                    time,
                    timestamp: new Date().toISOString()
                };
                leaderboardData.push(newEntry);
                showToast('New score added!');
            }

            saveData();
            renderLeaderboard();
            resetForm();

            // Trigger Confetti if new #1 champion achieved
            const newTop = getSortedLeaderboard()[0]?.id;
            if (newTop && newTop !== previousTop) {
                triggerConfetti();
            }
        }

        // Populate Edit Form
        function editEntry(id) {
            const item = leaderboardData.find(e => e.id === id);
            if (!item) return;

            document.getElementById('editEntryId').value = item.id;
            document.getElementById('playerName').value = item.name;
            document.getElementById('playerContact').value = item.contact || '';
            document.getElementById('playerScore').value = item.score;
            document.getElementById('playerTime').value = item.time;

            document.getElementById('formSubmitBtn').innerHTML = `<i class="fa-solid fa-floppy-disk"></i> Save Changes`;
            document.getElementById('cancelEditBtn').classList.remove('hidden');
        }

        // Delete Single Entry
        function deleteEntry(id) {
            leaderboardData = leaderboardData.filter(item => item.id !== id);
            saveData();
            renderLeaderboard();
            showToast('Player entry deleted.');
        }

        // Reset Admin Form State
        function resetForm() {
            document.getElementById('addScoreForm').reset();
            document.getElementById('editEntryId').value = '';
            document.getElementById('formSubmitBtn').innerHTML = `<i class="fa-solid fa-plus"></i> Add Player`;
            document.getElementById('cancelEditBtn').classList.add('hidden');
        }

        // Real-time Search Filter for Public Table
        function filterLeaderboard() {
            const query = document.getElementById('searchInput').value.toLowerCase();
            const rows = document.querySelectorAll('#leaderboardBody tr');

            rows.forEach(row => {
                const text = row.innerText.toLowerCase();
                row.style.display = text.includes(query) ? '' : 'none';
            });
        }

        // Admin Modal Visibility Handlers
        function openAdminModal() {
            document.getElementById('adminModal').classList.remove('hidden');
        }

        function closeAdminModal() {
            document.getElementById('adminModal').classList.add('hidden');
            resetForm();
        }

        // Export Data as JSON
        function exportJSON() {
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(leaderboardData, null, 2));
            const dlAnchor = document.createElement('a');
            dlAnchor.setAttribute("href", dataStr);
            dlAnchor.setAttribute("download", `booth_leaderboard_${new Date().toISOString().slice(0,10)}.json`);
            document.body.appendChild(dlAnchor);
            dlAnchor.click();
            dlAnchor.remove();
        }

        // Export Data as CSV
        function exportCSV() {
            if (leaderboardData.length === 0) {
                showToast('No data to export!');
                return;
            }
            let csvContent = "data:text/csv;charset=utf-8,ID,Name,Contact,Score,TimeSeconds,Timestamp\n";
            leaderboardData.forEach(row => {
                csvContent += `"${row.id}","${row.name}","${row.contact || ''}",${row.score},${row.time},"${row.timestamp}"\n`;
            });

            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `booth_leaderboard_${new Date().toISOString().slice(0,10)}.csv`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        }

        // Import Data from JSON File
        function importJSON(event) {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const imported = JSON.parse(e.target.result);
                    if (Array.isArray(imported)) {
                        leaderboardData = imported;
                        saveData();
                        renderLeaderboard();
                        showToast('Data imported successfully!');
                    } else {
                        showToast('Invalid file format!');
                    }
                } catch (err) {
                    showToast('Failed to parse JSON file!');
                }
            };
            reader.readAsText(file);
        }

        // Clear All Data with Safe Prompt
        function confirmReset() {
            if (window.confirm("Are you sure you want to clear ALL player entries? This action cannot be undone.")) {
                leaderboardData = [];
                saveData();
                renderLeaderboard();
                showToast('All data has been cleared.');
            }
        }

        // Toggle Fullscreen TV Presentation Mode
        function toggleTVMode() {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(err => {
                    console.log(`Error attempting to enable fullscreen: ${err.message}`);
                });
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
            }
        }

        // Notification Toast Helper
        function showToast(message) {
            const toast = document.getElementById('toast');
            document.getElementById('toastMsg').textContent = message;
            toast.classList.remove('translate-y-24', 'opacity-0');
            setTimeout(() => {
                toast.classList.add('translate-y-24', 'opacity-0');
            }, 3000);
        }

        // Confetti Visual Effect for new Leader
        function triggerConfetti() {
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }
        }

        // Helper to prevent HTML Injection
        function escapeHTML(str) {
            if (!str) return '';
            return str.replace(/[&<>'"]/g, 
                tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
            );
        }
    </script>
</body>
</html>
    <!-- Application Logic -->
    <script>
        // Initial Pre-seeded Competitive Data for FIFA & Rocket League
        const DEFAULT_LEADERBOARD = [
            { id: "1", name: "Marcus Vance", game: "FIFA", score: 7, timestamp: "2026-11-04 14:22" },
            { id: "2", name: "Leo 'Striker' Rossi", game: "FIFA", score: 6, timestamp: "2026-11-04 15:05" },
            { id: "3", name: "Sora Takahashi", game: "FIFA", score: 5, timestamp: "2026-11-04 16:10" },
            { id: "4", name: "Alex Mercer", game: "FIFA", score: 4, timestamp: "2026-11-04 11:30" },
            { id: "5", name: "Apex_Predator", game: "Rocket League", score: 1450, timestamp: "2026-11-04 13:45" },
            { id: "6", name: "BoostGoblin", game: "Rocket League", score: 1220, timestamp: "2026-11-04 12:15" },
            { id: "7", name: "AerialKing", game: "Rocket League", score: 980, timestamp: "2026-11-04 10:50" },
            { id: "8", name: "Shadow_Flip", game: "Rocket League", score: 840, timestamp: "2026-11-04 17:00" }
        ];

        let records = [];
        let activeTab = "ALL";

        // Game Badge Config
        const GAME_ICONS = {
            'FIFA': { icon: 'fa-futbol', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
            'Rocket League': { icon: 'fa-car-burst', color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30' }
        };

        window.onload = function() {
            loadRecords();
            renderApp();
        };

        function loadRecords() {
            const stored = localStorage.getItem('spawnpoint_leaderboard_data');
            if (stored) {
                try {
                    records = JSON.parse(stored);
                } catch(e) {
                    records = [...DEFAULT_LEADERBOARD];
                }
            } else {
                records = [...DEFAULT_LEADERBOARD];
                saveRecords();
            }
        }

        function saveRecords() {
            localStorage.setItem('spawnpoint_leaderboard_data', JSON.stringify(records));
        }

        function resetDataPrompt() {
            if (confirm("Reset Spawn Point leaderboard back to sample FIFA & Rocket League entries?")) {
                records = [...DEFAULT_LEADERBOARD];
                activeTab = "ALL";
                saveRecords();
                renderApp();
                showToast("Leaderboard reset to sample state.");
            }
        }

        function renderApp() {
            renderTabs();
            renderPodium();
            renderTable();
        }

        function getAvailableGames() {
            const dynamicGames = Array.from(new Set(records.map(r => r.game)));
            const defaults = ["FIFA", "Rocket League"];
            return Array.from(new Set([...defaults, ...dynamicGames]));
        }

        function switchTab(tabName) {
            activeTab = tabName;
            renderTabs();
            renderPodium();
            renderTable();
        }

        function renderTabs() {
            const tabContainer = document.getElementById('gameTabs');
            const availableGames = getAvailableGames();

            let tabsHtml = `
                <button onclick="switchTab('ALL')" 
                        class="px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap flex items-center gap-2 ${
                            activeTab === 'ALL' 
                            ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20' 
                            : 'bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
                        }">
                    <i class="fa-solid fa-trophy"></i>
                    <span>All Games</span>
                    <span class="ml-1 text-[10px] px-2 py-0.5 rounded-full ${activeTab === 'ALL' ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'}">${records.length}</span>
                </button>
            `;

            availableGames.forEach(game => {
                const count = records.filter(r => r.game === game).length;
                const isSelected = activeTab === game;
                const iconClass = GAME_ICONS[game]?.icon || 'fa-gamepad';

                tabsHtml += `
                    <button onclick="switchTab('${escapeHtml(game)}')" 
                            class="px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap flex items-center gap-2 ${
                                isSelected 
                                ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20' 
                                : 'bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
                            }">
                        <i class="fa-solid ${iconClass}"></i>
                        <span>${escapeHtml(game)}</span>
                        <span class="ml-1 text-[10px] px-2 py-0.5 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'}">${count}</span>
                    </button>
                `;
            });

            tabContainer.innerHTML = tabsHtml;
        }

        function getFilteredAndSortedRecords() {
            const search = document.getElementById('searchInput').value.toLowerCase().trim();
            const sort = document.getElementById('sortOrder').value;

            return records.filter(item => {
                const matchesName = item.name.toLowerCase().includes(search);
                const matchesTab = activeTab === 'ALL' || item.game === activeTab;
                return matchesName && matchesTab;
            }).sort((a, b) => {
                if (sort === 'DESC') return b.score - a.score;
                if (sort === 'ASC') return a.score - b.score;
                if (sort === 'NEWEST') return new Date(b.timestamp) - new Date(a.timestamp);
                return b.score - a.score;
            });
        }

        function renderPodium() {
            const container = document.getElementById('podium-container');
            const sortOrder = document.getElementById('sortOrder').value;
            
            // Get records for current active tab
            let currentTabRecords = records.filter(r => activeTab === 'ALL' || r.game === activeTab);

            let sortedAll = [...currentTabRecords].sort((a, b) => {
                return sortOrder === 'ASC' ? a.score - b.score : b.score - a.score;
            });

            const top3 = sortedAll.slice(0, 3);
            container.innerHTML = '';

            if (top3.length === 0) {
                container.innerHTML = `<div class="col-span-3 text-center text-slate-500 py-6">No leaders for ${escapeHtml(activeTab)}. Add scores to fill the podium!</div>`;
                return;
            }

            const podiumOrder = [
                { item: top3[1], rank: 2, badge: '🥈', colorClass: 'silver-card', badgeBg: 'bg-slate-300 text-slate-900', order: 'order-2 md:order-1' },
                { item: top3[0], rank: 1, badge: '👑', colorClass: 'gold-card animate-glow', badgeBg: 'bg-amber-400 text-slate-950 font-black scale-110', order: 'order-1 md:order-2' },
                { item: top3[2], rank: 3, badge: '🥉', colorClass: 'bronze-card', badgeBg: 'bg-amber-700 text-amber-100', order: 'order-3' }
            ];

            podiumOrder.forEach(p => {
                if (!p.item) return;

                const isFirst = p.rank === 1;
                const iconClass = GAME_ICONS[p.item.game]?.icon || 'fa-gamepad';

                const cardHtml = `
                    <div class="${p.order} relative rounded-3xl p-6 ${p.colorClass} shadow-xl flex flex-col justify-between transition-all hover:scale-[1.02] duration-300 ${isFirst ? 'md:-translate-y-3' : ''}">
                        ${isFirst ? '<div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 text-[10px] font-extrabold uppercase px-3.5 py-1 rounded-full tracking-widest shadow-lg shadow-amber-400/30">Championship Leader</div>' : ''}
                        
                        <div>
                            <div class="flex justify-between items-start mb-4">
                                <span class="w-10 h-10 rounded-2xl ${p.badgeBg} flex items-center justify-center font-bold text-lg shadow-md">
                                    ${p.badge}
                                </span>
                                <span class="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-700/80 text-slate-300">
                                    Rank #${p.rank}
                                </span>
                            </div>

                            <h3 class="text-xl font-extrabold text-white tracking-tight truncate" title="${escapeHtml(p.item.name)}">${escapeHtml(p.item.name)}</h3>
                            <p class="text-xs text-cyan-400 font-semibold truncate mt-1 flex items-center gap-1.5">
                                <i class="fa-solid ${iconClass}"></i>
                                ${escapeHtml(p.item.game)}
                            </p>
                        </div>

                        <div class="mt-6 pt-4 border-t border-white/10 flex items-baseline justify-between">
                            <span class="text-xs text-slate-400 uppercase font-bold tracking-wider">Score</span>
                            <span class="text-2xl sm:text-3xl font-black text-white tracking-tight">${Number(p.item.score).toLocaleString()}</span>
                        </div>
                    </div>
                `;
                container.innerHTML += cardHtml;
            });
        }

        function renderTable() {
            const tbody = document.getElementById('leaderboardBody');
            const emptyState = document.getElementById('emptyState');
            const list = getFilteredAndSortedRecords();

            tbody.innerHTML = '';

            if (list.length === 0) {
                emptyState.classList.remove('hidden');
                return;
            } else {
                emptyState.classList.add('hidden');
            }

            list.forEach((entry, index) => {
                const rank = index + 1;
                let rankBadgeClass = "bg-slate-800 text-slate-400 border border-slate-700";
                
                if (rank === 1) rankBadgeClass = "bg-amber-400/20 text-amber-300 border border-amber-400/50 font-bold";
                else if (rank === 2) rankBadgeClass = "bg-slate-300/20 text-slate-200 border border-slate-300/50 font-bold";
                else if (rank === 3) rankBadgeClass = "bg-amber-700/20 text-amber-400 border border-amber-600/50 font-bold";

                const iconClass = GAME_ICONS[entry.game]?.icon || 'fa-gamepad';
                const styleClass = GAME_ICONS[entry.game]?.color || 'text-cyan-300 bg-slate-800/80 border-slate-700/60';

                const tr = document.createElement('tr');
                tr.className = "hover:bg-slate-800/40 transition-colors group border-b border-slate-800/50";
                tr.innerHTML = `
                    <td class="py-4 px-6 text-center">
                        <span class="inline-flex items-center justify-center w-8 h-8 rounded-xl text-xs font-bold ${rankBadgeClass}">
                            ${rank}
                        </span>
                    </td>
                    <td class="py-4 px-6">
                        <div class="font-bold text-slate-100">${escapeHtml(entry.name)}</div>
                    </td>
                    <td class="py-4 px-6">
                        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold ${styleClass}">
                            <i class="fa-solid ${iconClass} text-[11px]"></i>
                            ${escapeHtml(entry.game)}
                        </span>
                    </td>
                    <td class="py-4 px-6 text-right">
                        <span class="font-black text-base text-white tracking-tight">${Number(entry.score).toLocaleString()}</span>
                    </td>
                    <td class="py-4 px-6 text-center text-xs text-slate-400 font-medium">
                        ${entry.timestamp || 'N/A'}
                    </td>
                    <td class="py-4 px-6 text-center">
                        <div class="flex items-center justify-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                            <button onclick="editEntry('${entry.id}')" title="Edit Score" class="w-8 h-8 rounded-lg bg-slate-800 hover:bg-cyan-500/20 hover:text-cyan-400 text-slate-400 border border-slate-700 transition-all flex items-center justify-center">
                                <i class="fa-solid fa-pen-to-square text-xs"></i>
                            </button>
                            <button onclick="deleteEntry('${entry.id}')" title="Delete Score" class="w-8 h-8 rounded-lg bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 border border-slate-700 transition-all flex items-center justify-center">
                                <i class="fa-solid fa-trash-can text-xs"></i>
                            </button>
                        </div>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        }

        function populateModalGameOptions(selectedGame = 'FIFA') {
            const select = document.getElementById('gameName');
            const availableGames = getAvailableGames();

            select.innerHTML = '';
            availableGames.forEach(g => {
                select.innerHTML += `<option value="${escapeHtml(g)}">${escapeHtml(g)}</option>`;
            });
            select.innerHTML += `<option value="NEW_CUSTOM">+ Add Custom Game...</option>`;

            if (availableGames.includes(selectedGame)) {
                select.value = selectedGame;
                toggleCustomGameInput(selectedGame);
            } else {
                select.value = availableGames[0];
                toggleCustomGameInput(availableGames[0]);
            }
        }

        function toggleCustomGameInput(val) {
            const customContainer = document.getElementById('customGameContainer');
            const customInput = document.getElementById('customGameName');

            if (val === 'NEW_CUSTOM') {
                customContainer.classList.remove('hidden');
                customInput.required = true;
                customInput.focus();
            } else {
                customContainer.classList.add('hidden');
                customInput.required = false;
            }
        }

        function openModal(editId = null) {
            const modal = document.getElementById('entryModal');
            const title = document.getElementById('modalTitle');
            const iconBg = document.getElementById('modalIconBg');
            const icon = document.getElementById('modalIcon');
            const form = document.getElementById('scoreForm');

            form.reset();
            document.getElementById('editId').value = '';

            const defaultGameOption = activeTab !== 'ALL' ? activeTab : 'FIFA';
            populateModalGameOptions(defaultGameOption);

            if (editId) {
                const target = records.find(r => r.id === editId);
                if (target) {
                    document.getElementById('editId').value = target.id;
                    document.getElementById('playerName').value = target.name;
                    populateModalGameOptions(target.game);
                    document.getElementById('scoreValue').value = target.score;

                    title.innerText = "Edit Player Record";
                    iconBg.className = "w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg";
                    icon.className = "fa-solid fa-user-pen";
                }
            } else {
                title.innerText = "Add New Result";
                iconBg.className = "w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-lg";
                icon.className = "fa-solid fa-user-plus";
            }

            modal.classList.remove('opacity-0', 'pointer-events-none');
            const card = modal.querySelector('div');
            card.classList.remove('scale-95');
            card.classList.add('scale-100');
        }

        function closeModal() {
            const modal = document.getElementById('entryModal');
            const card = modal.querySelector('div');
            card.classList.remove('scale-100');
            card.classList.add('scale-95');
            modal.classList.add('opacity-0', 'pointer-events-none');
        }

        function handleFormSubmit(e) {
            e.preventDefault();
            const id = document.getElementById('editId').value;
            const name = document.getElementById('playerName').value.trim();
            
            let game = document.getElementById('gameName').value;
            if (game === 'NEW_CUSTOM') {
                game = document.getElementById('customGameName').value.trim();
            }

            const score = parseFloat(document.getElementById('scoreValue').value);
            const now = new Date();
            const timestamp = now.toISOString().slice(0, 10) + ' ' + now.toTimeString().slice(0, 5);

            if (id) {
                const index = records.findIndex(r => r.id === id);
                if (index !== -1) {
                    records[index] = { ...records[index], name, game, score, timestamp };
                    showToast("Record updated successfully!");
                }
            } else {
                const newRecord = {
                    id: Date.now().toString(),
                    name,
                    game,
                    score,
                    timestamp
                };
                records.push(newRecord);
                showToast(`New high score logged for ${name}!`);
                triggerCelebration();
            }

            saveRecords();
            renderApp();
            closeModal();
        }

        function editEntry(id) {
            openModal(id);
        }

        function deleteEntry(id) {
            const target = records.find(r => r.id === id);
            if (!target) return;

            if (confirm(`Delete result for "${target.name}" in ${target.game}?`)) {
                records = records.filter(r => r.id !== id);
                saveRecords();
                renderApp();
                showToast("Record deleted.");
            }
        }

        function exportToCSV() {
            if (records.length === 0) {
                showToast("No data available to export.");
                return;
            }

            let csvContent = "data:text/csv;charset=utf-8,";
            csvContent += "ID,Player Name,Game,Score,Timestamp\n";

            records.forEach(r => {
                const row = [
                    `"${r.id}"`,
                    `"${r.name.replace(/"/g, '""')}"`,
                    `"${r.game.replace(/"/g, '""')}"`,
                    r.score,
                    `"${r.timestamp}"`
                ].join(",");
                csvContent += row + "\n";
            });

            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `spawnpoint_leaderboard_${new Date().toISOString().slice(0,10)}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            showToast("CSV file exported successfully!");
        }

        function triggerCelebration() {
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 120,
                    spread: 80,
                    origin: { y: 0.6 }
                });
            }
        }

        function showToast(message) {
            const toast = document.getElementById('toast');
            const toastMsg = document.getElementById('toastMsg');
            toastMsg.innerText = message;

            toast.classList.remove('translate-y-20', 'opacity-0');
            toast.classList.add('translate-y-0', 'opacity-100');

            setTimeout(() => {
                toast.classList.remove('translate-y-0', 'opacity-100');
                toast.classList.add('translate-y-20', 'opacity-0');
            }, 3000);
        }

        function escapeHtml(str) {
            return str.replace(/[&<>'"]/g, 
                tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
            );
        }
    </script>
</body>
</html>
