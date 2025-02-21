# IgnisAI Backend

The backend of **IgnisAI** is built using **Django** and **Django REST Framework (DRF)** to handle wildfire detection, user subscriptions, and notification services.

## Features

- **Wildfire Prediction API**: Uses a **Random Forest Classifier** to predict wildfire occurrences.
- **Data Integration**: Fetches data from **Google Earth Engine** (NDVI, LST, and Burned Area) for analysis.
- **Email Notification System**: Sends real-time alerts via email (SMS support coming soon).
- **RESTful API**: Provides endpoints for frontend integration and third-party usage.
- **Logging & Error Handling**: Maintains logs for tracking wildfire events, notifications, and errors.
- **Scalability**: Designed to integrate with cloud-based storage and services.

## Technologies Used

- **Backend Framework**: Django, Django REST Framework
- **Database**: SQLite (planned migration to PostgreSQL for production)
- **Machine Learning Model**: Random Forest Classifier optimized with **GridSearchCV**
- **Notifications**: Django Email system (SMS integration planned)

## Installation

1. **Clone the Repository**

    ```sh
    git clone https://github.com/Puspa222/Fire-Detection.git
    ```

2. **Navigate to the Backend Folder**

    ```sh
    cd backend
    ```

3. **Install Dependencies**

    ```sh
    pip install -r requirements.txt
    ```

4. **Apply Migrations**

    ```sh
    python manage.py migrate
    ```

5. **Start the Server**

    ```sh
    python manage.py runserver
    ```

## API Endpoints

| Endpoint               | Method | Description                                    |
|------------------------|--------|------------------------------------------------|
| `/predict/`            | POST   | Run wildfire prediction and system evaluation.|
| `/api/store-location/` | POST   | Allows users to subscribe for notifications.   |
| `/api/wildfire/`       | GET    | Retrieves real-time wildfire data.             |

## Future Updates

- SMS Notifications
- Global Model Expansion
- IoT Sensor Integration
- Advanced AI Models for Improved Prediction
