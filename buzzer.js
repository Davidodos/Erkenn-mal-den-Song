import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// 🔐 Supabase-Daten
const supabaseUrl = 'https://ffsvsnmlqyfoctjtmrnw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // gekürzt
const supabase = createClient(supabaseUrl, supabaseKey);

// 🔍 ID aus URL holen
const urlParams = new URLSearchParams(window.location.search);
const playerId = urlParams.get('id');

const button = document.getElementById('buzzBtn');
const statusDiv = document.getElementById('status');

if (!playerId) {
  statusDiv.textContent = '❌ Kein Spieler-Link erkannt (id fehlt in der URL)';
  button.disabled = true;
} else {
  button.addEventListener('click', async () => {
    button.disabled = true;
    statusDiv.textContent = '⏳ Buzz wird gesendet...';

    const { error } = await supabase
      .from('players')
      .update({
        buzzed: true,
        buzzed_at: new Date().toISOString()
      })
      .eq('id', playerId);

    if (error) {
      console.error(error);
      statusDiv.textContent = '❌ Fehler beim Buzz!';
      button.disabled = false;
    } else {
      statusDiv.textContent = '✅ Buzz gesendet!';
    }
  });
}
