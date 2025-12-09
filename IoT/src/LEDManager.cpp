#include "LEDManager.h"

void flashAllLeds(int times) {
    for (int i = 0; i < times; i++) {
        digitalWrite(FIRST_LED, HIGH);
        digitalWrite(SECOND_LED, HIGH);
        digitalWrite(THIRD_LED, HIGH);

        delay(BASE_LED_DELAY_TIME);

        digitalWrite(FIRST_LED, LOW);
        digitalWrite(SECOND_LED, LOW);
        digitalWrite(THIRD_LED, LOW);

        delay(BASE_LED_DELAY_TIME);
    }
}

void flashAllLeds(int times, int ledDelay) {
    for (int i = 0; i < times; i++) {
        digitalWrite(FIRST_LED, HIGH);
        delay(ledDelay);
        digitalWrite(SECOND_LED, HIGH);
        delay(ledDelay);
        digitalWrite(THIRD_LED, HIGH);

        delay(BASE_LED_DELAY_TIME);

        digitalWrite(FIRST_LED, LOW);
        delay(ledDelay);
        digitalWrite(SECOND_LED, LOW);
        delay(ledDelay);
        digitalWrite(THIRD_LED, LOW);

        delay(BASE_LED_DELAY_TIME);
    }
}

void flashSingleLed(int ledPin, int ledDelay) {
    digitalWrite(ledPin, HIGH);
    delay(ledDelay);
    digitalWrite(ledPin, LOW);
    delay(ledDelay);
}