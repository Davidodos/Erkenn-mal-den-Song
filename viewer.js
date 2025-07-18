import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://ffsvsnmlqyfoctjtmrnw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmc3Zzbm1scXlmb2N0anRtcm53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3NzY1MzIsImV4cCI6MjA2ODM1MjUzMn0.vS3LCbtZzqFKPionHweCLKod6YBvgL1VQopOjhQhAFo';

const supabase = createClient(supabaseUrl, supabaseKey);

async function loadBuzzers() {
  const { data, error } = await supabase
    .from('buzzers')
    .select('*')
    .eq('buzzed', true)
    .order('buzzed_at', { ascending: true });

  if (error) {
    console.error('Fehler beim Laden der Buzzer:', error);
    return;
  }

  const list = document.getElementById('buzzedList');
  list.innerHTML = '';

  data.forEach((player, index) => {
    const li = document.createElement('li');
    li.textContent = `${index + 1}. ${player.name}`;
    list.appendChild(li);
  });
}

// Alle 1 Sekunde aktualisieren
setInterval(loadBuzzers, 1000);
loadBuzzers(); // Sofortiger erster Aufruf
