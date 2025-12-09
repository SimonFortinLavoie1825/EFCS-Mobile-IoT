#include "Context.h"

Context::Context()
{
}

Context::~Context()
{
    delete[] allChallenges;
}