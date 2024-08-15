from utils import run_model, load_model
import pandas as pd
import sklearn
from sklearn.ensemble import RandomForestClassifier


# requires sklearn 1.3.2 to work
if __name__ == "__main__":
    model = load_model()
    #print(model.n_features_in_)
    #print("sklearn==", sklearn.__version__, sep = "")
    example = "CCC"
    example = [example]
    example = pd.DataFrame(example)
    result = run_model(example)
    print(result)