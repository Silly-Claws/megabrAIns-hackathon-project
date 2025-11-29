#  Pocet obyvateľov

# import json
#
# # Load your JSON file
# with open("data.json", "r", encoding="utf-8") as f:
#     data = json.load(f)
#
# # Output SQL file
# with open("init.sql", "w", encoding="utf-8") as sql_file:
#     # Create table
#     sql_file.write("""
# CREATE TABLE IF NOT EXISTS population_points (
#     id SERIAL PRIMARY KEY,
#     x DOUBLE PRECISION,
#     y DOUBLE PRECISION,
#     pocet_obyvatelov REAL
# );
# """)
#
#     # Insert data
#     sql_file.write("\n-- Insert data\n")
#     for feature in data["features"]:
#         x = feature["geometry"]["x"]
#         y = feature["geometry"]["y"]
#         pocet = feature["attributes"]["Počet_obyvateľov"]
#         sql_file.write(f"INSERT INTO population_points (x, y, pocet_obyvatelov) VALUES ({x}, {y}, {pocet});\n")
#
# print("init.sql generated successfully!")



# Zastavky

# import json
#
# # Load your JSON file
# with open("stations.json", "r", encoding="utf-8") as f:
#     data = json.load(f)
#
# # Output SQL file
# with open("init.sql", "a", encoding="utf-8") as sql_file:
#     # Create table
#     sql_file.write("\n-- New batch of inserts\n")
#     sql_file.write("""
# CREATE TABLE IF NOT EXISTS public_transport_points(
#        id SERIAL PRIMARY KEY,
#        elektricka BOOLEAN,
#        trolejbus BOOLEAN,
#        autobus BOOLEAN,
#        x DOUBLE PRECISION,
#        y DOUBLE PRECISION
# );
#                    """)
#
#     sql_file.write("\n-- Insert data\n")
#
#     for feature in data["features"]:
#         attrs = feature["attributes"]
#         elektricka = attrs["elektricka"].lower() == "true"
#         trolejbus = attrs["trolejbus"].lower() == "true"
#         autobus = attrs["autobus"].lower() == "true"
#         x = float(attrs["x"])
#         y = float(attrs["y"])
#
#         sql_file.write(
#             f"INSERT INTO public_transport_points (elektricka, trolejbus, autobus, x, y) "
#             f"VALUES ({str(elektricka).upper()}, {str(trolejbus).upper()}, {str(autobus).upper()}, {x}, {y});\n"
#         )
#
# print("init.sql generated successfully!")
#

# Stredne skoly

import json

# Тип для цього набору даних
TYP = "KI"  # školy

# Завантаження JSON
with open("kult_inst.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# Відкриваємо init.sql в режимі додавання (append), щоб не перезаписати існуючий файл
with open("init.sql", "a", encoding="utf-8") as sql_file:
    # Створення таблиці, якщо її ще немає
    sql_file.write("""
CREATE TABLE IF NOT EXISTS institutes_and_school_points (
    id SERIAL PRIMARY KEY,
    x DOUBLE PRECISION,
    y DOUBLE PRECISION,
    typ VARCHAR(30)
);
                   """)

    sql_file.write("\n-- Insert data\n")

    for i, feature in enumerate(data.get("features", []), start=1):
        attrs = feature.get("attributes")
        if not attrs:
            print(f"Skipping feature #{i}: no 'attributes' key")
            continue

        x_str = attrs.get("x", "").replace(",", ".").strip()
        y_str = attrs.get("y", "").replace(",", ".").strip()
        typ = attrs.get("typ_institucie", "").strip()

        if not x_str or not y_str or not typ:
            print(f"Skipping feature #{i}: missing coordinates or type")
            continue

        try:
            x = float(x_str)
            y = float(y_str)
        except ValueError:
            print(f"Skipping feature #{i}: invalid coordinates ({x_str}, {y_str})")
            continue

        sql_file.write(
            f"INSERT INTO institutes_and_school_points (x, y, typ) VALUES ({x}, {y}, '{typ}');\n"
        )

print("init.sql generated successfully!")



