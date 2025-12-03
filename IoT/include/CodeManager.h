#pragma once
#include <FirestoreChallenges.h>

class CodeManager
{
    public:
        CodeManager(const FirestoreChallenge challenge);
        ~CodeManager();

        void startCode();
        void showCodeLight(int delayTime);

        bool verifyInput(int input);
        void switchCodeIndex();

        bool hasCodeEnded();
        int getCodeLength();
    private:
        bool codeEnded;

        FirestoreChallenge currentChallenge;
        int* code;
        int codeLength;
        int codeIndex;
};