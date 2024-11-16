# IMPORTANT TO ACCESS HTTPS IN BROSWER ENTER URL AFTER ROUTE FORWARD-SLASH WITH IT FOR EXAMPLE http://127.0.0.1:5000/api/test WITH ROUTE  @app.route('/api/test', methods=['GET'])
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# Dummy function for testing
def fetch_ozone_data():
    # Replace this with your actual Ozon3 data fetching code
    return [{"lat": 40.7128, "lon": -74.0060, "ozone": 300}]

@app.route('/api/ozone-data', methods=['GET'])
def ozone_data():
    data = fetch_ozone_data()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
    
# o3 = ooo.Ozon3('8e3f6c852639745842dee90e4b3b5dd3e4190c77')