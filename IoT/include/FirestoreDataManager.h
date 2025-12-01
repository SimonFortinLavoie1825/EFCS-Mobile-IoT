#pragma once

#include "Configuration.h"
#include <Firebase_ESP_Client.h>

class FirestoreDataManager {

    public:
        FirestoreDataManager();
        void startUp();
        void saveScore(int score);
        void getChallenges();   
};