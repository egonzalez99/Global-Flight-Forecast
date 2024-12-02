import json
from pytrends.request import TrendReq
import pandas as pd

pd.set_option('future.no_silent_downcasting', True)

pytrends = TrendReq(hl='en-US', tz=300)  # timezone offset is done by multiplying 60 by the timezone UTC. No negative values.
kw_list = ["boots"]  # put search terms here

# get Google Trends data for search term above
def get_interest():
    try:
        # create a list of geos for both New York and Florida
        geos = ['US-NY', 'US-FL']
        all_data = []

        # iterate over each geo location to pull data
        for geo in geos:
            pytrends.build_payload(kw_list, cat=0, timeframe='now 7-d', geo=geo, gprop='')
            data = pytrends.interest_over_time()

            if not data.empty:
                # add the geo column to identify data by region
                data['geo'] = geo
                all_data.append(data)
            else:
                print(f"No data available for {geo}.")

        # combine all data frames
        if all_data:
            combined_data = pd.concat(all_data, axis=0)
            
            # reset index to flatten the DataFrame
            combined_data.reset_index(inplace=True)

            # vonvert pandas.Timestamp to string values
            combined_data['date'] = combined_data['date'].astype(str)

            # saving data into a JSON file
            with open('./trend_data.json', 'w') as f:
                json.dump(combined_data.to_dict(orient='records'), f, indent=4)
                print("Data saved to trend_data.json")
        else:
            print("No data available for the given query in any location.")
    
    except Exception as e:
        print(f"An error occurred: {e}")

get_interest()
