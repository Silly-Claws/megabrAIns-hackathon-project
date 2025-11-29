#  Pocet obyvateľov (only 2000)

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

# # Stredne skoly
#
# import json
#
# # Тип для цього набору даних
# TYP = "KI"  # školy
#
# # Завантаження JSON
# with open("kult_inst.json", "r", encoding="utf-8") as f:
#     data = json.load(f)
#
# # Відкриваємо init.sql в режимі додавання (append), щоб не перезаписати існуючий файл
# with open("init.sql", "a", encoding="utf-8") as sql_file:
#     # Створення таблиці, якщо її ще немає
#     sql_file.write("""
# CREATE TABLE IF NOT EXISTS institutes_and_school_points (
#     id SERIAL PRIMARY KEY,
#     x DOUBLE PRECISION,
#     y DOUBLE PRECISION,
#     typ VARCHAR(30)
# );
#                    """)
#
#     sql_file.write("\n-- Insert data\n")
#
#     for i, feature in enumerate(data.get("features", []), start=1):
#         attrs = feature.get("attributes")
#         if not attrs:
#             print(f"Skipping feature #{i}: no 'attributes' key")
#             continue
#
#         x_str = attrs.get("x", "").replace(",", ".").strip()
#         y_str = attrs.get("y", "").replace(",", ".").strip()
#         typ = attrs.get("typ_institucie", "").strip()
#
#         if not x_str or not y_str or not typ:
#             print(f"Skipping feature #{i}: missing coordinates or type")
#             continue
#
#         try:
#             x = float(x_str)
#             y = float(y_str)
#         except ValueError:
#             print(f"Skipping feature #{i}: invalid coordinates ({x_str}, {y_str})")
#             continue
#
#         sql_file.write(
#             f"INSERT INTO institutes_and_school_points (x, y, typ) VALUES ({x}, {y}, '{typ}');\n"
#         )
#
# print("init.sql generated successfully!")


# Socila services

# import json
#
# # Load JSON
# with open("social_services.json", "r", encoding="utf-8") as f:
#     data = json.load(f)
#
# with open("init.sql", "a", encoding="utf-8") as sql_file:
#     sql_file.write("""
# CREATE TABLE IF NOT EXISTS social_services_points (
#     id SERIAL PRIMARY KEY,
#     x DOUBLE PRECISION,
#     y DOUBLE PRECISION,
#     cielova_skupina VARCHAR(100),
#     druh_sluzby VARCHAR(100)
# );
# """)
#
#     sql_file.write("\n-- Insert data\n")
#
#     for i, feature in enumerate(data.get("features", []), start=1):
#         attrs = feature.get("attributes")
#         if not attrs:
#             continue  # skip if no attributes
#
#         # Get values and skip if any are missing or None
#         x_str = attrs.get("x")
#         y_str = attrs.get("y")
#         cielova_skupina = attrs.get("cielova_skupina")
#         druh_sluzby = attrs.get("druh_sluzby")
#
#         if not all([x_str, y_str, cielova_skupina, druh_sluzby]):
#             continue  # skip if any value is None or empty
#
#         # Clean and convert coordinates
#         try:
#             x = float(str(x_str).replace(",", ".").strip())
#             y = float(str(y_str).replace(",", ".").strip())
#         except ValueError:
#             continue  # skip invalid numbers
#
#         # Escape single quotes in text for SQL
#         cielova_skupina = str(cielova_skupina).replace("'", "''").strip()
#         druh_sluzby = str(druh_sluzby).replace("'", "''").strip()
#
#         sql_file.write(
#             f"INSERT INTO social_services_points (x, y, cielova_skupina, druh_sluzby) "
#             f"VALUES ({x}, {y}, '{cielova_skupina}', '{druh_sluzby}');\n"
#         )
#
# print("init.sql generated successfully!")



# Culture




# remake Pocet obyvateľov (all from db)



import geopandas as gpd

gdf = gpd.read_file("data.gpkg")

gdf = gdf.to_crs("EPSG:4326")
# print(gdf.columns)

with open("init.sql", "a", encoding="utf-8") as sql_file:
    sql_file.write("""
CREATE TABLE IF NOT EXISTS population_points (
    id SERIAL PRIMARY KEY,
    x DOUBLE PRECISION,
    y DOUBLE PRECISION,
    pocet_obyvatelov REAL
);
""")

    for i, row in gdf.iterrows():
        if row.geometry is None:
            continue

        lon = row.geometry.x
        lat = row.geometry.y

        pocet = row.get("Počet_obyvateľov")
        if pocet is None:
            continue

        sql_file.write(
            f"INSERT INTO population_points (x, y, pocet_obyvatelov) "
            f"VALUES ({lon}, {lat}, {pocet});\n"
        )

print("DONE: init.sql generated with correct WGS84 coordinates.")