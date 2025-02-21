# IgnisAI - Real-Time Wildfire Detection and Notification (Prototype)

IgnisAI is a prototype web app for detecting wildfires in real-time and providing rapid notifications. Initially, the detection is focused on US cities, but the system has been designed to easily expand to cover global regions.

## Problem Statement
In recent years, wildfires have increased in frequency and intensity, posing severe risks to communities, ecosystems, and economies. Rapid detection and immediate notification are critical for evacuation and disaster response efforts. However, current systems often suffer from delayed alerts and limited geographical coverage. IgnisAI aims to improve early detection by leveraging google earth data, machine learning, and real-time notification mechanisms.

## Features
- **Real-Time Wildfire Detection:** Uses a Random Forest classifier to analyze google earth data such as NDVI, LST, and Burned Area.
- **US City Focus (Prototype):** Initially predicts wildfire in major US cities, with scalability for a global deployment.
- **Instant Email Notifications:** Alerts are sent via email upon detecting potential wildfire events.
- **Real-Time Sensor Data:** Integrates various environmental indicators like NDVI, LST, and burned area metrics.
- **Historical Data Analysis:** Utilizes historical wildfire data to train and enhance prediction models.
- **Data Validation and Preprocessing:** Ensures data accuracy through calibration and preprocessing methods.
- **API Endpoints for Integration:** Offers RESTful API endpoints that allow integration with third-party IoT devices and dashboards.
- **Scalability:** Designed with the future expansion in mind—including SMS notifications and guest user dashboards.
- **User Customization:** Future improvements will allow users to customize alert thresholds and notification preferences.
- **Dashboard & Visual Analytics:** Provides a web dashboard for real-time monitoring and statistical analysis, including trends over time.
- **Security Measures:** Implements secure data protocols, ensuring the integrity of the system.
- **Cloud Infrastructure Ready:** Prepares for future migration to cloud infrastructure for increased scalability and reliability.
- **Model Optimization:** Uses GridSearchCV to fine-tune the Random Forest model, ensuring optimized detection accuracy.
- **Error Handling and Failover:** Implements robust error handling and failover systems to ensure continuous operation in critical situations.

## How It Works
1. **Data Collection:** The app collects real-time data from google earth engine, NDVI, LST, and burned area.
2. **Wildfire Prediction:** The backend processes this data using a Random Forest classifier optimized through GridSearchCV.
3. **Notification System:** When a potential wildfire is detected, an immediate email notification is sent. Future builds will include SMS alerts for faster communication.
4. **Data Calibration:** Environmental thresholds and calibration techniques ensure reliable and accurate data before classification.
5. **Alert Subscription:** User can subscribe to alert through webapp br providing email and location.
6. **Dashboard:** Web include interactive dashboard with realtime wildfire data.
### Logging

IgnisAI maintains comprehensive logs to facilitate real-time monitoring and post-event analysis. The logging system includes:

- **Real-Time Event Logging:** Captures wildfire detection events, notifications, and error messages.
- **Structured Format:** Logs are maintained in a structured format for easy parsing and analysis.
- **Configurable Storage:** Supports local file storage with options to integrate with external logging services.
- **Audit Trails:** Provides a detailed record of system operations for security and debugging.
- **Adjustable Verbosity:** Log levels can be configured to suit development and production environments.

## Technologies Used
- **Frontend:** React, Vite, TypeScript
- **Backend:** Django, Django REST Framework, SQLite
- **AI/ML Model:** Random Forest Classifier for wildfire detection
- **Model Optimization:** GridSearchCV for parameter tuning
- **Notification System:** Django Email system (adding SMS notifications in future releases)
- **Deployment:** Planned integration with cloud services for scalability and reliability.

## Installation and Setup
### Clone the Repository
```bash
git clone https://github.com/Puspa222/Fire-Detection
```

### Set Up the Backend
1. Navigate to the backend folder:
    ```bash
    cd backend
    ```
2. Install the dependencies:
    ```bash
    pip install -r requirements.txt
    ```

### Set Up the Frontend
1. Navigate to the frontend folder:
    ```bash
    cd frontend
    ```
2. Install the dependencies:
    ```bash
    npm install
    ```

### Running the Application
- **Start the Backend:**
    ```bash
    python manage.py runserver
    ```
- **Start the Frontend:**
    ```bash
    npm run dev
    ```
- **Access the App:** Open your browser and visit [http://localhost:5173](http://localhost:5173).


## Future Updates
- **Global Expansion:** The prediction model will be adapted for prediction from cities worldwide.
- **SMS Notifications:** Replace or supplement email alerts with SMS messaging for immediate notifications.
- **User Accounts and Customization:** Enable users to set custom thresholds and notification preferences.
- **Enhanced Dashboard:** Incorporate real-time dashboards with visual analytics, trend graphs, and historical data comparisons.
- **Integration with IoT Devices:** Extend API endpoints to interface with a broader range of environmental sensors.
- **Real time Satelite Data:** Make prediction more accurate with real time satelite data.
- **Advanced AI Models:** Explore more sophisticated machine learning models as additional data and computational resources become available.

## Contributing
1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature/your-feature
    ```
3. Commit your changes:
    ```bash
    git commit -am 'Add new feature'
    ```
4. Push to the branch:
    ```bash
    git push origin feature/your-feature
    ```
5. Open a pull request.

IgnisAI represents a step forward in proactive disaster management, combining real-time data, machine learning, and scalable notification systems to safeguard communities against wildfires.