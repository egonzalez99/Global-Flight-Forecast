# IMPORTANT TO ACCESS HTTPS IN BROSWER ENTER URL AFTER ROUTE FORWARD-SLASH WITH IT FOR EXAMPLE http://127.0.0.1:5000/api/test WITH ROUTE  @app.route('/api/test', methods=['GET'])
# from flask import Flask, jsonify
# import ozon3 as ooo

# app = Flask(__name__)

# # my Ozon3 API key
# o3 = ooo.Ozon3('8e3f6c852639745842dee90e4b3b5dd3e4190c77')

# # a route to get air quality data
# @app.route('/api/air-quality/<city>', methods=['GET'])
# def get_air_quality(city):
#     # Fetch the air quality data for a city
#     data = o3.get_city_air({'message': 'Test successful'})
    
#     # the data as JSON
#     return jsonify(data)

# if __name__ == '__main__':
#     app.run(debug=True)

from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This enables CORS for all routes

@app.route('/api/test', methods=['GET'])
def test():
    return jsonify({'message': 'Test successful'})

if __name__ == '__main__':
    app.run(debug=True)
    