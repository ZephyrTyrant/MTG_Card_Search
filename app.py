from flask import Flask, render_template, request, redirect
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/search')
def search():
    name = request.args.get('name')
    print(repr(name))
    my_headers = {
        'User-Agent': 'MTGweb/1.0',
        'Accept': '*/*'
    }
    response = requests.get('https://api.scryfall.com/cards/named?fuzzy=' + '+'.join(name.split()), headers=my_headers)

    if response.status_code != 200:
        return render_template('index.html', name=name)

    data = response.json()
    response = requests.get(data['prints_search_uri'], headers=my_headers)
    prints = response.json()
    finishes = data['finishes']
    unique_versions = {}
    for card in prints['data']:
        unique_versions[card['set_name']] = card
    return render_template('search.html', data=data, prints=prints, unique_versions=unique_versions, finishes = finishes)

if __name__ == "__main__":
    app.run(debug=True)