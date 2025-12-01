#include "FirestoreDataManager.h"
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"
#include <WiFi.h>
#include <FirestoreChallenges.h>

const char WIFI_SSID[] = "Simon";
const char WIFI_PASSWORD[] = "simon279";
const char API_KEY[] = "AIzaSyA-gfSpCx87AzGs7jzXwSyKtrcllDeMq5g";
const char PROJECT_ID[] = "tp2-obj-connectes";

FirebaseAuth auth;
FirebaseConfig config;
FirebaseData fbdo;
FirestoreChallenges challengeManager(&fbdo, PROJECT_ID);

FirestoreDataManager::FirestoreDataManager() {
    
}

void FirestoreDataManager::startUp() {
    //Connexion au wifi
    Serial.println("Trying connexion...");
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

    while (WiFi.status() != WL_CONNECTED) {
        delay(WIFI_CONNEXION_DELAY);
        Serial.print(".");
    }

    Serial.println("Wifi Connected");
    
    //Setup du Firestore
    config.api_key = API_KEY;
    config.token_status_callback = tokenStatusCallback;

    auth.user.email = "";
    auth.user.password = "";
    if (Firebase.signUp(&config, &auth, "", "")) {
        Serial.println("Connexion Firebase OK");
    } else {
        Serial.printf("Erreur Firebase: %s\n",
        config.signer.signupError.message.c_str());
    }

    Firebase.begin(&config, &auth);
    Firebase.reconnectWiFi(true);
}

void FirestoreDataManager::saveScore(int score) {
    Serial.println("Saving score");
    int time = millis();
    char documentPath[50];
    sprintf(documentPath, "GameData/%lu", time);

    FirebaseJson content;
    content.set("fields/score/integerValue", score);
    content.set("fields/timeStamp/stringValue", String(time));
    Firebase.Firestore.createDocument(&fbdo, PROJECT_ID, "", documentPath, content.raw());
}