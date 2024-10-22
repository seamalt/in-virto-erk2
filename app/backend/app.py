from flask import Flask, request, jsonify, send_from_directory
import joblib
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
import rdkit
from flask_cors import CORS
from utils import to_fp, filter_bad_smiles, p_to_nm
import os
from waitress import serve

model = None

# starts app
def create_app():
    app = Flask(__name__, static_folder='/app/frontend/build')
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    with app.app_context():
        initialize_model()
    return app

def initialize_model():
    global model
    model = joblib.load('model.pkl')
    print("model initialized.")

app = create_app()

# serves react app on flask
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def present(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')



#/predict is the URL path for API requests
@app.route('/api/predict', methods=['POST', 'GET'])
# takes in input 
def predict():
    # print("Received a prediction request")
    global model
    # initialize_model()
    if model is None:
        # print("model not initialized")
        initialize_model()
        return jsonify({"error": "Model not initialized"}), 503
    json_resp = request.json
    if not json_resp:
        return jsonify({'error': 'No input data provided'}), 400
    
    try:
        data = json_resp['input']
        # print("data in format: ", data)
        data = data.replace("\n", "")
        data = data.replace(" ", "")
        mols = data.split(",")
        # print("data in format", mols)
        result = run_model(mols)
        # print("data in format:", result)
        result = result.to_json()
        # print("data in format:", result)
        return jsonify({'prediction': result})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# takes in smiles input and converts to fp to output
# current implementation only takes in comma separated list as input
def run_model(smiles):
    #exception expected when bad input is given
    # print("entered run model")
    smiles = filter_bad_smiles(smiles)
    # print("filtered", smiles)
    fingerprints = to_fp(smiles)
    fingerprints = pd.DataFrame(fingerprints)
    # print("padelified")
    #model = load_model()

    #predicts the pIC50
    pIC50_pred = model.predict(fingerprints)
    # print("model loaded")

    IC50 = p_to_nm(pIC50_pred)
    # print("p to reg")

    output = pd.DataFrame({
        'smiles' : smiles,
        'pIC50' : pIC50_pred,
        'IC50 (nM)' : IC50
    })

    #produces an input file of the smiles put in
    #smiles.to_csv('input.smi', index=None, header=None)
    
    return output



#flask port for local testing
if __name__ == '__main__':
    port=int(os.environ.get('PORT', 8080))
    serve(app, host="0.0.0.0", port=port)