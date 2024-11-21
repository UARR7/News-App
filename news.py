import requests
import csv

VITE_API_KEY = 'a284202ee7be426dbeda6862df2af524'
topic = "Machine Learning(AI)"

# Set the URL to the NewsAPI endpoint using f-string for interpolation
url = f'https://newsapi.org/v2/everything?q={topic}&apiKey={VITE_API_KEY}'

# Set the request headers
headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

# Make the API request
response = requests.get(url, headers=headers)

# Check if the request was successful
if response.status_code == 200:
    # Parse the JSON response
    myjson = response.json()

    # Prepare the data for CSV
    ourdata = []
    csvheader = ['title', 'description', 'url']  # Headers for CSV

    # Iterate through the 'articles' in the response
    for x in myjson.get('articles', []):  # Use 'articles' instead of 'data'
        title = x.get('title', 'No Title')  # Handle missing title
        description = x.get('description', 'No Description')  # Handle missing description
        url = x.get('url', 'No URL')  # Handle missing url

        listing = [title, description, url]
        ourdata.append(listing)

    # Write the data to a CSV file
    with open('news.rtf', 'w', encoding='UTF8', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(csvheader)
        writer.writerows(ourdata)

    print(ourdata)
else:
    print(f"Failed to retrieve data. Status code: {response.status_code}")
