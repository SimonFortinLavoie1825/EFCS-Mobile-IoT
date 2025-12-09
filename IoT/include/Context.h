#pragma once

#include <Arduino.h>
#include <FirestoreChallenges.h>

struct Context
{
    public:
        Context();
        ~Context();
        
        String userId;
        String difficulty;

        int nbrChallenges;
        FirestoreChallenge* allChallenges;
        FirestoreChallenge selectedChallenge;
};


 