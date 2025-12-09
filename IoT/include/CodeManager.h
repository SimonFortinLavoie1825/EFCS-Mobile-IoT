#pragma once
#include <FirestoreChallenges.h>

class CodeManager
{
    public:
        static const int CODE_PINS[3];

        CodeManager(const String sequence);
        ~CodeManager();

        void startCode();
        void showCodeLight(int delayTime);

        bool verifyInput(int input);
        void switchCodeIndex();

        bool hasCodeEnded();
        int getCodeLength();
    private:
        bool codeEnded;

        String currentSequence;
        int* code;
        int codeLength;
        int codeIndex;
};