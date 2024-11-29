import json
from pytrends.request import TrendReq
import pandas as pd

pd.set_option('future.no_silent_downcasting', True)

pytrends = TrendReq(hl='en-US', tz=300)  # timezone offset is done by multiplying 60 by the timezone UTC. No negative values.
kw_list = ["boots"] # put search terms here

# get google trends data for search term above
def get_interest():
    try:
        pytrends.build_payload(kw_list, cat=0, timeframe='now 7-d', geo='US-NY', gprop='')
        data = pytrends.interest_over_time()

        if not data.empty:
            # create index column for json file. make it simple
            data.reset_index(inplace=True)
            
            # convert pandas.Timestamp to string values
            data['date'] = data['date'].astype(str)
            
            # saving data into a JSON file
            with open('./trend_data.json', 'w') as f:
                json.dump(data.to_dict(orient='records'), f, indent=4)
                print("Data saved to trend_data.json")
        else:
            print("No data available for the given query.")
    except Exception as e:
        print(f"An error occurred: {e}")

get_interest()