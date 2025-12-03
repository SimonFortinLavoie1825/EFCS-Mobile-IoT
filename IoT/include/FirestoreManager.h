#pragma once

#include "Configuration.h"
#include <Firebase_ESP_Client.h>
#include <FirestoreChallenges.h>

class FirestoreDataManager {

    public:
        FirestoreDataManager();
        void startUp();
        void saveChallenge(FirestoreChallenge challenge);
        FirestoreChallenge* getChallenges();   
};