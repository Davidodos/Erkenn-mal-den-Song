import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
  'https://ffsvsnmlqyfoctjtmrnw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...AFo' // DEIN KEY
);

const input = document.getElementById('playerName');
const addBtn = document.getElementById('addPlayer');
const resetBtn = document.getElementById('resetBuzzers');
const list = document.getElementById('playersList');

async function loadPlayers() {
  const { data } = await supabase.from('players').select('*').order('created_at');
  list.innerHTML = '';
  data.forEach(p => {
    const el = document.createElement('div');
    el.className = 'player';
    el.innerHTML = `
      <strong>${p.name}</strong><br>
      Link: <a href="./buzzer.html?player_id=${p.id}" target="_blank">buzzer.html?player_id=${p.id}</a><br>
      Gebuzzert: ${p.buzzed ? '<span class="buzzed">JA</span>' : 'Nein'}
      <button data-id="${p.id}">Entfernen</button>
    `;
    el.querySelector('button').onclick = async () => {
      await supabase.from('players').delete().eq('id', p.id);
      loadPlayers();
    };
    list.appendChild(el);
  });
}

addBtn.onclick = async () => {
  const name = input.value.trim();
  if (!name) return;
  const { data, error } = await supabase.from('players').insert([{ name, buzzed: false }]);
  input.value = '';
  loadPlayers();
};

resetBtn.onclick = async () => {
  await supabase.from('players').update({ buzzed: false }).neq('buzzed', false);
  loadPlayers();
};

loadPlayers();
