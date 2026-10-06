/* ==================== FEES MANAGEMENT JS ==================== */

let currentReceipt = null;

// ==================== MODAL HELPERS ====================
function openModal(id) {
    document.getElementById(id).classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(id) {
    document.getElementById(id).classList.remove('active');
    document.body.style.overflow = '';
}

document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// ==================== SET FEE ====================
function openSetFeeModal(studentId, studentName, currentFee, duration, startDate) {
    document.getElementById('setFeeStudentId').value = studentId;
    document.getElementById('setFeeStudentName').textContent = studentName;
    document.getElementById('setFeeAmount').value = currentFee || 0;
    document.getElementById('setFeeDuration').value = duration || 30;
    
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('setFeeStartDate').value = startDate || today;
    
    openModal('setFeeModal');
    setTimeout(() => document.getElementById('setFeeAmount').focus(), 100);
}

async function submitSetFee() {
    const studentId = document.getElementById('setFeeStudentId').value;
    const amount = parseFloat(document.getElementById('setFeeAmount').value) || 0;
    const duration = parseInt(document.getElementById('setFeeDuration').value) || 30;
    const startDate = document.getElementById('setFeeStartDate').value;

    if (amount < 0) {
        showToast('Fee amount cannot be negative', 'error');
        return;
    }

    try {
        const res = await fetch(`/set_fee/${studentId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                total_fee: amount,
                duration_days: duration,
                start_date: startDate
            })
        });
        const data = await res.json();

        if (data.success) {
            showToast(data.message, 'success');
            closeModal('setFeeModal');
            setTimeout(() => location.reload(), 1000);
        } else {
            showToast(data.message || 'Failed to update', 'error');
        }
    } catch (err) {
        showToast('Network error. Please try again.', 'error');
    }
}

// ==================== EDIT FEE ====================
function openEditFeeModal(studentId, studentName, baseFee, totalFee, months, paid, due) {
    document.getElementById('editFeeStudentId').value = studentId;
    document.getElementById('editFeeStudentName').textContent = studentName;
    document.getElementById('editFeeMonths').textContent = months + ' মাস';
    document.getElementById('editFeePaid').textContent = '₹' + Math.round(paid);
    document.getElementById('editFeeTotal').textContent = '₹' + Math.round(totalFee);
    document.getElementById('editFeeAmount').value = Math.round(baseFee);
    
    // Preview update
    updateEditPreview();
    
    openModal('editFeeModal');
    setTimeout(() => {
        document.getElementById('editFeeAmount').focus();
        document.getElementById('editFeeAmount').select();
    }, 100);
}

function updateEditPreview() {
    const newBase = parseFloat(document.getElementById('editFeeAmount').value) || 0;
    const monthsText = document.getElementById('editFeeMonths').textContent;
    const months = parseInt(monthsText) || 1;
    const paidText = document.getElementById('editFeePaid').textContent.replace('₹', '');
    const paid = parseFloat(paidText) || 0;
    
    const newTotal = newBase * months;
    const newDue = Math.max(0, newTotal - paid);
    
    document.getElementById('editFeeNewTotal').textContent = '₹' + Math.round(newTotal);
    document.getElementById('editFeeNewDue').textContent = '₹' + Math.round(newDue);
}

// Live preview update
document.addEventListener('input', (e) => {
    if (e.target && e.target.id === 'editFeeAmount') {
        updateEditPreview();
    }
});

async function submitEditFee() {
    const studentId = document.getElementById('editFeeStudentId').value;
    const newBase = parseFloat(document.getElementById('editFeeAmount').value) || 0;
    
    if (newBase < 0) {
        showToast('Fee amount cannot be negative', 'error');
        return;
    }
    
    try {
        const res = await fetch(`/edit_fee/${studentId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ base_fee: newBase })
        });
        const data = await res.json();
        
        if (data.success) {
            showToast(data.message, 'success');
            closeModal('editFeeModal');
            setTimeout(() => location.reload(), 1000);
        } else {
            showToast(data.message || 'Failed to update', 'error');
        }
    } catch (err) {
        showToast('Network error. Please try again.', 'error');
    }
}

// ==================== PAY FEE ====================
function openPayModal(studentId, studentName, dueAmount) {
    document.getElementById('payStudentId').value = studentId;
    document.getElementById('payStudentName').textContent = studentName;
    document.getElementById('payDueAmount').textContent = '₹' + Math.round(dueAmount);
    document.getElementById('payAmount').value = Math.round(dueAmount);
    document.getElementById('payMethod').value = 'Cash';
    document.getElementById('payRemarks').value = '';
    openModal('payModal');
    setTimeout(() => document.getElementById('payAmount').focus(), 100);
}

