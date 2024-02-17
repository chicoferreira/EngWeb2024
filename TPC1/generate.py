import os
import xml.etree.ElementTree as et


class Figure:
    def __init__(self, legenda: str, path: str):
        self.legenda = legenda
        self.path = path


class Casa:
    def __init__(self, numero: str, enfiteuta: str, foro: str, desc: str, vista: str):
        self.numero = numero
        self.enfiteuta = enfiteuta
        self.foro = foro
        self.desc = desc
        self.vista = vista


class Street:
    def __init__(self, numero: int, name: str, content: et.Element):
        self.numero = numero
        self.name = name
        self.content = content


def extract_text_from_element_recursively(element: et.Element) -> str:
    return et.tostring(element, encoding="unicode", method="text")


def get_optional_text(element: et.Element, tag: str, default="") -> str:
    e = element.find(tag)
    if e is not None:
        return e.text
    else:
        return default


def parse_casa_from_xml(casa: et.Element) -> Casa:
    numero = casa.find("número").text
    enfiteuta = get_optional_text(casa, "entifeuta", "Não informado")
    foro = get_optional_text(casa, "foro", "Não informado")
    desc = casa.find("descrição")
    if desc is not None:
        desc = extract_text_from_element_recursively(desc)
    else:
        desc = "Não informado"
    vista = get_optional_text(casa, "vista", "Não informado")

    return Casa(numero, enfiteuta, foro, desc, vista)


def parse_street_from_xml_file(file_path: str) -> Street:
    tree = et.parse(file_path)
    meta = tree.find("meta")
    numero = int(meta.find("número").text)
    name = meta.find("nome").text.strip()
    content = tree.find("corpo")

    return Street(numero, name, content)


def generate_index_street_in_list(street_name: str, street_link: str) -> str:
    return f'\t\t\t\t<li><a href="{street_link}">{street_name}</a></li>'


def generate_index(mrbs: list[Street]) -> str:
    streets = ""
    for street in mrbs:
        streets += '\n' + generate_index_street_in_list(street.name, "ruas/" + generate_street_file_html_name(street))

    return f"""<html lang="pt">
    <head>
        <title>Mapa Ruas</title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    </head>
    
    <body>
        <div class="w3-container w3-teal">
            <h1><a href="index.html" style="text-decoration:none">Mapa Ruas</a></h1>
        </div>
        <div class="w3-container">
            <p>Escolha uma das ruas abaixo:</p>
    
            <ul class="w3-ul">{streets}
            </ul>
        </div>
    </body>
</html>"""


def generate_street_file_html_name(street: Street) -> str:
    return f"{street.numero:02}-{street.name.replace(' ', '_')}.html"


def generate_image_html(figure: Figure) -> str:
    return f"""<div class="w3-card" style="width: 60%">
    <img src="{figure.path}" alt="Rua do Campo" style="width:100%; height: auto">
    <div class="w3-container w3-center">
        <p>{figure.legenda}</p>
    </div>
</div>"""


def generate_casa_html(casa: Casa) -> str:
    return f"""<tr>
    <td>{casa.numero}</td>
    <td>{casa.enfiteuta}</td>
    <td>{casa.foro}</td>
    <td>{casa.desc}</td>
</tr>"""


def generate_casas_html(casas: list[Casa]) -> str:
    casas_html = ""
    for casa in casas:
        casas_html += generate_casa_html(casa)

    return f"""<h3>Casas</h3>
    <table class="w3-table w3-striped w3-bordered w3-border w3-hoverable">
        <tr>
            <th>Número</th>
            <th>Enfiteuta</th>
            <th>Foro</th>
            <th>Descrição</th>
        </tr>
        {casas_html}
    </table>
"""


def generate_street_html(street: Street) -> str:
    content = ""
    for e in street.content:
        if e.tag == "figura":
            legenda = e.find("legenda").text
            path = e.find("imagem").attrib.get("path").replace("..", "../dataset")
            content += generate_image_html(Figure(legenda, path))
        elif e.tag == "lista-casas":
            casas = [parse_casa_from_xml(casa) for casa in e]
            content += generate_casas_html(casas)
        elif e.tag == "para":
            content += f"<p>{extract_text_from_element_recursively(e)}</p>"
        elif e.tag == "nome":
            content += f"<h3>{e.text}</h3>"
        else:
            raise Exception(f"Unknown tag: {e.tag}")

    return f"""<html lang="pt">
<head>
    <title>Mapa Ruas</title>
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
</head>

<body>
<div class="w3-container w3-teal">
    <h1><a href="../index.html" style="text-decoration:none">Mapa Ruas</a></h1>
</div>
<div class="w3-container">
    <h2>{street.name} <span class="w3-medium" style="vertical-align: middle;">Nº{street.numero}</span></h2>
    {content}
</div>
</body>
</html>"""


def main():
    streets = []

    for file in os.listdir("dataset/texto"):
        if file.endswith(".xml"):
            streets.append(parse_street_from_xml_file("dataset/texto/" + file))

    streets.sort(key=lambda s: s.name)

    with open("index.html", "w") as f:
        f.write(generate_index(streets))

    if not os.path.exists("ruas"):
        os.mkdir("ruas")

    for street in streets:
        with (open(os.path.join("ruas", generate_street_file_html_name(street)), "w")) as f:
            f.write(generate_street_html(street))


if __name__ == "__main__":
    main()
