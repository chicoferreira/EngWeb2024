## Generate list of periods in the dataset

import os
import json

# Load the dataset
with open("compositores.json", "r", encoding="utf8") as f:
    dataset = json.load(f)

compositores = dataset["compositores"]

compositores.append(dict({
    "id": "C1001",
    "nome": "Gustav Mahler",
    "bio": "Gustav Mahler (Kalischt, Boêmia - Império Austríaco - atualmente República Checa, 7 de julho de 1860 — Viena, 18 de maio de 1911) foi um regente e compositor checo-austríaco de origem judaica.",
    "periodo": "Moderno",
    "dataNasc": "1860-07-07",
    "dataObito": "1911-05-18",
}))

compositores.append(dict({
    "id": "C1002",
    "nome": "Claude Debussy",
    "bio": "Achille-Claude Debussy (Saint-Germain-en-Laye, 22 de agosto de 1862 — Paris, 25 de março de 1918) foi um compositor francês, considerado um dos mais importantes compositores de música erudita do final do século XIX e início do século XX.",
    "periodo": "Moderno",
    "dataNasc": "1862-08-22",
    "dataObito": "1918-03-25",
}))

compositores.append(dict({
    "id": "C1003",
    "nome": "Richard Strauss",
    "bio": "Richard Georg Strauss (Munique, 11 de junho de 1864 — Garmisch-Partenkirchen, 8 de setembro de 1949) foi um compositor e maestro alemão.",
    "periodo": "Moderno",
    "dataNasc": "1864-06-11",
    "dataObito": "1949-09-08",
}))

compositores.append(dict({
    "id": "C1004",
    "nome": "Jean Sibelius",
    "bio": "Jean Sibelius (Hämeenlinna, 8 de dezembro de 1865 — Järvenpää, 20 de setembro de 1957) foi um compositor e regente finlandês.",
    "periodo": "Moderno",
    "dataNasc": "1865-12-08",
    "dataObito": "1957-09-20",
}))

compositores.append(dict({
    "id": "C1005",
    "nome": "Erik Satie",
    "bio": "Erik Satie (Honfleur, 17 de maio de 1866 — Paris, 1 de julho de 1925) foi um compositor e pianista francês.",
    "periodo": "Moderno",
    "dataNasc": "1866-05-17",
    "dataObito": "1925-07-01",
}))

# Save list of periods
with open("dataset.json", "w", encoding="utf8") as f:
    json.dump(dataset, f, indent=2)
