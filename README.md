# Beerpong-Weihnachtsturnier · Gruppe Timmer

Turnier-App für das Beerpong-Weihnachtsturnier der Gruppe Timmer (Landgemeinde
Bauernschützen e.V.) am Samstag, 19.12.2026. Läuft nach dem ersten Laden ohne Internet.

## Auf dem iPad einrichten

1. Die Seite in **Safari** öffnen (nicht Chrome, nur Safari kann auf iOS zum Home-Bildschirm
   hinzufügen).
2. Teilen-Symbol antippen, **Zum Home-Bildschirm** wählen, bestätigen.
3. Die App einmal vom Home-Bildschirm starten und ein paar Sekunden offen lassen, damit alles
   gespeichert wird.
4. **Flugmodus einschalten**, App komplett schließen, neu öffnen. Wenn sie startet, ist alles
   fertig.

## Wichtig

- Die Turnierdaten liegen nur auf dem Gerät, im Speicher der App. Schlüssel:
  `bierpong-gruppe-timmer-2026`.
- Home-Bildschirm-App und Safari-Tab haben auf iOS **getrennte Speicher**. Am Turnierabend
  also durchgehend dieselbe von beiden benutzen.
- Vor dem Abend über **Einrichtung → Backup** eine Sicherung herunterladen oder kopieren.

## Dateien

| Datei                  | Zweck                                                      |
| ---------------------- | ---------------------------------------------------------- |
| `index.html`           | die komplette App, eine Datei, ohne externe Abhängigkeiten |
| `manifest.webmanifest` | Name, Icons, Startverhalten als App                        |
| `sw.js`                | Service Worker, legt die App für den Offline-Betrieb ab     |
| `icons/`               | App-Icons aus dem Gruppenlogo                               |

## Nach einer Änderung an der App

In `sw.js` die Zeile `const VERSION = 'v1';` hochzählen, sonst bleibt auf den Geräten der alte
Stand im Cache liegen.
