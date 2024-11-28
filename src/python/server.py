from pytrends.request import TrendReq

pytrends = TrendReq(hl='en-US', tz=300) # timezone offset is done by looking at UTC and multiply by 60. No negatives

kw_list = ["boots"]

# function to get the interest over time for 'boots'
def get_interest(): 
    
    pytrends.build_payload(kw_list, cat=0, timeframe='now 7-d', geo='US-NY', gprop='') #data from today till the past 7 days 
    data = pytrends.interest_over_time()

    print(data)

get_interest()