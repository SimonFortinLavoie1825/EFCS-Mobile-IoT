#include "FirestoreManager.h"
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"
#include <WiFi.h>
#include "Configuration.h"

FirestoreDataManager::FirestoreDataManager() {
    challengeManager = new FirestoreChallenges(&fbdo, PROJECT_ID);
}

FirestoreDataManager::~FirestoreDataManager() {
    delete challengeManager;
}

// Démarre la connextion Wifi et la connextion Firestore
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

// Enregistre le score du challenge donné par l'argument Challenge
bool FirestoreDataManager::saveChallenge(int pointObtained, int index) {
    return challengeManager->updatePoints(index, pointObtained);
}

bool FirestoreDataManager::loadChallenges(String playerId) {
    return challengeManager->loadChallenges(playerId);
}

// Retourne tous les challenges trouvés dans le firestore dans un tableau de FirestoreChallenges
FirestoreChallenge* FirestoreDataManager::getChallenges() {
    FirestoreChallenge* challengeArray = new FirestoreChallenge[challengeManager->getCount()];

    for (int i = 0; i < challengeManager->getCount(); i++) {
        challengeArray[i] = challengeManager->getChallenge(i);
    }

    return challengeArray;
}

// Retourne le nombre de challenges dans le firestore
int FirestoreDataManager::getChallengeCount() {
    Serial.print("getchallengeCount: ");
    Serial.println(challengeManager->getCount());
    return challengeManager->getCount();
}