async function submitPayment() {
    const studentId = document.getElementById('payStudentId').value;
    const amount = parseFloat(document.getElementById('payAmount').value);
    const method = document.getElementById('payMethod').value;
    const remarks = document.getElementById('payRemarks').value;

    if (!amount || amount <= 0) {
        showToast('Please enter a valid amount', 'error');
        return;
    }

    const dueAmount = parseFloat(document.getElementById('payDueAmount').textContent.replace('₹', ''));
    if (amount > dueAmount) {
        showToast(`Amount exceeds due (₹${dueAmount})`, 'error');
        return;
    }

    try {
        const res = await fetch(`/pay_fee/${studentId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                amount: amount,
                payment_method: method,
                remarks: remarks
            })
        });
        const data = await res.json();

        if (data.success) {
            closeModal('payModal');
            currentReceipt = data.receipt;
            showReceipt(data.receipt);
            updateStudentRow(studentId, amount);
            refreshSummary();
        } else {
            showToast(data.message || 'Payment failed', 'error');
        }
    } catch (err) {
        showToast('Network error. Please try again.', 'error');
    }
}

// ==================== UPDATE ROW ====================
function updateStudentRow(studentId, amountPaid) {
    const row = document.querySelector(`tr[data-id="${studentId}"]`);
    if (!row) return;

    let paid = parseFloat(row.dataset.paid) + amountPaid;
    let due = parseFloat(row.dataset.due) - amountPaid;

    row.dataset.paid = paid;
    row.dataset.due = due;

    const paidCell = row.querySelector('.paid-amount');
    const dueCell = row.querySelector('.due-amount');
    if (paidCell) paidCell.textContent = '₹' + Math.round(paid);
    if (dueCell) dueCell.textContent = '₹' + Math.round(due);

    // Status column (index 9 — 11 columns: #, Student, Contact, Base, Months, Total, Paid, Due, Next Due, Status, Actions)
    const statusCell = row.children[9];
    if (statusCell) {
        if (due <= 0) {
            statusCell.innerHTML = '<span class="status-badge paid">Paid</span>';
            const payBtn = row.querySelector('.btn-pay');
            if (payBtn) payBtn.remove();
        } else {
            statusCell.innerHTML = '<span class="status-badge due">Due</span>';
        }
    }
}

// ==================== SUMMARY REFRESH ====================
async function refreshSummary() {
    try {
        const res = await fetch('/fees_summary');
        const data = await res.json();
        if (data.success) {
            document.getElementById('totalFees').textContent = Math.round(data.total_fees);
            document.getElementById('totalCollected').textContent = Math.round(data.total_collected);
            document.getElementById('totalDue').textContent = Math.round(data.total_due);
        }
    } catch (err) { /* silent */ }
}

// ==================== HISTORY ====================
async function openHistoryModal(studentId, studentName) {
    document.getElementById('historyStudentName').textContent = studentName;
    document.getElementById('historyContent').innerHTML =
        '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Loading...</div>';
    openModal('historyModal');

    try {
        const res = await fetch(`/fee_history/${studentId}`);
        const data = await res.json();

        if (data.success && data.payments.length > 0) {
            let html = '<div class="history-list">';
            data.payments.forEach(p => {
                html += `
                    <div class="history-item">
                        <div class="hi-left">
                            <strong>+ ₹${Math.round(p.amount)}</strong>
                            <small><i class="far fa-clock"></i> ${formatDate(p.payment_date)}</small>
                        </div>
                        <div class="hi-right">
                            <span class="method">${p.payment_method || 'Cash'}</span>
                            ${p.remarks ? `<span style="margin-top:4px;">${p.remarks}</span>` : ''}
                        </div>
                    </div>
                `;
            });
            html += '</div>';
            document.getElementById('historyContent').innerHTML = html;
        } else {
            document.getElementById('historyContent').innerHTML = `
                <div class="no-history">
                    <i class="fas fa-receipt"></i>
                    <p>No payment history found</p>
                </div>
            `;
        }
    } catch (err) {
        document.getElementById('historyContent').innerHTML =
            '<div class="no-history"><i class="fas fa-exclamation-circle"></i><p>Failed to load history</p></div>';
    }
}

function formatDate(dateStr) {
    if (!dateStr) return '—';
    try {
        const d = new Date(dateStr.replace(' ', 'T'));
        return d.toLocaleString('en-IN', {
            day: '2-digit', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit', hour12: true
        });
    } catch { return dateStr; }
}

// ==================== RECEIPT ====================
function showReceipt(r) {
    document.getElementById('rcptId').textContent = r.transaction_id;
    document.getElementById('rcptDate').textContent = r.payment_date;
    document.getElementById('rcptName').textContent = r.student_name;
    document.getElementById('rcptSid').textContent = 'EPS-' + String(r.student_id).padStart(4, '0');
    document.getElementById('rcptTotal').textContent = '₹' + Math.round(r.total_fee);
    document.getElementById('rcptPaid').textContent = '₹' + Math.round(r.amount_paid);
    document.getElementById('rcptTotalPaid').textContent = '₹' + Math.round(r.total_paid);
    document.getElementById('rcptDue').textContent = '₹' + Math.round(r.due_amount);
    document.getElementById('rcptMethod').textContent = r.payment_method;

    openModal('receiptModal');
}

function printReceipt() {
    if (!document.getElementById('receiptModal').classList.contains('active')) {
        showToast('Please open a receipt first', 'error');
        return;
    }
    window.print();
}

function shareOnWhatsApp() {
    if (!currentReceipt) return;

    const r = currentReceipt;
    const studentRow = document.querySelector(`tr[data-id="${r.student_id}"]`);
    let phone = studentRow ? studentRow.dataset.phone : '';

    let message = `*𝕋𝕙𝕖 𝔼𝕡𝕤𝕚𝕝𝕠𝕟『𝜀』*\n`;
    message += `_Learning Management System_\n`;
    message += `━━━━━━━━━━━━━━━━\n`;
    message += `*PAYMENT RECEIPT*\n`;
    message += `━━━━━━━━━━━━━━━━\n\n`;
    message += `🧾 Receipt No: *${r.transaction_id}*\n`;
    message += `📅 Date: ${r.payment_date}\n`;
    message += `👤 Student: *${r.student_name}*\n`;
    message += `🆔 ID: EPS-${String(r.student_id).padStart(4, '0')}\n\n`;
    message += `━━━━━━━━━━━━━━━━\n`;
    message += `💰 Total Fee: ₹${Math.round(r.total_fee)}\n`;
    message += `✅ Amount Paid: *₹${Math.round(r.amount_paid)}*\n`;
    message += `📊 Total Paid: ₹${Math.round(r.total_paid)}\n`;
    message += `⚠️ Due Amount: *₹${Math.round(r.due_amount)}*\n`;
    message += `💳 Method: ${r.payment_method}\n`;
    message += `━━━━━━━━━━━━━━━━\n\n`;
    message += `Thank you for your payment! 🙏\n`;
    message += `_𝕋𝕙𝕖 𝔼𝕡𝕤𝕚𝕝𝕠𝕟『𝜀』_`;

    const encodedMsg = encodeURIComponent(message);

    if (phone) {
        let cleanPhone = phone.replace(/\D/g, '');
        if (cleanPhone.length === 10) {
            cleanPhone = '91' + cleanPhone;
        }
        window.open(`https://wa.me/${cleanPhone}?text=${encodedMsg}`, '_blank');
    } else {
        window.open(`https://wa.me/?text=${encodedMsg}`, '_blank');
    }
}

// ==================== SEARCH & FILTER ====================
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.filter-btn');
let activeFilter = 'all';

if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.dataset.filter;
        applyFilters();
    });
});

