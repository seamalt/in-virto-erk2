from rdkit import Chem
from padelpy import padeldescriptor, from_smiles
import re

def filter_bad_smiles(smiles):
    # print("entered filter smiles")
    smiles = list(dict.fromkeys(smiles))
    filtered = []
    print(smiles)
    
    #thorough check
    for s in smiles:
        # print(s, "passes first stage")
        mol = Chem.MolFromSmiles(s)
        # print(s, "processing...")
        if (mol is not None) and len(s) != 0:
                # print(s, "appending...")
            filtered.append(s)
    # print("created smiles")
    
    if len(filtered) == 0:
       raise Exception("aborting model, bad input")
    return filtered

# converts smile entry to padel 801 identifiable values
def to_fp(smiles):
    #smiles = smiles.iloc[:, 0]
    print("started fingerprinter", type(smiles))
    
    fp = from_smiles(smiles, descriptors=False, fingerprints=True)
    #fp_df = pd.DataFrame(fp)
    return fp

# converts pIC50 to IC50 in nM (nanomolar)
def p_to_nm(pic50):
    reg = 10 ** (-pic50) * (10 ** 9)
    return reg


