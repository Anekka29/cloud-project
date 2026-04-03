from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/suggest', methods=['POST'])
def suggest():
    data = request.json

    avg = sum(data) / len(data)

    if avg < 2:
        return jsonify({"message": "You should study more daily"})
    elif avg < 5:
        return jsonify({"message": "Good, but try to improve consistency"})
    else:
        return jsonify({"message": "Excellent work! Keep it up"})

if __name__ == '__main__':
    app.run(port=5000)