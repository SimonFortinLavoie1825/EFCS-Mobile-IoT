#pragma once

#include "Configuration.h"
#include <Firebase_ESP_Client.h>
#include <FirestoreChallenges.h>

class FirestoreDataManager {
    public:
        FirestoreDataManager();
        ~FirestoreDataManager();
        void startUp();
        bool saveChallenge(int pointObtained, int index);
        bool loadChallenges(String playerId);
        FirestoreChallenge* getChallenges();   
        int getChallengeCount();
    
    private: 
        FirebaseAuth auth;
        FirebaseConfig config;
        FirebaseData fbdo;
        FirestoreChallenges* challengeManager;
};