from rdkit import Chem
from padelpy import padeldescriptor, from_smiles

def filter_bad_smiles(smiles):
    print("entered filter smiles")
    filtered = []
    print(smiles)
    for s in smiles:
        print(s)
        mol = Chem.MolFromSmiles(s)
        print(s, "processing...")
        if mol is not None:
            # print(s, "appending...")
            filtered.append(s)
    print("created smiles")
    
    #if not valid_smiles:
    #    raise Exception("bad smiles input")
    return filtered


def to_fp(smiles):
    #smiles = smiles.iloc[:, 0]
    print("started fingerprinter", type(smiles))
    
    fp = from_smiles(smiles, descriptors=False, fingerprints=True)
    #fp_df = pd.DataFrame(fp)
    return fp

def p_to_nm(pic50):
    reg = 10 ** (-pic50) * (10 ** 9)
    return reg