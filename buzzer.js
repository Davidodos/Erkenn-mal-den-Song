import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://ffsvsnmlqyfoctjtmrnw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // <- hier ist dein echter Key einzutragen
const supabase = createClient(supabaseUrl, supabaseKey);

// UUID aus der URL lesen
const urlParams = new URLSearchParams(window.location.search);
const uuid = urlParams.get('id');

const buzzerBtn = document.getElementById('buzzer');
const statusDiv = document.getElementById('status');

if (!uuid) {
  buzzerBtn.disabled = true;
  statusDiv.textContent = 'Fehler: Kein Spieler-Link erkannt.';
} else {
  buzzerBtn.addEventListener('click', async () => {
    buzzerBtn.disabled = true;
    statusDiv.textContent = 'Buzz gesendet...';

    const { data, error } = await supabase
      .from('players')
      .update({
        buzzed: true,
        buzzed_at: new Date().toISOString(),
      })
      .eq('id', uuid);

    if (error) {
      console.error(error);
      statusDiv.textContent = 'Fehler beim Buzzern!';
      buzzerBtn.disabled = false;
    } else {
      statusDiv.textContent = 'Gebuzzert!';
    }
  });
}
