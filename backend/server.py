from flask import Flask, request
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

df = pd.read_csv('../data/rym_top_5000_all_time.csv')
df = df[['Album', 'Artist Name', 'Release Date', 'Ranking']]

@app.route('/search', methods=['GET'])
def get_matches():
    input_value = request.args.get('query')
    filtered_album_df = df[df['Album'].str.contains(input_value, case=False)]
    filtered_artist_df = df[df['Artist Name'].str.contains(input_value, case=False)]
    filtered_df = pd.concat([filtered_album_df, filtered_artist_df])
    cleaned_df = filtered_df.drop_duplicates(subset=['Album']).T
    
    return cleaned_df.to_json()

if __name__ == '__main__':
    app.run(debug=True)