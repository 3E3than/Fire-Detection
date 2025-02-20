import joblib

# Load model and scaler
def load_model():
    loadedModel = joblib.load("ai/models/random_forest_model.joblib")
    loadedScaler = joblib.load("ai/models/scaler.joblib")
    return loadedModel, loadedScaler

def predict(data):
    xdata = [data]
    loadedModel, loadedScaler = load_model()
    scaledX = loadedScaler.transform(xdata)
    prediction = loadedModel.predict(scaledX)
    return prediction

