import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
  'https://ffsvsnmlqyfoctjtmrnw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmc3Zzbm1scXlmb2N0anRtcm53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3NzY1MzIsImV4cCI6MjA2ODM1MjUzMn0.vS3LCbtZzqFKPionHweCLKod6YBvgL1VQopOjhQhAFo' // DEIN KEY
);

const display = document.getElementById('playersDisplay');

async function loadBuzzers() {
  const { data, error } = await supabase
    .from('players')
    .select('*')
    .order('buzzed_at', { ascending: true });

  if (error) {
    console.error('Fehler beim Laden der Buzzer:', error);
    return;
  }

  const list = document.getElementById('buzzedList');
  list.innerHTML = '';

  data
    .filter(p => p.buzzed)
    .forEach((player, index) => {
      const li = document.createElement('li');
      li.textContent = `${index + 1}. ${player.name}`;
      list.appendChild(li);
    });
}


loadPlayers();

supabase.channel('players')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'players' }, loadPlayers)
  .subscribe();
