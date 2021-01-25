from flask import Flask, request, jsonify
from flask_cors import CORS
from summarizer_tools import get_title_and_summary

app = Flask(__name__)
CORS(app)

@app.route('/summarize', methods=['POST'])
def summarize():
  if request.method == 'POST':
    json = request.get_json(force=True)
    title, summary = get_title_and_summary(json['url'], json['num_sentences'])
    return jsonify(title=title, summary=summary)

if __name__ == "__main__":
    app.run(debug=True)