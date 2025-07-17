import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
  'https://ffsvsnmlqyfoctjtmrnw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...AFo' // DEIN KEY
);

const playerId = new URLSearchParams(location.search).get('player_id');

document.getElementById('buzzerBtn').onclick = async () => {
  if (!playerId) return;
  await supabase.from('players').update({ buzzed: true }).eq('id', playerId);
  document.body.innerHTML = '<h1 style="color:#2ecc71">Buzz registriert!</h1>';
};
