# Materiality

Polsko-angielski katalog materiałów do druku 3D. Witryna statyczna publikowana z katalogu głównego na GitHub Pages: https://sznycel2442.github.io/Materiality/.

Biblioteka obejmuje 162 filamenty, 22 rodziny tworzyw oraz dokumentację TDS, SDS, katalogi i deklaracje producentów. Dokumenty można przeszukiwać i filtrować według marki, typu i języka. Linki prowadzą do źródeł producentów; pliki PDF nie są kopiowane do repozytorium.

## Aktualizacja danych

`materiality-data.json` jest pełną bazą. Moduł `data/catalog-expansion.mjs` zawiera rozszerzenie katalogu, `data/documents.mjs` bezpośrednie linki Polymaker, a `data/fiberlogy-documents.json` dokumenty znalezione na stronach produktów Fiberlogy. Każdy produkt zachowuje stały identyfikator.

Po edycji źródeł uruchom (Node.js 22 lub nowszy):

```sh
node scripts/sync-catalog.mjs
node tests/catalog.test.mjs
```

Synchronizacja jest powtarzalna: aktualizuje JSON, osadzoną bazę w HTML oraz `filaments.csv`. Zachowuje dane żywic, drukarek, podajników i ceny. Wartości nieznane pozostają `null`. Orientacyjne ustawienia rodziny są oddzielone od zaleceń producenta. Moduł zginania i moduł przy rozciąganiu są osobnymi polami.

## Uruchomienie i weryfikacja

Otwórz `index.html` przez dowolny lokalny serwer statyczny. Projekt nie wymaga budowania ani backendu. `assets/documents.js` zawiera interfejs biblioteki dokumentów.

Test przeglądarkowy wymaga Playwright i Chromium:

```sh
npm install --no-save playwright
npx playwright install chromium
node tests/browser.test.mjs
```

Opcjonalna zmienna `PLAYWRIGHT_MODULE` wskazuje istniejący moduł Playwright. Test uruchamia własny serwer i sprawdza wersje PL/EN, wyszukiwanie, filtry, karty produktów, porównanie, eksport JSON i widok mobilny. Zrzuty trafiają do ignorowanego katalogu `test-results/`.

`node scripts/check-document-links.mjs` sprawdza nowe adresy PDF przez `curl` i zapisuje raport w `test-results/`. Blokada automatycznych zapytań przez producenta wymaga dodatkowego sprawdzenia w przeglądarce.

## Źródła

- [Dokumenty Polymaker](https://polymaker.com/download-material/)
- [Materiały Fiberlogy](https://fiberlogy.com/)
- [Katalog eSUN 2024](https://www.esun3d.com/uploads/eSUN-3D-Product-Manual2024.pdf)
- [Materiały SUNLU](https://www.sunlu.com/wiki/filament-category)

Licencja projektu: [GPL-3.0](LICENSE).
