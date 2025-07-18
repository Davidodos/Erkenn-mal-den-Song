import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
  'https://ffsvsnmlqyfoctjtmrnw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmc3Zzbm1scXlmb2N0anRtcm53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3NzY1MzIsImV4cCI6MjA2ODM1MjUzMn0.vS3LCbtZzqFKPionHweCLKod6YBvgL1VQopOjhQhAFo'
);

// UUID aus URL holen
const urlParams = new URLSearchParams(window.location.search);
const playerId = urlParams.get('id');

const buzzerBtn = document.getElementById('buzzer');

if (!playerId) {
  alert('Kein Spieler-Link erkannt');
  buzzerBtn.disabled = true;
} else {
  buzzerBtn.addEventListener('click', async () => {
    // Buzzer senden
    const { error } = await supabase
      .from('players')
      .update({ buzzed: true, buzzed_at: new Date().toISOString() })
      .eq('id', playerId);

    if (error) {
      console.error('Fehler beim Buzz:', error);
      alert('Fehler beim Buzz!');
    } else {
      buzzerBtn.disabled = true;
      buzzerBtn.textContent = 'Gebuzzert!';
    }
  });

  // Polling: alle 1 Sekunde schauen ob reset wurde
  async function checkStatus() {
    const { data, error } = await supabase
      .from('players')
      .select('buzzed')
      .eq('id', playerId)
      .single();

    if (!error && data) {
      if (data.buzzed === false) {
        buzzerBtn.disabled = false;
        buzzerBtn.textContent = 'Buzz!';
      }
    }
  }

  setInterval(checkStatus, 1000);
  checkStatus();
}
