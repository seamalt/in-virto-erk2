# erk2-project: in-virto


This is a RESTful API that predicts the bioactivity of chemical agents in interaction with ERK2, a known proto-oncogene that mutates in several forms of cancers. 


API calls are fed into a Random Forest Regression model, outputting indicators such as IC50. These estimates can serve to supplement the search for effective drug targets, all with the click of a button *in-virto* (as opposed to in-vivo or in-vitro!)


Feel free to check out the app [here](https://in-virto-erk2.web.app/), or view the data folder to view colab files explaining the Random Forest model generation process.


The RESTful API was constructed with a Flask app backend speaking to a React frontend in a Dockerized environment.


**Acknowledgements:** Inspiration and guidance for this project was found through Chanin Nantasemat's Bioinformatics Series. The Random Forest Regressor was also made feasible through PaDEL, a molecular fingerprinting software which allows a simple molecular string to generate a highly descriptive and robust dataset for model building.
