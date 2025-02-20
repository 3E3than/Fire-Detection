xdata = [[1, 2, 3]]
loadedModel = joblib.load("models/random_forest_model.joblib")
loadedScaler = joblib.load("models/scaler.joblib")
scaledX = loadedScaler.transform(xdata)
prediction = loadedModel.predict(scaledX)
print("TEST PREDICTION")
print(prediction)