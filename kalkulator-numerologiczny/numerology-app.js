/**
 * Numerology App Controller
 * Connects form inputs with full Synastry-standard report generation.
 */

import { buildNumerologyReportHtml, initPortalTooltip } from './numerology-report.js';

document.addEventListener('DOMContentLoaded', () => {
  initPortalTooltip();

  const form = document.getElementById('num-form');
  const resultsContainer = document.getElementById('num-results');
  const params = new URLSearchParams(window.location.search);
  const isPaid = params.get('unlocked') === 'true' || localStorage.getItem('neo_num_unlocked') === 'true';

  if (!form || !resultsContainer) return;

  // Restore saved inputs if present
  const savedD1 = localStorage.getItem('neo_num_d1');
  const savedD2 = localStorage.getItem('neo_num_d2');
  const savedN1 = localStorage.getItem('neo_num_n1');
  const savedN2 = localStorage.getItem('neo_num_n2');
  if (savedD1) document.getElementById('date1').value = savedD1;
  if (savedD2) document.getElementById('date2').value = savedD2;
  if (savedN1) document.getElementById('name1').value = savedN1;
  if (savedN2) document.getElementById('name2').value = savedN2;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const d1 = document.getElementById('date1').value;
    const d2 = document.getElementById('date2').value;
    const name1 = document.getElementById('name1').value.trim() || 'Osoba 1';
    const name2 = document.getElementById('name2').value.trim() || 'Osoba 2';

    if (!d1 || !d2) return;

    localStorage.setItem('neo_num_d1', d1);
    localStorage.setItem('neo_num_d2', d2);
    localStorage.setItem('neo_num_n1', name1);
    localStorage.setItem('neo_num_n2', name2);

    resultsContainer.innerHTML = buildNumerologyReportHtml(d1, d2, name1, name2, isPaid);
    resultsContainer.scrollIntoView({ behavior: 'smooth' });
  });

  if (savedD1 && savedD2 && isPaid) {
    const n1 = savedN1 || 'Osoba 1';
    const n2 = savedN2 || 'Osoba 2';
    resultsContainer.innerHTML = buildNumerologyReportHtml(savedD1, savedD2, n1, n2, true);
  }
});
