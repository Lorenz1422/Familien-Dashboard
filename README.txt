FAMILIENZENTRALE – BEREINIGTES TESTPAKET

Enthaltene Dateien:
- index.html: bereinigte Dashboard-Version ohne Kinderbereich
- manifest.json: PWA-Konfiguration
- service-worker.js: Offline-Startseite; bereinigt nur eigene familienzentrale-* Caches
- icons/: App-Symbole für die Familienzentrale

NICHT enthalten:
- assets/ und zauberwald_hintergrund.png: Kinder-/Garten-Grafiken, in der bereinigten index.html nicht referenziert
- test.html und weitere Kinder-Testdateien
- alte/alternative Dashboard-HTML-Dateien

WICHTIG:
1. Dieses Paket ist für ein separates GitHub-Test-Repository gedacht.
2. Es ändert weder GitHub noch Supabase automatisch.
3. Supabase wurde NICHT verändert. Keine Tabellen, Funktionen, Policies oder Storage-Dateien löschen, bevor Abhängigkeiten separat geprüft wurden.
4. Die übrigen Dashboard-Funktionen wurden nicht absichtlich umgebaut, sind aber noch nicht vollständig im Browser getestet.
5. Die ZIP enthält alle Dateien, die die bereinigte index.html für die lokale PWA-/Icon-Struktur referenziert.
