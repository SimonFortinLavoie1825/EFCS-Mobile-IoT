export type Status = "Pending" | "Completed";

export type ChallengeContextType = {
    challenger: string | undefined,
    pointsObtained: number |undefined,
    sequence: string | undefined,
    status: Status | undefined,
    getChallenge: () => void,
    getAllChallenges: () => void,
    createChallenge: () => void,
}

export type Challenge = {
    challenger: string,
    pointsObtained: string,
    sequence: string,
    status: Status,
}
