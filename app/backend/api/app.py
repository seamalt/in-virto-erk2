from flask import Flask, request, jsonify
import joblib
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
import rdkit
#from flask_cors import CORS
from utils import to_fp, filter_bad_smiles, p_to_nm
import threading


model = None
model_lock = threading.Lock()


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


#locks the model to one-thread to load, unlocks after restart
#subsequent requests can now use model if loaded (until it is unloaded)
#decreases init time
def restart_model():
    global model
    if model is None:
        with model_lock:
            print("restarting model with locked thread:")
            if model is None:
                initialize_model()
    return model


app = create_app()

#/predict is the URL path, can change
@app.route('/api/predict', methods=['POST'])
# takes in input 
def predict():
    global model
    if model is None:
        return jsonify({"error": "Model not initialized"}), 503
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

    #for future: provide functionality that separates 
    # input based on elapsed time (<60s) and then 
    # runs model several times, (taking prevInput)
    # (as an input to the next run_model to allow static quality), 
    # parses responses together and sends back after api request


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

# if __name__ == '__main__':
#     app.run()