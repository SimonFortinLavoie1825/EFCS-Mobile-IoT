#pragma once
#include <FirestoreChallenges.h>

class CodeManager
{
    public:
        CodeManager();
        ~CodeManager();

        void startCode(FirestoreChallenge challenge);
        void increaseCodeLength();
        void showCodeLight(int delayTime);
        void endGame();
        void resetSequence();

        void verifyInput(int input);

        bool isGameRunning();
        int getCurrentCodeLength();
        bool isCodeEnded();

    private:
        bool gameRunning;
        bool codeEnded;

        FirestoreChallenge currentChallenge;
        int* code;
        int currentCodeLength;
        int currentCodeIndex;

        int highScore;
};