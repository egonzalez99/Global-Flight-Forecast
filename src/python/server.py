from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import RunReportRequest, Dimension, Metric

# Replace with the path to your service account key file
SERVICE_ACCOUNT_KEY_FILE = r"C:\Users\geddi\Downloads\credentials-aa907536f211.json"

# Replace with your GA4 property ID
PROPERTY_ID = "468797450"

def get_new_york_data():
    # Initialize the GA4 client
    client = BetaAnalyticsDataClient.from_service_account_file(SERVICE_ACCOUNT_KEY_FILE)

    # Define the API request
    request = RunReportRequest(
        property=f"properties/{PROPERTY_ID}",
        dimensions=[Dimension(name="city")],
        metrics=[Metric(name="activeUsers")],  # Example metric
        date_ranges=[{"start_date": "7daysAgo", "end_date": "today"}],
        dimension_filter={
            "filter": {
                "field_name": "city",
                "string_filter": {"value": "New York"}
            }
        },
    )

    # Run the query
    response = client.run_report(request)

    # Process and print the response
    for row in response.rows:
        print(f"City: {row.dimension_values[0].value}, Active Users: {row.metric_values[0].value}")

if __name__ == "__main__":
    get_new_york_data()

