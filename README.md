# WeGlide Photoframe

Jednoduchá fullscreen prezentace leteckých fotografií. Aplikace načte seznam snímků z JSON, náhodně je seřadí a automaticky mezi nimi přepíná. U každé fotografie zobrazuje jméno pilota a datum.

## Spuštění

Požadavkem je Node.js s npm. Závislosti nainstalujete a vývojový server spustíte příkazy:

```bash
npm install
npm start
```

Aplikace bude dostupná na [http://localhost:3000](http://localhost:3000).

Produkční sestavení vytvoříte příkazem:

```bash
npm run build
```

Výsledné soubory budou v adresáři `build`.

## Zdroj fotografií

Aplikace při spuštění načítá soubor `public/image_urls.json`. Soubor obsahuje JSON pole objektů v následujícím formátu:

```json
[
  {
    "url": "https://example.com/photo.jpg",
    "pilot": "Jméno pilota",
    "datum": "2025-08-26"
  }
]
```

Pořadí načtených fotografií se při každém spuštění náhodně promíchá.

## URL parametry

Chování prezentace lze upravit parametry v URL:

| Parametr | Význam | Výchozí hodnota | Příklad |
| --- | --- | --- | --- |
| `interval` | Interval přepínání fotografií v sekundách | `30` | `?interval=15` |
| `scale` | Násobek velikosti popisku | `1` | `?scale=1.25` |
| `zoom` | Alternativní název parametru `scale` | `1` | `?zoom=1.5` |

Hodnota `interval` musí být kladné číslo. Při chybějící nebo neplatné hodnotě se použije výchozí interval 30 sekund.

Parametry lze kombinovat:

```text
http://localhost:3000/?interval=10&scale=1.25
```

## Testy

Testy spustíte příkazem:

```bash
npm test -- --watchAll=false
```
