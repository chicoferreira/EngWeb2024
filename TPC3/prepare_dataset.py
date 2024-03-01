import json


class FilmEntry:
    def __init__(self, id: str, title: str, year: int, cast: list[str], genres: list[str]):
        self.id = id
        self.title = title
        self.year = year
        self.cast = cast
        self.genres = genres


class ActorEntry:
    def __init__(self, id: str, name: str, present_in: list[str]):
        self.id = id
        self.name = name
        self.present_in = present_in


class GenreEntry:
    def __init__(self, id: str, name: str, movies: list[str]):
        self.id = id
        self.name = name
        self.movies = movies


class Database:
    def __init__(self, films: list[FilmEntry], actors: list[ActorEntry], genres: list[GenreEntry]):
        self.films = films
        self.actors = actors
        self.genres = genres


def main():
    films = []

    actors = {}
    genres = {}

    current_actor_id = 0
    current_genre_id = 0

    with open('filmes.json', 'r', encoding="utf-8") as f:
        for line in f.readlines():
            json_data = json.loads(line)
            film_id = json_data['_id']['$oid']

            film_actors = []
            film_genres = []

            for actor in json_data['cast']:
                if actor not in actors:
                    actors[actor] = (ActorEntry(str(current_actor_id), actor, [film_id]))
                    current_actor_id += 1
                else:
                    actors[actor].present_in.append(film_id)
                film_actors.append(actors[actor].id)

            for genre in json_data.get('genres', []):
                if genre not in genres:
                    genres[genre] = (GenreEntry(str(current_genre_id), genre, [film_id]))
                    current_genre_id += 1
                else:
                    genres[genre].movies.append(film_id)
                film_genres.append(genres[genre].id)

            film = FilmEntry(film_id, json_data['title'], json_data['year'], film_actors, film_genres)
            films.append(film)

    database = Database(films, list(actors.values()), list(genres.values()))

    with open('database.json', 'w', encoding="utf-8") as f:
        f.write(json.dumps(database, default=lambda o: o.__dict__, indent=4))


if __name__ == '__main__':
    main()
