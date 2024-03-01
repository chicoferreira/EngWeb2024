import csv
import json


## bite_date;SpeciesIDDesc;BreedIDDesc;GenderIDDesc;color;vaccination_yrs;vaccination_date;victim_zip;AdvIssuedYNDesc;WhereBittenIDDesc;quarantine_date;DispositionIDDesc;head_sent_date;release_date;ResultsIDDesc
class AnimalBite:
    def __init__(
        self,
        bite_date,
        speciesIdDesc,
        breedIdDesc,
        genderIdDesc,
        color,
        vaccinationYrs,
        vaccinationDate,
        victimZip,
        advIssuedYNDesc,
        whereBittenIDDesc,
        quarantineDate,
        dispositionIDDesc,
        headSentDate,
        releaseDate,
        resultsIDDesc,
    ):
        self.bite_date = bite_date
        self.speciesIdDesc = speciesIdDesc
        self.breedIdDesc = breedIdDesc
        self.genderIdDesc = genderIdDesc
        self.color = color
        self.vaccinationYrs = vaccinationYrs
        self.vaccinationDate = vaccinationDate
        self.victimZip = victimZip
        self.advIssuedYNDesc = advIssuedYNDesc
        self.whereBittenIDDesc = whereBittenIDDesc
        self.quarantineDate = quarantineDate
        self.dispositionIDDesc = dispositionIDDesc
        self.headSentDate = headSentDate
        self.releaseDate = releaseDate
        self.resultsIDDesc = resultsIDDesc


class Animal:
    def __init__(self, id, designacao):
        self.id = id
        self.designacao = designacao


class Especie:
    def __init__(self, id, designacao, animal):
        self.id = id
        self.designacao = designacao
        self.animal = animal


class Dataset:
    def __init__(
        self,
        ocorrencias: list[AnimalBite],
        animais: list[Animal],
        especies: list[Especie],
    ):
        self.ocorrencias = ocorrencias
        self.animais = animais
        self.especies = especies


with open("Health_AnimalBites.csv", "r") as f:
    reader = csv.DictReader(f, delimiter=";")
    rows = list(reader)
    bites: list[AnimalBite] = []

for row in rows:
    bite = AnimalBite(
        row["bite_date"],
        row["SpeciesIDDesc"],
        row["BreedIDDesc"],
        row["GenderIDDesc"],
        row["color"],
        row["vaccination_yrs"],
        row["vaccination_date"],
        row["victim_zip"],
        row["AdvIssuedYNDesc"],
        row["WhereBittenIDDesc"],
        row["quarantine_date"],
        row["DispositionIDDesc"],
        row["head_sent_date"],
        row["release_date"],
        row["ResultsIDDesc"],
    )
    bites.append(bite)

animais = []
especies = []

current_animal_id = 0
current_especie_id = 0

for bite in bites:
    if bite.speciesIdDesc != "" and bite.speciesIdDesc not in [animal.designacao for animal in animais]:
        current_animal_id += 1
        animal = Animal(current_animal_id, bite.speciesIdDesc)
        animais.append(animal)

    if bite.breedIdDesc != "" and bite.breedIdDesc not in [especie.designacao for especie in especies]:
        current_especie_id += 1
        especie = Especie(current_especie_id, bite.breedIdDesc, bite.speciesIdDesc)
        especies.append(especie)

print(len(bites))

dataset = Dataset(bites, animais, especies)

result = {
    "ocorrencias": [bite.__dict__ for bite in bites],
    "animais": [animal.__dict__ for animal in animais],
    "especies": [especie.__dict__ for especie in especies],
}

with open("output.json", "w") as f:
    f.write(json.dumps(result, indent=2))
