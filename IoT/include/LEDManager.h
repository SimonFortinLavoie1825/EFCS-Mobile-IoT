#pragma once

#include <Arduino.h>
#include <Configuration.h>

void flashAllLeds(int repeat);
void flashAllLeds(int repeat, int ledDelay);
void flashSingleLed(int ledPin, int ledDelay);