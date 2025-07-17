import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
  'https://ffsvsnmlqyfoctjtmrnw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmc3Zzbm1scXlmb2N0anRtcm53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3NzY1MzIsImV4cCI6MjA2ODM1MjUzMn0.vS3LCbtZzqFKPionHweCLKod6YBvgL1VQopOjhQhAFo' // DEIN KEY
);

const playerId = new URLSearchParams(location.search).get('player_id');

document.getElementById('buzzerBtn').onclick = async () => {
  if (!playerId) return;
  await supabase.from('players').update({ buzzed: true }).eq('id', playerId);
  document.body.innerHTML = '<h1 style="color:#2ecc71">Buzz registriert!</h1>';
};
