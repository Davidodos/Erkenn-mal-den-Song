import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Supabase-Zugangsdaten
const supabaseUrl = 'https://ffsvsnmlqyfoctjtmrnw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmc3Zzbm1scXlmb2N0anRtcm53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3NzY1MzIsImV4cCI6MjA2ODM1MjUzMn0.vS3LCbtZzqFKPionHweCLKod6YBvgL1VQopOjhQhAFo';

const supabase = createClient(supabaseUrl, supabaseKey);

// Spieler-ID aus URL holen (z. B. ?id=xyz)
const urlParams = new URLSearchParams(window.location.search);
const playerId = urlParams.get('id');

const buzzerBtn = document.getElementById('buzzer');

buzzerBtn.addEventListener('click', async () => {
  buzzerBtn.disabled = true;

  const { error } = await supabase
    .from('buzzers')
    .update({
      buzzed: true,
      buzzed_at: new Date().toISOString()
    })
    .eq('id', uuid); // oder 'uuid' wenn du UUIDs nutzt

  if (error) {
    console.error('Fehler beim Buzz:', error.message);
  } else {
    buzzerBtn.textContent = 'Gebuzzert!';
  }
});
