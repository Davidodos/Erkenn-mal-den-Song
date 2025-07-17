import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
  'https://ffsvsnmlqyfoctjtmrnw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...AFo' // DEIN KEY
);

const display = document.getElementById('playersDisplay');

async function loadPlayers() {
  const { data } = await supabase.from('players').select('*').order('created_at');
  display.innerHTML = '';
  data.forEach(p => {
    const el = document.createElement('div');
    el.className = 'player';
    el.innerHTML = `${p.name}: ${p.buzzed ? '<span class="buzzed">💥</span>' : '—'}`;
    display.appendChild(el);
  });
}

loadPlayers();

supabase.channel('players')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'players' }, loadPlayers)
  .subscribe();
