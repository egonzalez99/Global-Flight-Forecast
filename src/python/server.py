from flask import Flask, jsonify
import ozon3 as ooo

app = Flask(__name__)

o3 = ooo.Ozon3('8e3f6c852639745842dee90e4b3b5dd3e4190c77')

@app.route('/api/air-quality/<city>', methods=['GET'])
def get_air_quality(city):
    # Fetch the air quality data a city
    data = o3.get_city_air(city)
    
    # Return the data as JSON
    return jsonify(data)

if __name__ == 'main':
    print("Starting server now...")
    app.run(debug=True)