function applyFilters() {
    const query = (searchInput?.value || '').toLowerCase().trim();
    const rows = document.querySelectorAll('.student-row');
    let visibleCount = 0;

    rows.forEach(row => {
        const name = (row.dataset.name || '').toLowerCase();
        const phone = (row.dataset.phone || '').toLowerCase();
        const id = row.dataset.id;
        const total = parseFloat(row.dataset.total);
        const due = parseFloat(row.dataset.due);

        const matchesSearch = !query ||
            name.includes(query) ||
            phone.includes(query) ||
            id.includes(query);

        let matchesFilter = true;
        if (activeFilter === 'due') matchesFilter = due > 0;
        else if (activeFilter === 'paid') matchesFilter = total > 0 && due === 0;
        else if (activeFilter === 'free') matchesFilter = total === 0;

        if (matchesSearch && matchesFilter) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });

    const noRes = document.getElementById('noResults');
    if (noRes) noRes.style.display = visibleCount === 0 ? 'block' : 'none';
}

// ==================== TOAST ====================
function showToast(message, type = 'success') {
    const existing = document.querySelector('.toast-notification');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ==================== EVENT DELEGATION (Action Buttons) ====================
document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;

    const action = btn.dataset.action;
    const id = btn.dataset.id;
    const name = btn.dataset.name;

    if (action === 'set-fee') {
        const fee = parseFloat(btn.dataset.fee) || 0;
        const duration = parseInt(btn.dataset.duration) || 30;
        const start = btn.dataset.start || '';
        openSetFeeModal(id, name, fee, duration, start);
    } else if (action === 'edit-fee') {
        const base = parseFloat(btn.dataset.base) || 0;
        const total = parseFloat(btn.dataset.total) || 0;
        const months = parseInt(btn.dataset.months) || 1;
        const paid = parseFloat(btn.dataset.paid) || 0;
        const due = parseFloat(btn.dataset.due) || 0;
        openEditFeeModal(id, name, base, total, months, paid, due);
    } else if (action === 'pay') {
        const due = parseFloat(btn.dataset.due) || 0;
        openPayModal(id, name, due);
    } else if (action === 'history') {
        openHistoryModal(id, name);
    }
});

// ==================== CLOCK ====================
document.addEventListener('DOMContentLoaded', () => {
    function updateTime() {
        const el = document.getElementById('currentDateTime');
        if (el) {
            el.textContent = new Date().toLocaleString('en-IN', {
                weekday: 'short', day: '2-digit', month: 'short',
                year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true
            });
        }
    }
    updateTime();
    setInterval(updateTime, 1000);
});