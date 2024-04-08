import json

import requests

datasets = ["datasets/dataset-extra1.json", "datasets/dataset-extra2.json", "datasets/dataset-extra3.json"]

for dataset in datasets:
    with open(dataset) as f:
        data = json.load(f)
        for pessoa in data["pessoas"]:
            requests.post("http://localhost:3000/", json=pessoa)
        print("Imported dataset: " + dataset + " with " + str(len(data["pessoas"])) + " people.")
