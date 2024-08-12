from flask import Flask, request, jsonify
import joblib
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
import rdkit
#from flask_cors import CORS
from utils import to_fp, filter_bad_smiles, p_to_nm

model = None

# starts app
def create_app():
    app = Flask(__name__)
    with app.app_context():
        initialize_model()
    return app
# provides added security
#CORS(app)

def initialize_model():
    global model
    model = joblib.load('model.pkl')
    print("model initialized.")

app = create_app()

#/predict is the URL path, can change
@app.route('/api/predict', methods=['POST'])

#md = None

# takes in input 
def predict():
    global model
    json_resp = request.json
    if not json_resp:
        return jsonify({'error': 'No input data provided'}), 400
    
    try:
        data = json_resp['input']
        print("data in format: ", data)
        data = data.replace(" ", "")
        mols = data.split(",")
        print("data in format", mols)
        print("data in format", mols)
        result = run_model(mols)
        print("data in format:", result)
        result = result.to_json()
        print("data in format:", result)
        return jsonify({'prediction': result})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# takes in smiles input and converts to fp to output
# current implementation only takes in comma separated list as input
def run_model(smiles):
    #exception expected when bad input is given
    print("entered run model")
    smiles = filter_bad_smiles(smiles)
    print("filtered", smiles)
    fingerprints = to_fp(smiles)
    fingerprints = pd.DataFrame(fingerprints)
    print("padelified")
    #model = load_model()

    #predicts the pIC50
    pIC50_pred = model.predict(fingerprints)
    print("model loaded")

    IC50 = p_to_nm(pIC50_pred)
    print("p to reg")

    output = pd.DataFrame({
        'smiles' : smiles,
        'pIC50' : pIC50_pred,
        'IC50 (nM)' : IC50
    })

    #produces an input file of the smiles put in
    #smiles.to_csv('input.smi', index=None, header=None)
    
    return output



# takes in input 


if __name__ == '__main__':
    app.run(debug=True)