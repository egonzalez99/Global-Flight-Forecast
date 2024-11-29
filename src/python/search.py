import json
from pytrends.request import TrendReq
import pandas as pd

pd.set_option('future.no_silent_downcasting', True)

pytrends = TrendReq(hl='en-US', tz=300)  # Initialize pytrends
kw_list = ["boots"]

# Function to get the interest over time for 'boots'
def get_interest():
    try:
        pytrends.build_payload(kw_list, cat=0, timeframe='now 7-d', geo='US-NY', gprop='')
        data = pytrends.interest_over_time()

        if not data.empty:
            # Drop unnecessary columns like 'isPartial' if present
            data = data.drop(labels=['isPartial'], axis=1, errors='ignore')
            # Convert the index to a column to make it easier to work with in JSON
            data.reset_index(inplace=True)
            
            # Convert pandas.Timestamp to strings
            data['date'] = data['date'].astype(str)
            
            # Save the data to a JSON file
            with open('../trend_data.json', 'w') as f:
                json.dump(data.to_dict(orient='records'), f, indent=4)
                print("Data saved to trend_data.json")
        else:
            print("No data available for the given query.")
    except Exception as e:
        print(f"An error occurred: {e}")

get_interest()