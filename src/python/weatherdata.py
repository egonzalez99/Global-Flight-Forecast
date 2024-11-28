# import ozon3 as ooo
# import json

# # API key for Ozon3
# API_KEY = '8e3f6c852639745842dee90e4b3b5dd3e4190c77'
# o3 = ooo.Ozon3(API_KEY)

# # List of cities to fetch air quality data for
# cities = ["New York"]

# # Dictionary to store air quality data for each city
# air_quality_data = {}

# # Fetch air quality data for each city
# for city in cities:
#     try:
#         data = o3.get_city_air(city)
#         air_quality_data[city] = data
#         print(f"Data for {city} retrieved successfully.")
#     except Exception as e:
#         print(f"Failed to retrieve data for {city}: {e}")

# # Save data to JSON file
# with open("air_quality_data.json", "w") as json_file:
#     json.dump(air_quality_data, json_file, indent=4)

# print("Air quality data saved to air_quality_data.json")